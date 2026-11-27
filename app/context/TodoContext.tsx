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
  updateTodo : (id:string, title:string, description:string) =>void,
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
//추가
  const addTodo = (title:string, description:string) =>{
     const newTodo : Todo ={
        id : Date.now().toString(),
        title ,
        description,
        completed : false,
        createAt : new Date().toLocaleDateString('ko-KR')
     }
    //함수형 
  //  setTodos((prev)=> [newTodo, ...prev])
   setTodos([newTodo, ...todos])
  }
  //수정 함수 추가
  const updateTodo = (id:string, title:string, description:string)=>{
      setTodos(todos.map((todo) => todo.id === id 
       ? {...todo, title,description }  : todo))
    // setTodos((prev)=>
    //    prev.map((todo) => todo.id === id 
    //    ? {...todo, title,description }  : todo))
  }

  const toggleTodo = (id:string) =>{
    setTodos(todos.map((todo)=>todo.id === id 
                      ?{...todo, completed : !todo.completed}  
                      : todo))
    // setTodos((prev)=>
    //     prev.map((todo)=>todo.id === id 
    //             ?{...todo, completed : !todo.completed}  
    //             : todo))
  }

  //삭제
  const deleteTodo = (id:string) =>{
     setTodos(todos.filter((todo)=>todo.id !== id))
    // setTodos((prev)=>
    //     prev.filter((todo)=>todo.id !== id))
  }
//상세보기
  const getTodo =(id:string) =>  todos.find((todo)=>todo.id === id)
    

  return(
    <TodoContext value={{todos,addTodo,toggleTodo,updateTodo,deleteTodo,getTodo}}>
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