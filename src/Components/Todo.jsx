import { useEffect, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
import { FaSearch } from "react-icons/fa";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [filteredTodos, setFilteredTodos] = useState(todoList);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const add = () => {
    const trimmedText = inputText.trim();
    if (trimmedText === "") {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    setInputText("");
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  const editTodo = (id) => {
    const valueToBeEdited = todoList.find((todo)=> todo.id === id);
    console.log(valueToBeEdited?.id);
    setInputText(valueToBeEdited.text);
    setIsEditing(true); 
    setEditId(id);
  };
  const saveEditedTodo = () => {
    if (!inputText.trim()) return; 
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editId ? { ...todo, text: inputText } : todo
      )
    );
    setIsEditing(false); 
    setInputText(""); 
    setEditId(null); 
  };

  useEffect(() => {
    const filtered = todoList.filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [searchText, todoList]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p7 min-h-[550px] rounded-lg">
      <div className="flex items-center mt-7 ml-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      <div className="flex items-center ml-7  mr-7 mt-7  bg-gray-200 rounded-full">
        <FaSearch className="text-gray-500 ml-5 cursor-pointer" />
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search tasks..."
        />
      </div>
      <div className="flex items-center mt-2 ml-7 mr-7 bg-gray-200 rounded-full">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Enter your task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={isEditing ? saveEditedTodo : add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-while text-lg font-medium cursor-pointer"
        >
          {isEditing ? "SAVE" : "ADD +"}
        </button>
      </div>
      <div>
        {filteredTodos.map((item) => {
          return (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              editTodo={editTodo}
              isEditing={isEditing}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
