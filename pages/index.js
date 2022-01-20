import * as styles from '../styles/Home.module.scss'
import Head from 'next/head'
import { useEffect, useState, useRef, useCallback } from 'react'
import NavBar from '../components/NavBar'
import Landing from '../components/Landing'
import Articles from '../components/Articles'
import ReadingList from '../components/ReadingList'
import Filter from '../components/Filter'
import Modal from '../components/Modal'

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
  const [readingList, setReadingList] = useState({})
  const [filterOpen, setFilterOpen] = useState(false)
  const [readingOpen, setReadingOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalOpen, openModal] = useState(false)

  const memoGetNews = useCallback(getNews, [queryParams])

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
    if (queryParams.query === '') return
    
    memoGetNews()
  }, [queryParams, memoGetNews])

  useEffect(() => {
    if (initRender.current.readingList) {
      initRender.current.readingList = false
      if (window.localStorage.getItem('readingList')) {
        setReadingList(JSON.parse(window.localStorage.getItem('readingList')))
      }
    }
    return
  }, [readingList])

  // Add error handling

  async function getNews() {
    setLoading(true)
    const jsonResp = await fetch(`https://newsapi.org/v2/everything?qInTitle=${queryParams.query}&sources=${queryParams.sources.join(',')}&language=en&pageSize=50&page=${queryParams.page}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`)
    const resp = await jsonResp.json()
    setLoading(false)
    setNews({
      count: resp.totalResults,
      articles: resp.articles,
      start: queryParams.page * 50 - 49,
      end: (queryParams.page * 50 > resp.totalResults) ? resp.totalResults : queryParams.page * 50
    })
  }

  function toggleModal() {
    if (modalOpen) openModal(false)
    if (!modalOpen) openModal(true)
  }

  const memoToggleModal = useCallback(toggleModal, [modalOpen])

  // function toggleFilter() {
  //   setReadingOpen(false)
  //   if (filterOpen) setFilterOpen(false)
  //   if (!filterOpen) setFilterOpen(true)
  // }

  // const memoToggleFilter = useCallback(toggleFilter, [filterOpen])

  // function toggleReading() {
  //   setFilterOpen(false)
  //   if (readingOpen) setReadingOpen(false)
  //   if (!readingOpen) setReadingOpen(true)
  // }

  // const memoToggleReading = useCallback(toggleReading, [readingOpen])

  function nextPage() {
    if (news.end === news.count) return
    setQueryParams({
      query: queryParams.query,
      sources: queryParams.sources,
      page: queryParams.page + 1
    })
  }

  const memoNextPage = useCallback(nextPage, [news, queryParams])

  function prevPage() {
    if (queryParams.page === 1) return
    setQueryParams({
      query: queryParams.query,
      sources: queryParams.sources,
      page: queryParams.page - 1
    })
  }

  const memoPrevPage = useCallback(prevPage, [queryParams])

  return (
    <main className={styles.home}>
      <Head>
        <title>Rhetoric</title>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='author' content='Keiler Swanson' />
        <meta name='description' content='Find the stories you care about from the sources you trust.' />
      </Head>
      <NavBar 
        modalOpen={modalOpen}
        toggleModal={memoToggleModal}
        // filterOpen={filterOpen}
        // toggleFilter={memoToggleFilter}
        // readingOpen={readingOpen}
        // toggleReading={memoToggleReading}
      />
      <Landing 
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        loading={loading}
      />
      <Articles 
        news={news}
        nextPage={memoNextPage}
        prevPage={memoPrevPage}
        resultsRef={resultsRef}
        readingList={readingList}
        setReadingList={setReadingList}
      />
      <Modal 
        modalOpen={modalOpen}
      />
      {/* <ReadingList 
        readingOpen={readingOpen}
        readingList={readingList}
        setReadingList={setReadingList}
      />
      <Filter 
        filterOpen={filterOpen}
        toggleFilter={memoToggleFilter}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      /> */}
    </main> 
  )
}
