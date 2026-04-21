import axios from 'axios';

const API_URL = 'https://resume-analyzer-ja44.onrender.com';

export const api = {
  analyzeResume: async (resumeText, jobDescription) => {
    try {
      const response = await axios.post(`${API_URL}/api/analyze`, {
        resumeText,
        jobDescription
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};
