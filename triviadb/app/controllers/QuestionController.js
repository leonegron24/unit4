import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionService.js";


export class QuestionController {
    constructor() {
      console.log('Controller Registered');
      this.getQuestions()
      AppState.on('questions', this.drawQuestions)
    }


    async getQuestions(){
        await questionsService.getQuestions()
    }

    drawQuestions(){
        console.log('drawing Questions')
        const questions = AppState.questions
        let questionsContent = ''
        questions.forEach(question => questionsContent  += question.questionTemplate)
        let questionsElm = document.getElementById('question')
        if (!questionsElm){return}
        questionsElm.innerHTML = questionsContent
    }
}