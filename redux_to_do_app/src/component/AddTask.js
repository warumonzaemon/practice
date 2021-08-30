import axios from 'axios';
import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import '../App.css';

const AddTask = () => {
    const list = useSelector(state => state.list)
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState("");

    // const addNewTaskNameDataHandler = (newTaskName) => {
        
    // }

    const addTaskButtonHandler = async () => {
        /* invokes the addTask function with the 
        id as parameter when the add task button is clicked */

        /* if statement used to prevent adding task when input form is empty */
        let stringChecker = newTask.trim();
        let included = false;
        list.map (task => {
            if (task.name.toLowerCase() === newTask.toLowerCase()) {
                included = true; } 
                return task;
            });

        if (stringChecker === "")  {
            alert(`No task entered!`);
            document.querySelector("input[type=text]").value = "";
        } else if (!included) {
            await axios.post("http://localhost:8000/items", {name: newTask, status: "Pending"})
            .then((res)=> {console.log(res)})

            await axios.get("http://localhost:8000/items").then((res)=> 
            dispatch({type: 'GET_TASKS', payload: res.data}))
            
            /* dispatch({type: 'ADD_TO_LIST', payload: newTask});
            setNewTask("") */
        } else {
            alert("Task already entered!")
        };     
    }

    return(
                    <div className="AddTask">
                        <p className="Header">New Task</p>
                        <h4>TaskName</h4>
                        <input type="text" placeholder="Add a task..."
                                onChange={ (newTaskName) => setNewTask(newTaskName.target.value)} value={newTask}/>
                            <br></br>
                            <button  onClick={addTaskButtonHandler}>+ Add Task</button>
                       
                    </div>
                )                                                    
}
// class AddTask extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { newTask: ""};

//         this.addNewTaskNameDataHandler = this.addNewTaskNameDataHandler.bind(this);
//         this.addTaskButtonHandler = this.addTaskButtonHandler.bind(this);
//     }

//     addNewTaskNameDataHandler(newTaskName) {
//         /* stores data based on the current input in the input type text form */
//         this.setState({ newTask: newTaskName.target.value})
//     }

//     addTaskButtonHandler(){
//         /* invokes the addTask function with the 
//         id as parameter when the add task button is clicked */

//         /* if statement used to prevent adding task when input form is empty */
//         let stringChecker = this.state.newTask.trim();
//         if (stringChecker === "")  {
//             alert(`No task entered!`);
//             document.querySelector("input[type=text]").value = "";
//         } else {
//             this.props.addTask( this.state.newTask );
//             document.querySelector("input[type=text]").value = "";
//         };     
//     }

//     render(){
//         return(
//             <div className="AddTask">
//                 <p className="Header">New Task</p>
//                 <h4>TaskName</h4>
//                 <input type="text" placeholder="Add a task..."
//                         onChange={ (newTaskName) => this.addNewTaskNameDataHandler(newTaskName)}/>
//                     <br></br>
//                     <button  onClick={this.addTaskButtonHandler}>+ Add Task</button>
               
//             </div>
//         )
//     }
// }

export default AddTask;