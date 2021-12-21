import * as styles from '../styles/Home.module.scss'
import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { NavBar } from '../components/NavBar'
import { Landing } from '../components/Landing'
import { Articles } from '../components/Articles'
import { ReadingList } from '../components/ReadingList'
import { Filter } from '../components/Filter'

export default function Home() {
  const initRender = useRef({
    sources: true,
    readingList: true
  })
  const resultsRef = useRef()
  const [queryParams, setQueryParams] = useState({
    query: '',
    sources: ['abc-news', 'associated-press', 'axios', 'bbc-news', 'bloomberg', 'breitbart-news', 
            'business-insider', 'buzzfeed', 'cbs-news', 'cnn', 'financial-post', 'fortune', 'fox-news', 
            'independent', 'msnbc', 'national-review', 'nbc-news', 'new-york-magazine', 'politico', 
            'reuters', 'the-hill', 'the-wall-street-journal', 'the-washington-post', 'time', 'usa-today', 
            'vice-news', 'wired'],
    page: 1
  })
  const [news, setNews] = useState({
    count: 0,
    articles: null,
    start: 0,
    end: 0
  })
  // INITIALIZE TO NULL
  const [readingList, setReadingList] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [readingOpen, setReadingOpen] = useState(false)

  useEffect(() => {
    if (initRender.current.sources) {
      initRender.current.sources = false
      if (window.localStorage.getItem('sources')) {
        setQueryParams({
          query: queryParams.query,
          sources: JSON.parse(window.localStorage.getItem('sources')),
          page: queryParams.page
        })
      }
      return
    }
    
    getNews()
    // Adding getNews to the dependency array causes an infinite loop for some reason? 
    // Filters, query, and page are the only true dependencies anyway. *shrugs*
  }, [queryParams])

  useEffect(() => {
    if (initRender.current.readingList) {
      initRender.current.readingList = false
      if (window.localStorage.getItem('readingList')) {
        console.log('is localStorage readingList')
        setReadingList(JSON.parse(window.localStorage.getItem('readingList')))
      }
    }
    return
  }, [readingList])

  function toggleFilter() {
    setReadingOpen(false)
    if (filterOpen) setFilterOpen(false)
    if (!filterOpen) setFilterOpen(true)
  }

  function toggleReading() {
    setFilterOpen(false)
    if (readingOpen) setReadingOpen(false)
    if (!readingOpen) setReadingOpen(true)
  }

  function nextPage() {
    if (news.end === news.count) return
    setQueryParams({
      query: queryParams.query,
      sources: queryParams.sources,
      page: queryParams.page + 1
    })
  }

  function prevPage() {
    if (queryParams.page === 1) return
    setQueryParams({
      query: queryParams.query,
      sources: queryParams.sources,
      page: queryParams.page - 1
    })
  }

  // ADD ERROR HANDLING 

  async function getNews() {
    if (!queryParams.query) return
    const jsonResp = await fetch(`https://newsapi.org/v2/everything?qInTitle=${queryParams.query}&sources=${queryParams.sources.join(',')}&language=en&pageSize=50&page=${queryParams.page}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
    const resp = await jsonResp.json()
    setNews({
      count: resp.totalResults,
      articles: resp.articles,
      start: queryParams.page * 50 - 49,
      end: (queryParams.page * 50 > resp.totalResults) ? resp.totalResults : queryParams.page * 50
    })
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
        toggleFilter={toggleFilter}
        readingOpen={readingOpen}
        toggleReading={toggleReading}
      />
      <Landing 
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        resultsRef={resultsRef}
      />
      <Articles 
        news={news}
        nextPage={nextPage}
        prevPage={prevPage}
        resultsRef={resultsRef}
        readingList={readingList}
        setReadingList={setReadingList}
      />
      <ReadingList 
        readingOpen={readingOpen}
        readingList={readingList}
        setReadingList={setReadingList}
      />
      <Filter 
        filterOpen={filterOpen}
        toggleFilter={toggleFilter}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />
    </main> 
  )
}
