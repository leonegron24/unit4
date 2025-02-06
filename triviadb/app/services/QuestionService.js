import { AppState } from "../AppState.js";
import { Question } from "../models/Question.js";

const questionURL = 'https://opentdb.com/api.php?amount=10'

class QuestionsService {
    
    async getQuestions() {
       const response = await fetch(questionURL)
       console.log(response);
       const questionData = await response.json()
       console.log('questionData:', questionData) 
       const questions = questionData.results.map(q => new Question(q))
       console.log('mapped questions', questions)
       AppState.questions = questions
      //  AppState.category = AppState.questions.map(questions => questions.category);
      //  console.log('service category ', AppState.category)
    }

    async getCategories(){
      const response = await fetch('https://opentdb.com/api_category.php')
      console.log('category response', response)
      const categoryData = await response.json()
      console.log('categoryData', categoryData)
      const categories = categoryData.trivia_categories.map(c => c.name )
      AppState.categories = categories
    }
  }
  
  export const questionsService = new QuestionsService()
