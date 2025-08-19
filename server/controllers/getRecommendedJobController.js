const User = require("../models/userModel");
const Job = require("../models/jobModel");

function cosineSimilarity(userVec, jobVec) {
  let dot = 0;
  let userMag = 0;
  let jobMag = 0;

  for (let i = 0; i < userVec.length; i++) {
    dot += userVec[i] * jobVec[i];
    userMag += userVec[i] ** 2;
    jobMag += jobVec[i] ** 2;
  }

  if (userMag === 0 || jobMag === 0) return 0;
  return dot / (Math.sqrt(userMag) * Math.sqrt(jobMag));
}

const getRecommendedJobs = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    let jobs = await Job.find().populate("postedBy", "companyname");

    if (!user || !user.skills || user.skills.length === 0) {
      return res.status(400).json({ message: "User has no skills listed" });
    }

    // Step 1: Normalize skills to lowercase
    const userSkills = user.skills.map((s) => s.toLowerCase());

    // Filter out jobs with empty or missing skills
    jobs = jobs.filter(
      (job) => Array.isArray(job.skills) && job.skills.length > 0
    );

    // Step 2: Combine all unique skills
    const allSkillsSet = new Set([
      ...userSkills,
      ...jobs.flatMap((job) => job.skills.map((s) => s.toLowerCase())),
    ]);
    const allSkills = Array.from(allSkillsSet);

    // Step 3: User vector
    const userVec = allSkills.map((skill) =>
      userSkills.includes(skill) ? 1 : 0
    );

    // Step 4: Calculate similarity
    const scoredJobs = jobs
      .map((job) => {
        const jobSkills = job.skills.map((s) => s.toLowerCase());
        const jobVec = allSkills.map((skill) =>
          jobSkills.includes(skill) ? 1 : 0
        );
        const similarity = cosineSimilarity(userVec, jobVec);
        return { job, similarity };
      })
      .filter((item) => item.similarity > 0); 

    //check job numbers
    if (scoredJobs.length === 0) {
      return res.status(400).json({ message: "No recommended jobs found" });
    }

    // Step 5: Sort and return top 5
    const topJobs = scoredJobs
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map((item) => item.job);

    return res.status(200).json(topJobs);
  } catch (err) {
    console.error("Error getting recommended jobs:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRecommendedJobs };
