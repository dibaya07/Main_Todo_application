import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'

export default function App() {
  const [todos, setTodos] = useState([])

  const getTodos = async()=>{
    const {data : todos} = await supabase.from('Todos').select()
    console.log(todos)
  }

  useEffect(() => {
    getTodos()
  }, [])
  

  const handleSubmit = ()=>{
    console.log("done")
    console.log(todos)
    setTodos(prev=>[...prev,'new value'])
  }

  return (
    <div className="bg-gray-500">
      {/* <title> */}
        <h1>Todo Application with Supabase</h1>
      {/* </title> */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your task.."/>
        <button>Submit</button>
      </form>
    </div>
  )
}




// export default function App() {

//   useEffect(() => {
//     async function getTodos() {
//       const { data: todos } = await supabase.from('todos').select()

//       if (todos) {
//         setTodos(todos)
//       }
//     }

//     getTodos()
//   }, [])

//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id}>{todo.name}</li>
//       ))}
//     </ul>
//   )
// }