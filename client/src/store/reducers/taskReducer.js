import { taskActions } from "../actions/taskAction";

const initState={
    Tasks:[]
}

const reducer=(state=initState,action)=>{
    switch(action.type){
        case taskActions.SET_TASK:{
            const {id,author,content,isCompleted}=action.payload;
            if(state.Tasks.find((task)=>task.id===id))
            {
                return{
                    ...state
                }
            }else{
            return{
                ...state,
                Tasks:[...state.Tasks,{
                    id:id,
                    author:author,
                    content:content,
                    isCompleted:isCompleted,
                }]
            }}
        }
        case taskActions.UPDATE_TASK:{
            const { id,content} = action.payload;
            const tasks = state.Tasks.filter((task) => {
                return task.id !== id;
            });

            const task = state.Tasks.find((task) => task?.id === id);
            task.content = content;
            tasks.push(task);
            return{
                ...state,
                Tasks:[...tasks]
            }}
        case taskActions.DELETE_TASK:{
            const newTaskList = state.Tasks.filter((item) => item.id !== action.id);
            return {
                ...state,
                Tasks: newTaskList,
            }}
        case taskActions.COMPLETE_TASK:{
            const { id} = action.payload;
            const tasks = state.Tasks.filter((task) => {
                return task.id !== id;
            });

            const task = state.Tasks.find((task) => task.id === id);
            task.isCompleted = !task.isCompleted;
            tasks.push(task);
            return{
                ...state,
                Tasks:[...tasks]
            }}
        default:
            return{
                ...state
            }

    }
}

export default reducer;