import { AppState } from "../AppState.js";
import { Question } from "../models/Question.js";

const questionURL = 'https://opentdb.com/api.php?amount=10'

class QuestionsService {
    
    async getQuestions() {
       const response = await fetch(questionURL)
       console.log(response);
       const questionData = await response.json()
       console.log('questionData:', questionData) 
       const questions = questionData.results.map(questionData => new Question(questionData))
       console.log('mapped questions', questions)
       AppState.questions = questions
       AppState.category = AppState.questions.map(questions => questions.category);
       console.log('service category ', AppState.category)
    }

  }
  
  export const questionsService = new QuestionsService()
