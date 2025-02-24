import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
import { FaEdit } from "react-icons/fa";

const TodoItems = ({text, id, isComplete, deleteTodo, toggle,editTodo, isEditing}) => {
  return (
    <div className='flex items-center mt-4 ml-7 mr-7 gap-2'>
        <div onClick={()=>{toggle(id)}} className ='flex flex-1 items-center cursor-pointer'>
            <img src={isComplete ? tick : not_tick} alt = '' className ='w-7' />
            <p className ='text-slate-700 ml-4 text-[17px] break-words overflow-hidden text-ellipsis'>
                {text}
            </p>          
        </div>
        <FaEdit onClick={()=>{editTodo(id)}} className={`text-gray-500 ml-5 cursor-pointer ${isEditing ? 'cursor-not-allowed opacity-50' : ''}`} />
        <img  onClick={()=>{deleteTodo(id)}} src={delete_icon} alt ='' className={`w-3.5 cursor-pointer ${isEditing ? 'cursor-not-allowed opacity-50' : ''}`} />
    </div>
  )
}

export default TodoItems