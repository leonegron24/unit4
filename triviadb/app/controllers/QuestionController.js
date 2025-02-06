import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionService.js";


export class QuestionController {
    constructor() {
      console.log('Controller Registered');
      this.getQuestions()
    //   this.drawCategories()
      questionsService.getCategories()
      AppState.on('categories', this.drawCategories)
    }


    async getQuestions(){
        await questionsService.getQuestions()
    }

    drawQuestions(category){
        console.log('drawing Questions')
        const questions = AppState.questions
        const categorizedQuestions = questions.filter(q => q.category = category)
        console.log('categorizedQuestions', categorizedQuestions)
        let questionsContent = ''
        categorizedQuestions.forEach(question => questionsContent  += question.questionTemplate)
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
                <button class="col-3 mt-2 btn btn-success p-2" onClick = "app.QuestionController.chooseCategory('${category}')">
                    ${category}
                </button>
            `)
        if (!categoryElm){return}
        categoryElm.innerHTML = categoryContent

    }

    chooseCategory(category){
        console.log('choosing category...')
        const categories = AppState.categories
        const cat = categories.find(c => c === category)
        this.drawQuestions(cat)
    }

    checkUsersAnswer(answer){
        const questions = AppState.questions
        
    }

}