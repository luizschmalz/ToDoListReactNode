import ListFetch from "../axios/config"
import {useEffect, useState} from "react"
import { Link } from "react-router-dom"

import './Home.css'

const Home = () => {

  const [lists, setList] = useState(null)
  const [filteredLists, setFilteredLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    const loadList = async () => {
      const res = await ListFetch.get('/lists');
      setList(res.data);
      setFilteredLists(res.data); 
    };
    
    loadList();
  }, []);

  useEffect(() => {
    if (lists) {
      const filtered = lists.filter((list) =>
        list.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(searchTerm)
      setFilteredLists(filtered);
    }
  }, [searchTerm, lists]); 


  if(!lists) return <p>Loading...</p>
  
  const handleCheckboxChange = (taskId) => {
      setCompletedTasks((prevState) => ({
          ...prevState,
          [taskId]: !prevState[taskId],
      }));
  };

  return (
    <div className="home">
      <h2>Suas Listas</h2>
      <div className="search-list">
        <input 
          type="text" 
          placeholder="Buscar listas por nome..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-bar"
        />
      </div>
      <div className="listcontainer">
        {filteredLists.lenght === 0 && <p>Não há listas cadastradas</p>}
        {filteredLists.map((list) => (
          <div key={list._id} className="list">
            <h2>{list.title}</h2>
            <p>{list.description}</p>
            <h4>Itens:</h4>
            <div className="tasks">
            {list.tasks.map((task) => (
                <div key={task._id}  className={`task ${completedTasks[task._id] ? 'completed' : ''}`}>
                    <p>{task.title}</p>
                    <input
                        type="checkbox"
                        checked={!!completedTasks[task._id]}
                        onChange={() => handleCheckboxChange(task._id)}
                    />
                </div>
            ))}
            </div>
            <Link to={`/lists/${list._id}`} className="detailBtn">Editar Lista</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home