
"use client"
import { useTodos } from '@/app/context/TodoContext'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function TodoDetailPage() {
    const params = useParams();
    const { getTodo } = useTodos();
    const id = params.id as string
    const todo = getTodo(id)
    return (
        <div>
            <header className='flex justify-between items-center mb-6 pb-4 border-b'>
                <Link href="/"
                    className='text-sm text-gray-500 hover:text-gray-800'>목록으로</Link>
                <span className='text-xs text-gray-400'>작성일 :{todo?.createAt}</span>
            </header>
            <div className='space-y-4 mb-8'>
                <div className='flex items-center gap-3'>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium todo.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700" `}>{todo?.completed ? '완료됨' : '진행 중'}</span>
                    <h1 className='text-2xl font-bold'> {todo?.title} </h1>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg min-h-[120-px]'>
                    {todo?.description || '작성된 상세 내용이 없습니다.'}
                </div>
                <div className='flex justify-between pt-4 border-t'>
                    <button>{todo?.completed ? "진행 중으로 변경" : "완료로 표시"}</button>
                    <div className='flex gap-2'>
                        <Link href='#' className='px-4 py-2 text-white bg-gray-600 text0white rounded-lg hover:bg-gray-700 text-sm font-medium' >수정하기</Link>
                        <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>삭제하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
