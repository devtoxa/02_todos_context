"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface Todo {
  id : string,
  title : string,
  description : string,
  completed : boolean,
  createAt : String
}

interface todoContextType {
  todos : Todo[],
  addTodo : (title:string, description:string) =>void;
  toggleTodo : (id:string) => void,
  deleteTodo : (id:string) =>void,
  getTodo :(id:string) => Todo | undefined
}
const TodoContext = createContext<todoContextType | undefined>(undefined)

export function TodoProvider({children} : {children:ReactNode}){
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  //초기 로딩시 localStorage에서 데이터 불러오기
  useEffect(()=>{
   const saved = localStorage.getItem('nextjs-todos')
   if(saved){
    setTodos(JSON.parse(saved))
   }
   setIsLoaded(true)
  },[])

  //데이터 변경시 localStorag 에 저장
  useEffect(()=>{
    if(isLoaded){
      localStorage.setItem('nextjs-todos', JSON.stringify(todos))
    }
  }, [todos, isLoaded])

  const addTodo = (title:string, description:string) =>{
     const newTodo : Todo ={
        id : Date.now().toString(),
        title ,
        description,
        completed : false,
        createAt : new Date().toLocaleDateString('ko-KR')
     }
    //함수형 
    setTodos((prev)=> [newTodo, ...prev])
  }

  const toggleTodo = (id:string) =>{
    setTodos((prev)=>
        prev.map((todo)=>todo.id === id 
                ?{...todo, completed : !todo.completed}  
                : todo))
  }

  const deleteTodo = () =>{

  }

  const getTodo =(id:string) =>  todos.find((todo)=>todo.id === id)
    

  return(
    <TodoContext value={{todos,addTodo,toggleTodo,deleteTodo,getTodo}}>
      {children}
    </TodoContext>
  )
}

export function useTodos(){
  const context = useContext(TodoContext)
  if(!context){
    throw new Error('useTodos 에러');
  }
  return context
}