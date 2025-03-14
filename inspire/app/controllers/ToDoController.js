import { AppState } from "../AppState.js";
import { ToDo } from "../models/ToDo.js";
import { toDoService } from "../services/ToDoService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

export class ToDoController{
    constructor(){
        AppState.on('account', this.fetchToDos)
        AppState.on('toDoList', this.drawToDoList)
    }

    async fetchToDos(){
        try {
            await toDoService.fetchToDos()
        } catch (error) {
            Pop.error('Issue fetching ToDo...')
            console.error('Issue fetching Todo', 'error')
        }
    }

    drawToDoList(){
        const toDoList = AppState.toDoList
        let toDoContent = ''
        toDoList.forEach(toDo => toDoContent += toDo.toDoTemplate)
        setHTML('toDoList', toDoContent)

        const completedToDo = toDoList.filter(toDo => toDo.completed)
         console.log('completed task list: ', completedToDo)
         setText('count',`${completedToDo.length}/${AppState.toDoList.length}` )
    }

    async completeToDo(toDoId){
        try {
            console.log('checking...', toDoId)
            await toDoService.completeToDo(toDoId)
        } catch (error) {
            Pop.error('Issue completing task..')
            console.error('Issue completing task', 'error')
        }
    }

    async postToDo(){
        try {
            if(!event){return}
            event.preventDefault()
            const formElm = event.target
            const formData = getFormData(formElm)
            console.log('formData...', formData)
            await toDoService.postToDo(formData)
            formElm.reset()
        } catch (error) {
            Pop.error('Issue posting task..')
            console.error('Issue posting task', 'error')
        }
    }

    async deleteToDo(toDoId){
        try {
            const confirm = await Pop.confirm('Are you sure you want to delete this ToDo?')
            if(!confirm){return}
            await toDoService.deleteToDo(toDoId)
        } catch (error) {
            Pop.error('Issue deleting task..')
            console.error('Issue deleting task', 'error')
        }
    }





}