import './styles.css'
import { useState, useEffect } from 'react'
import { Card, CardProps } from '../../components/Card'

type ProfileResponse = {
  name: string
  avatar_url: string
}

type User = {
  name: string
  avatar: string
}

type Selector = {
  value: string
}

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)
  const input = document.querySelector('input') as Selector

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
    async function fetchData() {
      const response = await fetch(`https://api.github.com/users/eltonrp`)
      const data = await response.json() as ProfileResponse
      
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })}

    fetchData()
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
      <input type="text" placeholder='Digite um texto...' onChange={e => setStudentName(e.target.value.toLowerCase().split(' ').map(str => str[0].toUpperCase() + str.substring(1)).join(' '))} />
      <button type='button' onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => <Card name={student.name} time={student.time} key={student.time}/>)
      }

    </div>
  )
}
