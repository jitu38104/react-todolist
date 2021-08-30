import './App.css';
import Item from './component/Item';
import { getItem, setItem } from './util/localstorage';
import { useState, useEffect } from 'react';


function App() {
  const [todoData, setTodoData] = useState([]);
  const [task, setTask] = useState('');
  const [flag, setFlag] = useState(0);

  useEffect(() => {   
    getItem().then(res => {
      res === null 
        ? window.localStorage.setItem('todoList', JSON.stringify([]))
        : setTodoData(res);            
    }).catch(err => console.error(err));
  }, [flag]);  

  const clickHandler = () => {
    if(!task) return;

    const id = Math.floor(Math.random()*1E10);
    const newObj = {
      uid: id,
      task: task
    };

    setFlag(flag+1);
    setItem(newObj);
    setTask('');
  } 

  const keyHandler = (e) => {
    if(e.key === "Enter") {
      clickHandler();
    }
  }

  return (
    <div className="container">    
      <div className="list-container">
      <h1>Todo List</h1>
        <div className="items">
          <ul>

          { 
            todoData.map(item => {
                return <Item 
                          key={item.uid} 
                          data={item} 
                          trigger={{flag, setFlag}}                             
                        />
            })
          }
                        
          </ul>
        </div>
        <div className="input">
          <input 
            type="text" 
            value={task} 
            placeholder="Type here"
            onKeyPress={keyHandler}
            onChange={e => setTask(e.target.value)}
          />
          <button 
            type="button"
            onClick={clickHandler}
          >+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
