export class Question {
    constructor(data) {
        this.difficulty = data.difficulty
        this.type = data.type
        this.category = data.category
        this.question = data.question
        this.correctAnswer = data.correct_answer
        this.incorrectAnswers = data.incorrect_answers
    }

    get questionTemplate(){
        return /*html*/ `
        <div class="col-md-5 mx-4 my-4 border">
            <div class="d-flex justify-content-between">
                <p class="text-center fw-bold">${this.category}<p>
                <p class="text-success">${this.difficulty}</p>
            </div>
            <div>
                <p>${this.question}</p>
                <div>
                    <i type="button" class="d-flex mdi mdi-circle" id="answers">
                        <p class="mx-2">${this.correctAnswer}</p>
                        <p class="mx-2"> ${this.incorrectAnswers}</p>         
                    </i>
                </div>
            </div>
        </div>
        `
    }

}