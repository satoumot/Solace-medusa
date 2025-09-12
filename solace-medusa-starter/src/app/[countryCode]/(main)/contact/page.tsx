'use client'

import React from 'react'

const InquiryForm = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-8">
      <form className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg">
        <div className="space-y-6">
          {/* --- 伝票No --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="slip-no" className="font-semibold text-gray-700 pt-2">
              注文番号
            </label>
            <div className="md:col-span-3">
              <input
                type="text"
                id="slip-no"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                注文番号が不明、または商品のお申し込みの場合は、伝票No.の欄に「-」を記載してください。
              </p>
            </div>
          </div>

          {/* --- 大学名 --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="university" className="font-semibold text-gray-700">
              大学名 <span className="text-red-500">※</span>
            </label>
            <input
              type="text"
              id="university"
              placeholder="〇〇大学"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            />
          </div>

          {/* --- 学部・学科 --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="department" className="font-semibold text-gray-700">
              学部・学科 <span className="text-red-500">※</span>
            </label>
            <input
              type="text"
              id="department"
              placeholder="〇〇学部〇〇学科"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            />
          </div>

          {/* --- 氏名 --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="full-name" className="font-semibold text-gray-700">
              氏名（フルネーム） <span className="text-red-500">※</span>
            </label>
            <input
              type="text"
              id="full-name"
              placeholder="氏名(全角)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            />
          </div>

          {/* --- カナ --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="kana-name" className="font-semibold text-gray-700">
              カナ <span className="text-red-500">※</span>
            </label>
            <input
              type="text"
              id="kana-name"
              placeholder="カナ(全角)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            />
          </div>

          {/* --- 電話番号 --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="phone" className="font-semibold text-gray-700">
              電話番号 <span className="text-red-500">※</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="例: 0312345678 (半角英数)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            />
          </div>

          {/* --- メールアドレス --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="email" className="font-semibold text-gray-700">
              メールアドレス <span className="text-red-500">※</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="例: aaa@aaaaa.aa.jp (半角英数)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            />
          </div>

          {/* --- お問い合わせ内容・概要 --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4 border-b border-gray-200 pb-6">
            <label htmlFor="inquiry-summary" className="font-semibold text-gray-700 pt-2">
              お問い合わせ内容・概要 <span className="text-red-500">※</span>
            </label>
            <textarea
              id="inquiry-summary"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            ></textarea>
          </div>

          {/* --- お問い合わせ内容・詳細 --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4 pb-6">
            <label htmlFor="inquiry-details" className="font-semibold text-gray-700 pt-2">
              お問い合わせ内容・詳細 <span className="text-red-500">※</span>
            </label>
            <textarea
              id="inquiry-details"
              rows={6}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition md:col-span-3"
            ></textarea>
          </div>
        </div>

        {/* --- ボタン --- */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            type="submit"
            className="bg-[#B8193F] text-white font-semibold py-2 px-12 rounded-lg hover:bg-[#D6355D] active:bg-[#A11637] transition"
          >
            送信
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-12 rounded-lg hover:bg-gray-300 transition"
          >
            戻る
          </button>
        </div>

        {/* --- 注意書き --- */}
        <p className="text-center text-sm text-gray-600 mt-8">
          ご記載いただいた「電話番号」または「メールアドレス」へ、折り返し連絡させていただきます。
        </p>
      </form>
    </div>
  )
}

export default InquiryForm