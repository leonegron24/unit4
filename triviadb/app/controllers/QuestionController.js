import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionService.js";


export class QuestionController {
    constructor() {
      console.log('Controller Registered');
      this.getQuestions()
    //   this.drawCategories()
      questionsService.getCategories()
      AppState.on('categories', this.drawCategories)
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
        console.log('categoryArray : ', AppState.categories)
        const category = [... new Set(AppState.categories)]
        const categoryElm = document.getElementById('category')
        let categoryContent = ''
        category.forEach(category => categoryContent += /*html*/ `
                <button class="col-3 mt-2 btn btn-success p-2" onClick = "app.QuestionController.ChooseCategory('${category}')">
                    ${category}
                </button>
            `)
        if (!categoryElm){return}
        categoryElm.innerHTML = categoryContent

    }



}