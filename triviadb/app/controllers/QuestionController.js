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
                <button class="col-3 mt-2 btn btn-success p-2" onclick = "app.QuestionController.chooseCategory('${category}')">
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
        console.log('checking answer')
        const questions = AppState.questions
        const correctAnswers = questions.map(a => a = a.correctAnswer)
        console.log('correctAnswers ',correctAnswers)
        const verifyAnswer = correctAnswers.find(a => a == answer )
        console.log('verify answer :',verifyAnswer)
        if (!verifyAnswer){window.alert('Incorrect')}
        else{
            window.alert(verifyAnswer + " is Correct!")
        }


    }

}