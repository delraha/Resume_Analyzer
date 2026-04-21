import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  analyzeResume: async (resumeText, jobDescription) => {
    try {
      const response = await axios.post(`${API_URL}/analyze`, {
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
