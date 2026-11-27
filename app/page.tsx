"use client"
import Link from "next/link";
import { useTodos } from "./context/TodoContext";

export default function Home() {
  const { todos, toggleTodo } = useTodos()
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
      {
        todos.length === 0 ? (
          <p className='text-center text-gray-400 py-10'>등록된 할 일이 없습니다. 새 할일을 추가하세요</p>
        )
          : (
            <ul className="space-y-3">
              {
                todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-centerjustify-between p-4 border rounded-lg hover:bg-gray-50  transition">
                    <div className='flex items-center gap-3 flex-1'>
                      <input type='checkbox' className='w-5 h-5 accent-blue-500 cursor-pointer' checked={todo.completed} onChange={() => { }} />
                      {/* 제목 클릭 시 상세 보기 페이지로 이동 */}
                      <Link className={`flex-1 font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 hover:text-blue-600'}`} href={`/todos/${todo.id}`}>{todo.title}</Link>
                    </div>
                    <span className='text-xs text-gray-400'>
                      {todo.createAt}
                    </span>
                  </li>
                ))
              }
            </ul>
          )
      }
    </div>

  );
}
