import axios from '@/app/api/axios';

export const generateQuestion = async (text: string) => {
    const res = await axios.post('/create-multiple-choices', { input_text: text });
    return res.data;
}

export const generateQuestionDetails = async (text: string, extract_model: string, distractor_model: string) => {
    const res = await axios.post('/create-multiple-choices-details', { input_text: text, extract_model, distractor_model });
    return res.data;
}

export const extractAnswer = async (text: string) => {
    const res = await axios.post('/extract-answer', { input_text: text });
    return res.data;
}

export const generateDistractors = async (text: string) => {
    const res = await axios.post('/distractors-generator', { input_text: text });
    return res.data;
}