import * as styles from '../styles/Home.module.scss'
import Head from 'next/head'
import { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Landing } from '../components/Landing'
import { Articles } from '../components/Articles'
import { Filter } from '../components/Filter'

export default function Home() {
  const [filters, setFilters] = useState({
    sources: 'abc-news,associated-press,axios,bbc-news,bloomberg,breitbart-news,business-insider,buzzfeed,cbs-news,cnn,financial-post,fortune,fox-news,independent,msnbc,national-review,nbc-news,new-york-magazine,politico,reuters,the-hill,the-wall-street-journal,the-washington-post,time,usa-today,vice-news,wired'
  })
  const [query, setQuery] = useState('')
  const [news, setNews] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [readingOpen, setReadingOpen] = useState(false)

  function toggleFilter() {
    if (filterOpen) {
      setFilterOpen(false)
    } else {
      setFilterOpen(true)
    }
  }

  function toggleReading() {
    console.log('inside toggle reading')
    if (readingOpen) {
      setReadingOpen(false)
    } else {
      setReadingOpen(true)
    }
  }

  // ADD ERROR HANDLING

  async function getNews(searchQuery = query, sources = filters.sources) {
    const resp = await fetch(`https://newsapi.org/v2/everything?qInTitle=${searchQuery}&sources=${sources}&language=en&pageSize=100&sortBy=publishedAt&apiKey=fbae51867b8e4c86b6f175aa0afa9982`)
    const parsedResp = await resp.json()
    setNews(parsedResp)
    console.log(parsedResp)
  }

  return (
    <main className={styles.home}>
      <Head>
        <title>News Screen</title>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='author' content='Keiler Swanson' />
        <meta name='description' content='Find reporting on the topics you care about from the outlets you trust.' />
      </Head>
      <NavBar 
        filterOpen={filterOpen}
        readingOpen={readingOpen}
        toggleFilter={toggleFilter}
        toggleReading={toggleReading}
      />
      <Landing 
        filters={filters}
        getNews={getNews}
        setQuery={setQuery}
      />
      <Articles 
        news={news}
      />
      <Filter 
        query={query}
        filterOpen={filterOpen}
        getNews={getNews}
        setFilters={setFilters}
        toggleFilter={toggleFilter}
      />
    </main> 
  )
}
