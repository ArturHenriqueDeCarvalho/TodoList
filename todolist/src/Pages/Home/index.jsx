import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
  BsPencil,
} from 'react-icons/bs'
import { useEffect, useState } from 'react'
import Create from '../../Components/CreateTask'
import axios from 'axios'
import './style.css'

function Home() {
  // Estado para armazenar as tarefas
  const [todos, setTodos] = useState([])

  // Efeito para carregar as tarefas do servidor ao montar o componente
  useEffect(() => {
    axios
      .get('http://localhost:3001/get')
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err))
  }, [])

  // Função para marcar/desmarcar uma tarefa
  const handleCheck = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then((result) => {
        // Atualiza o estado para refletir a mudança no status da tarefa
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo,
          ),
        )
        location.result()
      })
      .catch((err) => console.log(err))
  }

  // Função para editar uma tarefa
  const handleEdit = (id, currentTask) => {
    const newTask = prompt('Edit Task:', currentTask)
    if (newTask !== null) {
      axios
        .put(`http://localhost:3001/update/${id}`, { task: newTask })
        .then((result) => {
          // Atualiza o estado
          setTodos(
            todos.map((todo) =>
              todo._id === id ? { ...todo, task: newTask } : todo,
            ),
          )
          location.result()
        })
        .catch((err) => console.log(err))
    }
  }

  // Função para excluir uma tarefa
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:3001/delete/' + id)
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='page-home'>
      <div className='inputTask'>
        <h1>MONTE SUA LISTA</h1>
        {/* Adicionar novas tarefas */}
        <Create />
        {/* Verificar se há tarefas para exibir */}
        {todos.length === 0 ? (
          <h4>Adicione algo!</h4>
        ) : (
          // Mapeia as tarefas para exibição
          todos.map((todo) => (
            <div className='task' key={todo._id}>
              <div
                className='checkbox'
                onClick={() => handleCheck(todo._id, todo.task)}
              >
                {/*COMPONENTE QUANDO CRIADO */}
                {todo.done ? (
                  <BsFillCheckCircleFill className='icon' />
                ) : (
                  <BsCircleFill className='icon' />
                )}
                <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
              </div>
              <div>
                <span onClick={() => handleCheck(todo._id, todo.task)}></span>
                <span onClick={() => handleEdit(todo._id, todo.task)}>
                  <BsPencil className='icon' />
                </span>
                <span onClick={() => handleDelete(todo._id)}>
                  <BsFillTrashFill className='icon' />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;