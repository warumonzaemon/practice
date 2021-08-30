import './App.css';
import TaskList from './component/TaskList';
import AddTask from './component/AddTask';


const App = () => {

  return (
    <div className="App">
            <AddTask />
            <TaskList />
    </div>
  );
}

export default App;
