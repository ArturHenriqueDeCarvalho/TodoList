import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './style.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'


const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'green', 
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green',
          },
        },
      },
    },
  },
})

function Create() {
  // Define um estado local para armazenar o valor do input
  const [task, setTask] = useState('')

  // Função chamada ao clicar no botão "CRIAR"
  const handleAdd = () => {
    // Verifica se a tarefa está vazia ou contém apenas espaços em branco
    if (task.trim() === '') {
      alert('Por favor, adicione uma tarefa válida.')
      return
    }

    // Verifica se a tarefa tem no máximo 30 caracteres
    if (task.length > 30) {
      alert('A tarefa deve ter no máximo 30 caracteres.')
      return
    }

    // Envia uma solicitação POST para adicionar a tarefa no servidor
    axios
      .post('http://localhost:3001/add', { task: task })
      .then((result) => {
        // Recarrega a página após adicionar com sucesso (pode ser ajustado conforme necessário)
        location.reload(result)
      })
      .catch((err) => console.log(err))

    // Limpa o campo de entrada após a adição bem-sucedida
    setTask('')
  }

  return (
    // Aplicação do tema ThemeProvider
    <ThemeProvider theme={theme}>
      <div className='create_form'>
        <TextField
          id='standard-multiline-flexible'
          label='Adicionar item'
          multiline
          maxRows={4}
          variant='outlined'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ height: '40px', marginBottom: 0 }}
        />
        <Button
          variant='outlined'
          style={{
            borderColor: 'green',
            color: '#333',
            height: '55px', 
            marginLeft: '8px',
          }}
          onClick={handleAdd}
        >
          CRIAR
        </Button>
      </div>
    </ThemeProvider>
  )
}

export default Create
