"use client"

import { useState } from "react"
import { Star, TreesIcon as Tree, Gift } from 'lucide-react'

interface QiitaArticle {
  title: string;
  url: string;
  created_at: string;
}

export default function AdventCalendar() {
  const [qiitaId, setQiitaId] = useState<string>("")
  const [articles, setArticles] = useState<QiitaArticle[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://qiita.com/api/v2/users/${qiitaId}/items?per_page=100`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      const decemberArticles = data.filter((article: QiitaArticle) => {
        const date = new Date(article.created_at)
        return date.getFullYear() === 2024 &&
              date.getMonth() === 11 &&
              date.getDate() >= 1 &&
              date.getDate() <= 25
      })
      setArticles(decemberArticles)
    } catch (error) {
      console.error('Error fetching Qiita articles:', error)
      setArticles([])
    }
  }

  const getArticleForDay = (day: number) => {
    return articles.find(article => {
      const date = new Date(article.created_at)
      return date.getDate() === day
    })
  }

  const houseStructure = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
  ]

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={qiitaId}
            onChange={(e) => setQiitaId(e.target.value)}
            placeholder="Qiita ID を入力"
            className="flex-1 p-2 border border-gray-300 rounded-lg text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            表示
          </button>
        </div>
      </form>

      <div className="relative bg-red-700 rounded-lg shadow-xl p-8 pt-4 pb-24">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="w-0 h-0 border-l-[150px] border-r-[150px] border-b-[100px] border-l-transparent border-r-transparent border-b-green-800 mx-auto mb-4"></div>

        <div className="relative bg-green-800 p-4 rounded-lg">
          {houseStructure.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2">
              {row.map((number) => {
                const article = getArticleForDay(number)
                return article ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={number}
                    className={`
                      w-12 h-12 m-1 rounded-lg flex items-center justify-center text-lg font-bold
                      transition-colors duration-300 bg-red-500 hover:bg-red-600 text-white shadow-md"
                    `}
                    title={article.title}
                  >
                    {number === 25 ? (
                      <Star className="w-8 h-8" />
                    ) : number % 5 === 0 ? (
                      <Gift className="w-6 h-6" />
                    ) : number % 7 === 0 ? (
                      <Tree className="w-6 h-6" />
                    ) : (
                      number
                    )}
                  </a>
                ) : (
                  <button
                    key={number}
                    disabled
                    className="w-12 h-12 m-1 rounded-lg flex items-center justify-center text-lg font-bold bg-gray-400 cursor-not-allowed"
                  >
                    {number === 25 ? (
                      <Star className="w-8 h-8" />
                    ) : number % 5 === 0 ? (
                      <Gift className="w-6 h-6" />
                    ) : number % 7 === 0 ? (
                      <Tree className="w-6 h-6" />
                    ) : (
                      number
                    )}
                  </button>
                )
              })}
            </div>
          ))}

        <div className="absolute -bottom-22 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-yellow-800"></div>
        </div>

        <div className="absolute top-1/4 left-8 w-12 h-12 bg-yellow-300 rounded-lg grid grid-cols-2 gap-1 p-1">
          <div className="bg-blue-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-blue-500"></div>
        </div>
        <div className="absolute top-1/4 right-8 w-12 h-12 bg-yellow-300 rounded-lg grid grid-cols-2 gap-1 p-1">
          <div className="bg-blue-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-blue-500"></div>
        </div>
      </div>
    </div>
  )
}

