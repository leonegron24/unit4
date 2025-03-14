import { AppState } from "../AppState.js"
import { ToDo } from "../models/ToDo.js"
import { api } from "./AxiosService.js"

class ToDoService{

    async fetchToDos(){
        const response = await api.get('api/todos')
        console.log('todos response.data: ', response.data)
        const toDos = response.data.map(toDoData => new ToDo(toDoData))
        AppState.toDoList = toDos
        console.log("ToDo List: ", AppState.toDoList)
    }

    async completeToDo(toDoId){
        console.log('servicing check')
        const toDoComplete = AppState.toDoList.find(toDo => toDo.id == toDoId)
        if(!toDoComplete){return}
        toDoComplete.completed = !toDoComplete.completed
        const response = await api.put(`api/todos/${toDoId}`, toDoComplete)
        console.log('API Response:',response.data)
        AppState.emit('toDoList')
    }

    async postToDo(formData){
        console.log('posting ToDo!')
        const response = await api.post('api/todos', formData)
        console.log('new todo response', response.data)
        const createdToDo = new ToDo(response.data)
        AppState.toDoList.push(createdToDo)
    }

    async deleteToDo(toDoId){
        const toDoList = AppState.toDoList
        const deletedToDo = toDoList.find(toDo => toDo.id === toDoId)
        const response = api.delete(`api/todos/${toDoId}`)
        const indexToRemove = AppState.toDoList.indexOf(deletedToDo)
        AppState.toDoList.splice(indexToRemove,1)
    }
}

export const toDoService = new ToDoService()