import './NewList.css';
import ListFetch from '../axios/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewList = () => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [listId, setListId] = useState(null); // Armazena o ID da lista criada
  const [taskTitle, setTaskTitle] = useState(''); // Para adicionar novas tarefas
  const navigate = useNavigate();

  const createList = async (e) => {
    e.preventDefault();
    try {
      const list = { title, description };
      const res = await ListFetch.post('/lists', list);

      setListId(res.data.listId);

      console.log('Lista criada com ID:', listId);

    } catch (err) {
      console.log(err);
    }
  };

  const addTask = () => {
    try{
      const newTask = { title: taskTitle };
      setTaskTitle('');
      setTasks([...tasks, newTask]);
      ListFetch.post(`/lists/${listId}/addTask`, newTask);
    }catch(err){ 
      console.log(err)
    }

  };

  return (
    <div className='createList'>
      {!listId ? (
        <form onSubmit={createList}>
          <h1>Crie sua próxima lista</h1>
          <label>
            <span>Nome da lista:</span>
            <input
              type='text'
              placeholder='Ex: Lista de compras'
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label>
            <span>Descrição:</span>
            <textarea
              name='desc'
              id='desc'
              placeholder='Conte mais sobre a lista'
              onChange={(e) => setDescription(e.target.value)}
              required
              value={description}
            ></textarea>
          </label>
          <input type='submit' value='Criar Lista' className='ListBtn' />
        </form>
      ) : (
        <div className="addTasks">
          <h2>Adicionar Tarefas à Lista "{title}"</h2>
          <label>
            <span>Nome da tarefa:</span>
            <input
              type='text'
              placeholder='Ex: Comprar pão'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </label>

          <ul className='showtasks'>
            {tasks.map((task, index) => (
              <li key={index}>{task.title}</li>
            ))}
          </ul>

          <div className="buttondiv">
          <button onClick={addTask} className='ListBtn'>Adicionar Tarefa</button>
          <button onClick={() => navigate('/')} className='ListBtn'>Concluir e Voltar</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default NewList;
