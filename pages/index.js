import * as styles from '../styles/Home.module.scss'
import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { NavBar } from '../components/NavBar'
import { Landing } from '../components/Landing'
import { Articles } from '../components/Articles'
import { Filter } from '../components/Filter'

export default function Home() {
  const initRender = useRef(true)
  const [filters, setFilters] = useState({
    sources: 'abc-news,associated-press,axios,bbc-news,bloomberg,breitbart-news,business-insider,buzzfeed,cbs-news,cnn,financial-post,fortune,fox-news,independent,msnbc,national-review,nbc-news,new-york-magazine,politico,reuters,the-hill,the-wall-street-journal,the-washington-post,time,usa-today,vice-news,wired'
  })
  const [query, setQuery] = useState('')
  const [news, setNews] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [readingOpen, setReadingOpen] = useState(false)
  const [page, setPage] = useState(1)
  // const [numPages, setNumPages] = useState(0)

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false
      return
    } else {
      getNews()
    }
    // Adding getNews to the dependency array causes an infinite loop for some reason? 
    // filters, query, and page are the only true dependencies anyway. *shrugs*
  }, [filters, query, page])

  function toggleFilter() {
    if (filterOpen) setFilterOpen(false)
    if (!filterOpen) setFilterOpen(true)
  }

  function toggleReading() {
    if (readingOpen) setReadingOpen(false)
    if (!readingOpen) setReadingOpen(true)
  }

  // HANDLE NEXT/PREV PAGE CALLS ON FIRST AND LAST PAGES

  function nextPage() {
    if (news.totalResults - (page * 20) < 20) return
    setPage(page + 1)
  }

  function prevPage() {
    if (page === 1) return
    setPage(page - 1)
  }

  // ADD ERROR HANDLING

  async function getNews() {
    const resp = await fetch(`https://newsapi.org/v2/everything?qInTitle=${query}&sources=${filters.sources}&language=en&pageSize=20&page=${page}&sortBy=publishedAt&apiKey=fbae51867b8e4c86b6f175aa0afa9982`)
    const parsedResp = await resp.json()
    console.log(parsedResp)
    setNews(parsedResp)
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
        // filters={filters}
        // getNews={getNews}
        setQuery={setQuery}
      />
      <Articles 
        news={news}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <Filter 
        // query={query}
        filterOpen={filterOpen}
        // getNews={getNews}
        setFilters={setFilters}
        toggleFilter={toggleFilter}
      />
    </main> 
  )
}
