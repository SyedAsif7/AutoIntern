import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateAIResponse = async (prompt, returnRaw = false) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    if (returnRaw) return text;

    // Clean up response if it's wrapped in markdown code blocks
    if (text.startsWith('```json')) {
      text = text.replace(/```json|```/g, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```/g, '');
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('AI Generation failed');
  }
};
