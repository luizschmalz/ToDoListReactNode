import ListFetch from "../axios/config"
import {useEffect, useState} from "react"
import { Link } from "react-router-dom"

import './Home.css'

const Home = () => {

  const [lists, setList] = useState(null)

  useEffect(() => {
    
    const loadList = async () => {
      const res = await ListFetch.get('/lists')

      setList(res.data)
    }
    
    loadList()
  }, [])

  if(!lists) return <p>Loading...</p>


  return (
    <div className="home">
      <h1>Suas Listas</h1>
      <div className="listcontainer">
        {lists.lenght === 0 && <p>Não há festas cadastradas</p>}
        {lists.map((list) => (
          <div key={list._id} className="list">
            <h2>{list.title}</h2>
            <p>{list.description}</p>
            <h4>Tarefas:</h4>
            <div className="tasks">
            {list.tasks.map((task) => (
                <div key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
                    <p>{task.title}</p>
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