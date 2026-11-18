import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export default function App() {
  const [todos, setTodos] = useState([])
  // const [input, setInput] = useState("")

  
  useEffect(() => {
    const getTodos = async()=>{
      const {data} = await supabase.from('todos').select()
      setTodos(data)
    }
    getTodos()
  }, [])


  const handleSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const {data,error} = await supabase.from('todos').insert({task:formData.get("task")}).select().single()
    if(data){
      setTodos((prev)=>[...prev,data])
    }else if(error){
      console.log(error)
    }
  }


  const handleRead = async(isRead,id)=>{
    if(!isRead){
      const {data} = await supabase.from('todos').update({isread:!isRead}).eq('id',id).select()
      console.log(data)
    }
  }
  // const handleDelete = ()=>{
    
  // }

  return (
    <div className='flex  flex-col items-center h-screen'>
        <h1 className='text-4xl font-semibold my-16'>Todo Application with Supabase</h1>
      <form onSubmit={handleSubmit} className='border border-solid border-[#4a4a4a] bg-[#e1e1e1] p-5 rounded-2xl space-x-4'>
        <input type="text" name='task' placeholder="Enter your task.." className='outline-none rounded-md p-2.5'/>
        <button className='hover:bg-[#00360b] hover:text-white font-medium p-2 rounded-xl '>Submit</button>
      </form>
      <ul>
        {todos.length>0 && todos.map((item)=>(
          <li key={item.id}>
            <span>{item.task}</span>
            <button onClick={()=>handleRead(item.isread,item.id)} className={`${item.isreal ? "underline" : ""}`}>Mark as read</button>
            {/* <button onClick={()=>handleDelete(item.isread,item.id)} className={`${item.isreal ? "underline" : ""}`}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
