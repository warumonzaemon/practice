import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';

const TaskList = (/* {_id, name, status} */) => {
    const list = useSelector(state => state.list);
    const dispatch = useDispatch()

    useEffect( ()=> {
        const init = async () => {
            await axios.get("http://localhost:8000/items").then((res)=> 
        dispatch({type: 'GET_TASKS', payload: res.data}))
        };
        init();
        
    },[]);

    /* console.log(list); */
    let pendingTask = list.filter( task => task.status === "Pending"); 
    let doneTask = list.filter( task => task.status === "Done"); 

    const markToDone = async (_id) => {
        

        await axios.put(`http://localhost:8000/items/${_id}`, {status: "Done"})
            .then((res)=> {console.log("changed to done")});

        await axios.get("http://localhost:8000/items").then((res)=> 
        dispatch({type: 'GET_TASKS', payload: res.data}));
    }

    const deleteItem = async (_id) => {
        await axios.delete(`http://localhost:8000/items/${_id}`)
            .then((res)=> {console.log("task deleted")});

        await axios.get("http://localhost:8000/items").then((res)=> 
        dispatch({type: 'GET_TASKS', payload: res.data}));
    }


    return(
        <> 
            <div className="ToDo">
                {pendingTask.length !== 0 ? (<p className="Header">Pending Tasks</p>) : <h2>NO PENDING TASK</h2>}
                <div className="TaskList">
                    {pendingTask.map(item => 
                        <div key={item.id}>
                            <div className="TaskListSub">
                                <strong >{item.name}  </strong>
                            </div>
                            <div className="Button">
                                <button onClick={() => markToDone(item._id)/* dispatch({type: 'CHANGE_PENDING_TO_DONE', payload: item._id} */ }>✅</button>
                                <button onClick={() => deleteItem(item._id)/* dispatch({ type: 'REMOVE_FROM_LIST', payload: item.id})  */}>🗑️</button>
                            </div>

                        </div>)}
                </div>
            </div>
            <div className="ToDo">
                {doneTask.length !== 0 ? (<p className="Header">Completed Tasks</p>) : <h2>NO TASK COMPLETED!</h2>}
                <div className="TaskList">  
                    {doneTask.map(item => 
                        <div key={item.id}>
                            <div className="TaskListSub">
                                <strong >{item.name}  </strong>
                            </div>
                            <div className="Button">
                                <button onClick={() => deleteItem(item._id)/* dispatch({ type: 'REMOVE_FROM_LIST', payload: item.id}) */ }>🗑️</button>
                            </div>
                        </div>
                        )}
                </div>
            </div>
        </>
        
        
    )
}

export default TaskList;