export class Question {
    constructor(data) {
        this.difficulty = data.difficulty
        this.type = data.type
        this.category = data.category
        this.question = data.question
        this.correctAnswer = data.correct_answer
        this.incorrectAnswers = data.incorrect_answers
        this.answerContent = []

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
                <div>${this.answersFormatted}</div>
            </div>
        </div>
        `
    }

    get answersFormatted() {
        const answers = [this.correctAnswer, ...this.incorrectAnswers]; // Flatten the array
        answers.sort(() => Math.random() - 0.5); // Shuffle
        this.answerContent = answers; // Store in class property

        // Generate individual HTML elements for each answer
        return answers.map(answer => `
            <i type="button" class="d-flex mdi mdi-circle" id="answers">
                <div class="mx-2">${answer}</div>        
            </i>
        `).join('');
    }

    get categoryTemplate(){
        return /*html*/ `
        <div>
            <button onClick = "app.QuestionController.drawCategory('${this.category}')>
                ${this.category}
            </button>
        </div>
        `
    }
}