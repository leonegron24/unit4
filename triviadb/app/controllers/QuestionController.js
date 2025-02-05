import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionService.js";


export class QuestionController {
    constructor() {
      console.log('Controller Registered');
      this.getQuestions()
      this.drawCategories()
      AppState.on('category', this.drawCategories)
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

    drawCategories(){
        console.log('drawing Categories')
        console.log('categoryArray : ', AppState.category)
        const category = [... new Set(AppState.category)]
        const categoryElm = document.getElementById('category')
        let categoryContent = ''
        category.forEach(category => categoryContent += /*html*/ `
                <button onClick = "app.QuestionController.drawCategory('${category}')">
                    ${category}
                </button>
            `)
        console.log('categoryContent : ', categoryContent)
        if (!categoryElm){return}
        categoryElm.innerHTML = categoryContent
        console.log('categoryElm :', categoryElm.innerHTML)
    }

}