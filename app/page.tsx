"use client"
import Link from "next/link";
import { useTodos } from "./context/TodoContext";

export default function Home() {
  const {todos, toggleTodo} = useTodos()
  return (
    <div>
      <header className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold">전체 할 일</h1>
        <Link href="/todos/new"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm 
        font-medium hover:bg-blue-600 transition"> 
          + 새 할 일 추가
        </Link>
      </header>
    </div>
    
  );
}
