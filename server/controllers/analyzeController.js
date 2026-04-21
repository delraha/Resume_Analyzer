const SKILL_DB = {
  technical: ["java","c++","python","javascript","html","css","react","node","express","mongodb","sql","typescript","angular","vue","django","flask","spring","docker","kubernetes","aws","azure"],
  concepts: ["dsa","data structures","algorithms","oops","operating system","computer network","system design","databases","agile","scrum"],
  tools: ["excel","word","powerpoint","git","github","gitlab","jira","confluence","figma","postman"],
  soft: ["communication","teamwork","leadership","adaptability","problem solving","time management","critical thinking","collaboration"]
};

function extractSkills(text) {
  const lower = text.toLowerCase();
  let found = [];

  Object.values(SKILL_DB).forEach(category => {
    category.forEach(skill => {
      // Use regex to match whole words to prevent partial matching (e.g., 'react' in 'reaction')
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      if (regex.test(lower)) {
        found.push(skill);
      }
    });
  });

  return [...new Set(found)];
}

exports.analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ 
        error: 'Missing required parameters: resumeText and jobDescription are required.' 
      });
    }

    // --- LOGIC 1 & 2: Extract Skills ---
    const resumeSkills = extractSkills(resumeText);
    const jdSkills = extractSkills(jobDescription);

    const matched = jdSkills.filter(skill => resumeSkills.includes(skill));
    const missing = jdSkills.filter(skill => !resumeSkills.includes(skill));

    // --- LOGIC 3: Score ---
    let score = 0;
    if (jdSkills.length > 0) {
      score = Math.round((matched.length / jdSkills.length) * 100);
    }
    
    // Realism touch: add slight randomness to score
    if(score > 0 && score < 100) {
       let randomAdjust = Math.floor(Math.random() * 5) - 2; // -2 to +2
       score = Math.min(100, Math.max(0, score + randomAdjust));
    }

    // --- LOGIC 4: Skill Bars ---
    // Cap to top 6 skills max
    const topSkillsForBars = jdSkills.slice(0, 6);
    const skillBars = topSkillsForBars.map(skill => {
      const capSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
      
      let barScore = 0;
      if (matched.includes(skill)) {
        barScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60; // 60-95
      } else {
        barScore = Math.floor(Math.random() * (50 - 20 + 1)) + 20; // 20-50
      }
      
      return { skill: capSkill, score: barScore };
    });

    // --- LOGIC 5: Enhance Section ---
    // Take up to 4 missing skills
    const topMissing = missing.slice(0, 4);
    const enhance = topMissing.map(skill => {
      const capSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
      return {
        skill: capSkill,
        tips: [
          `Complete an online course or certification in ${capSkill}`,
          `Add a personal or open-source project demonstrating ${capSkill}`,
          `Ensure ${capSkill} is explicitly mentioned if you already have the experience`
        ]
      };
    });

    // Format output arrays for proper casing
    const formatArr = (arr) => arr.map(w => w.charAt(0).toUpperCase() + w.slice(1));
    const finalMatched = formatArr(matched);
    const finalMissing = formatArr(missing);

    // --- 6: Dynamic Summary ---
    let summary = "";
    if (score >= 80) summary = "Strong match! Your resume aligns highly with the core requirements of this role.";
    else if (score >= 60) summary = "Good match. Your resume shows a solid foundation, but lacks a few key preferred skills.";
    else if (score >= 40) summary = "Partial match. You have some relevant experience, but significant skill gaps exist.";
    else summary = "Weak match. Consider aggressively upskilling in the missing core areas before applying.";

    // --- RESPONSE FORMAT ---
    const mockOutput = {
      score,
      summary,
      matched: finalMatched.length > 0 ? finalMatched : ["General Competence"],
      missing: finalMissing.length > 0 ? finalMissing : ["Advanced Specialization"],
      skillBars,
      enhance
    };

    return res.status(200).json(mockOutput);

  } catch (error) {
    console.error('Server Error (Analyze):', error.message);
    return res.status(500).json({ 
      error: 'Analysis failed on the server side.', 
      details: error.message 
    });
  }
};
