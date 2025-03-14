export class ToDo{
    constructor(data){
        this.id = data.id
        this.completed = data.completed
        this.creatorId = data.creatorId
        this.description = data.description
        this.createdAt = data.createdAt
        }

    get toDoTemplate(){
        return /*html*/ `
        <div class="row">
            <span class="col-1">
                <input type="checkbox" ${this.CheckedBox} onchange = "app.ToDoController.completeToDo('${this.id}')">
            </span>
            <div class="col-11">${this.description} <i type=button onclick="app.ToDoController.deleteToDo('${this.id}')" class="mdi mdi-delete-forever"></i> </div>
        </div>
        `
    }

    get CheckedBox(){
        if(this.completed) return 'checked'
        return ''
    }
}