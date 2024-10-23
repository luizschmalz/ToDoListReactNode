import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ListFetch from "../axios/config"
import './SingleList.css'

const SingleList = () => {

  const [list, setList] = useState(null)
  const {id} = useParams()
  const [task, setTask] = useState('')
  const navigate = useNavigate()
  
  const loadList = async () => {
    const res = await ListFetch.get(`/lists/${id}`)
    setList(res.data)
  }

  useEffect(() => {
    loadList()
  }, [])

  const deleteItem = async (title) => {
    try{
      const task = { taskTitle: title };
    await ListFetch.post(`/lists/${id}/removeTask`, task)
    const res = await ListFetch.get(`/lists/${id}`)

    setList(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const showAddItem = () => {
    const addItemDiv = document.querySelector('.addItemDiv')
    addItemDiv.classList.toggle('hide')
  }

  const addItem = async () => {
    try {
      const newTask = { title: task };
      await ListFetch.post(`/lists/${id}/addTask`, newTask); 
      loadList(); 
    } catch (err) { 
      console.log(err);
    }
  };

  if(!list) return <p>Loading...</p>

  return (
    <div className='SingleList'>
      <div className="firstdiv">
        <h2>{list.title}</h2>
        <button className='addDelBtn' onClick={() => showAddItem()}>Adicionar Itens</button>
      </div>
      <p>{list.description}</p>
      <div className="addItemDiv hide">
        <input
        type='text'
        placeholder='Digite o item a ser adicionado'
        value={task}
        onChange={(e) => setTask(e.target.value)}
       />
        <button className='addDelBtn' onClick={() => addItem()}>Adicionar</button>
      </div>
      <h4>Itens:</h4>
      <div className="tasks">
      {list.tasks.map((task) => (
          <div key={task._id}  className={'task'}>
              <p>{task.title}</p>
              <button className='addDelBtn' onClick={() => deleteItem(task.title)}>Remover Item</button>
          </div>
      ))}
      </div>
      <div className="backdiv">
        <button className='backBtn' onClick={() => navigate('/')}>Voltar</button>
      </div>
    </div>
  )
}

export default SingleList