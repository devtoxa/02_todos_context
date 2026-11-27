"use client"

import { useTodos } from '@/app/context/TodoContext';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';

import React, { Suspense, useState } from 'react'

function Edit() {
  const router = useRouter();
  const { updateTodo, getTodo } = useTodos();
  const params = useParams()
  const id = params.id as string
  const todo = getTodo(id)
  const [title, setTitle] = useState(todo!.title);
  const [description, setDescription] = useState(todo!.description);

  // React.FormEvent  ==> React.SubmitEvent<HTMLFormElement>
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo(id, title, description);
    router.push('/')//저장 후 전체보기 페이지로 이동
  }
  return (
    <div>
      <header className='mb-6 pb-4 border-b'>
        <h1 className='text-2xl font-bold'>새 할 일 추가</h1>
      </header>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>제목 *</label>
          <input type='text' required
            value={title}
            placeholder='할 일 제목 입력'
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border rounded-lg px-3 py-2
                   focus:outline-none  focus:border-blue-500' />

        </div>
        <div>
          <label className='block text-sm fon  mb-1'>상세 내용</label>
          <textarea rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='세부내용 입력(선택)'
            className='w-full border rounded-lg px-3 py-2 
                            focus:outline-none  focus:border-blue-500'  />

        </div>
        <div className='flex justify-end gap-2 pt-4'>
          <Link href='/'
            className='px-4 py-2 border rounded-lg text-gray-600
           hover:bg-gray-100'>
            취소
          </Link>
          <button type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded-lg
           hover:bg-blue-600'>
            저장하기
          </button>

        </div>

      </form>


    </div>
  )
}


export default function UpdateTodoPage() {
  return (
    <Suspense fallback={<div className='text-center py-10 text-gray-500'>불러오는 중...</div>}>
      <Edit />
    </Suspense>
  )
}