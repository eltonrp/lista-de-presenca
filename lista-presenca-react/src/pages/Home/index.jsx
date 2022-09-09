import './styles.css'
import { useState, useEffect } from 'react'
import { Card } from '../../components/Card'

export function Home() {

  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})
  const input = document.querySelector('input')

  function handleAddStudent() {
    if(studentName) {
      const newStudent = {
        name: studentName,
        time: new Date().toLocaleTimeString('pt-br', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }
  
      setStudents(prevState => [...prevState, newStudent])
      input.value = ''
      setStudentName('')
    }
  }

  useEffect(() => {
    // let gitUser = prompt('Digite seu usuário do Github')
    fetch(`https://api.github.com/users/eltonrp`)
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <div>
            <img src={user.avatar} alt="Foto de Perfil" />
          </div>
        </div>
      </header>
      <input type="text" placeholder='Digite um texto...' onChange={e => setStudentName(e.target.value[0].toUpperCase() + e.target.value.substring(1).toLowerCase())} />
      <button type='button' onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => <Card name={student.name} time={student.time} key={student.time}/>)
      }

    </div>
  )
}
