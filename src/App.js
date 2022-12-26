import React, { useEffect, useState } from 'react'
import Collection from './Collection'
import './index.scss'

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function App() {
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''
    const pageRapam = page ? `page=${page}&limit=3&` : ''

    fetch(
      `https://63a9bd797d7edb3ae616cbae.mockapi.io/photos?${pageRapam}${category}`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              className={categoryId === i ? 'active' : ''}
              onClick={() => setCategoryId(i)}
              key={i}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(search.toLowerCase())
            })
            .map((obj, i) => (
              <Collection name={obj.name} images={obj.photos} key={i} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            className={page === i + 1 ? 'active' : ''}
            onClick={() => setPage(i + 1)}
            key={i}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
