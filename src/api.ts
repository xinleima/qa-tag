import axios from 'axios';

export interface IInputData {
  title: string;
  body: string;
}

export interface IQuestion {
  id: number;
  title: string;
  body: string;
}

export async function getTags(data: IInputData) {
  return axios.post('http://localhost:3000/api/tags/', data);
}

export async function getQuestions() {
  return axios.get('http://localhost:3000/api/questions/');
}

export async function getQuestionDetail(questionId: number) {
  return axios.get(`http://localhost:3000/api/question/${questionId}`);
}
