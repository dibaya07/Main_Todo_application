import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

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
    <div className='flex  flex-col items-center h-screen'>
        <h1 className='text-4xl font-semibold my-16'>Todo Application with Supabase</h1>
      <form onSubmit={handleSubmit} className='border border-solid border-[#4a4a4a] bg-[#e1e1e1] p-5 rounded-2xl space-x-4'>
        <input type="text" placeholder="Enter your task.." className='outline-none rounded-md p-2.5'/>
        <button className='hover:bg-[#00360b] hover:text-white font-medium p-2 rounded-xl '>Submit</button>
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