export class ToDo{
    constructor(){

        //the server will create these properties for you
        id: {type: String, required: true, unique: true }
        completed: { type: Boolean, required: true, default: false}
        creatorId: { type: String, required: true }
        //You will need to provide a description
        description: { type: String, required: true}
        }
}