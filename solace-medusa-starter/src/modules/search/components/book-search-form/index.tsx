'use client'

import { useState } from 'react'

export function BookSearchForm() {
  const [subject, setSubject] = useState('');
  const [faculty, setFaculty] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [bookTitle, setBookTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = { subject, faculty, teacherName, bookTitle };
    console.log('検索条件:', searchParams);
    // ここでAPIを呼び出して検索を実行するロジックを実装
  };
  
  const handleReset = () => {
    setSubject('');
    setFaculty('');
    setTeacherName('');
    setBookTitle('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      onReset={handleReset} 
      className="w-full rounded-lg border bg-white p-6 shadow-md"
      // className="w-full max-w-4xl mx-auto rounded-lg border bg-white p-6 shadow-md"
    >
      {/* ↓ ここが修正箇所です。formタグに直接Gridを適用します */}
      <div className="grid grid-cols-1 small:grid-cols-2 gap-x-6 gap-y-4">
        {/* 科目ペア */}
        <div className="flex flex-col">
          <label htmlFor="subject-select" className="mb-1 text-sm font-semibold text-gray-700">科目</label>
          <select 
            id="subject-select"
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">指定なし</option>
            <option value="info">情報処理</option>
            <option value="math">数学</option>
          </select>
        </div>

        {/* 先生ペア */}
        <div className="flex flex-col">
          <label htmlFor="teacher-input" className="mb-1 text-sm font-semibold text-gray-700">先生</label>
          <input 
            id="teacher-input"
            type="text" 
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* 学部ペア */}
        <div className="flex flex-col">
          <label htmlFor="faculty-select" className="mb-1 text-sm font-semibold text-gray-700">学部</label>
          <select 
            id="faculty-select"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">指定なし</option>
            <option value="engineering">工学部</option>
            <option value="science">理学部</option>
          </select>
        </div>
        
        {/* 書籍名ペア */}
        <div className="flex flex-col">
          <label htmlFor="booktitle-input" className="mb-1 text-sm font-semibold text-gray-700">書籍名</label>
          <input 
            id="booktitle-input"
            type="text" 
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>
      {/* ↑ ここまでが修正箇所です */}

      {/* 下段: ボタン */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button 
          type="reset"
          className="rounded-md border border-gray-400 bg-gray-200 px-8 py-2 font-semibold text-gray-800"
        >
          クリア
        </button>
        <button 
          type="submit"
          className="rounded-md bg-[#B8193F] px-8 py-2 font-semibold text-white hover:bg-[#D6355D] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          検索
        </button>
      </div>
    </form>
  )
}