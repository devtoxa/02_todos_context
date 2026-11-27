"use client"

import Link from 'next/link'
import React from 'react'

export default function NewTodoPage() {
    return (
        <div>
            <header className='mb-6 pb-4 border-b'>
                <h1 className='text-2xl font-bold'>새 할 일 추가</h1>
            </header>

            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label className='block text-sm font-medium mb-1'>제목 *</label>
                    <input type='text' placeholder='할 일 제목 입력'
                        className='w-full border rounded-lg px-3 py-2
                   focus:outline-none  focus:border-blue-500' />

                </div>
                <div>
                    <label className='block text-sm fon  mb-1'>상세 내용</label>
                    <textarea rows={4}
                        placeholder='세부내용 입력'
                        className='w-full border rounded-lg px-3 py-2 
                focus:outline-none  focus:border-blue-500'  />

                </div>
                <div className='flex justify-end gap-2 pt-4'>
                    <Link href='/' className='px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100'>취소</Link>
                    <button className='px04 py-2 bg-blue-500 text-white rounded-lg p-4 hover:bg-blue-600'>저장</button>
                </div>
            </form>


        </div>
    )
}
