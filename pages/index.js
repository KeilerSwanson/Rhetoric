import Head from 'next/head'
import { useEffect, useState, useRef, useCallback } from 'react'
import TopNav from '../components/TopNav'
import Landing from '../components/Landing'
import Results from '../components/Results'
import Menu from '../components/Menu'
import BottomNav from '../components/BottomNav'
import { sourceList } from '../lib/sourceList'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'
import * as styles from '../styles/Home.module.scss'

export default function Home() {
  const [queryParams, setQueryParams] = useState({
    query: '',
    sources: Object.values(sourceList),
    page: 1
  })
  const [news, setNews] = useState({
    numPages: 0,
    currPage: 1,
    articles: null,
  })
  const [bookmarks, setBookmarks] = useState('{}')
  const [loading, setLoading] = useState(false)
  const [menuOpen, openMenu] = useState(false)
  const initRender = useRef({
    sources: true,
    bookmarks: true,
    results: true
  })
  const navRef = useRef()
  const resultsRef = useRef()
  const sourcesRef = useRef()
  const memoGetNews = useCallback(getNews, [queryParams])

  useEffect(() => {
    screen.orientation.lock('portrait')
    const vh = window.innerHeight * 0.01
    const navHeight = window.innerHeight - parseInt(window.getComputedStyle(navRef.current).height)
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--navHeight', `${navHeight}px`)
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01
      const navHeight = window.innerHeight - parseInt(window.getComputedStyle(navRef.current).height)
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--navHeight', `${navHeight}px`)
    })
  })

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
    if (initRender.current.results) initRender.current.results = false
    
    memoGetNews()
  }, [queryParams, memoGetNews])

  useEffect(() => {
    if (initRender.current.bookmarks) {
      initRender.current.bookmarks = false
      if (window.localStorage.getItem('bookmarks')) {
        setBookmarks(window.localStorage.getItem('bookmarks'))
      }
    }
    return
  }, [bookmarks])

  async function getNews() {
    setLoading(true)
    disableBodyScroll()
    try {
      const jsonResp = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=${queryParams.query}&lang=en&sources=${queryParams.sources.join(',')}&page=${queryParams.page}`, {
        'method': 'GET',
        'headers': {
          'x-rapidapi-host': 'free-news.p.rapidapi.com',
          'x-rapidapi-key': '2a5c538804mshf5bccd8a56569c1p113de4jsnd5ef3abf3d6c'
        }
      })
      const resp = await jsonResp.json()
      setNews({
        numPages: resp.total_pages,
        currPage: queryParams.page,
        articles: resp.articles
      })
    } catch(err) {
      alert(`Sorry, it looks like there was an error with the data returned from your search: '${err}'. Try again or change the search query.`)
    }
    enableBodyScroll()
    setLoading(false)
  }

  function updateSources() {
    const activeSources = Array.from(sourcesRef.current.children).map(source => {
			return source.children.checkbox.checked ? source.dataset.source : null
		})
    if (activeSources.join(',') === queryParams.sources.join(',')) return
    window.localStorage.setItem('sources', JSON.stringify(activeSources))
		setQueryParams({
      query: queryParams.query,
			sources: activeSources,
      page: 1
    })
  }

  const memoUpdateSources = useCallback(updateSources, [queryParams, sourcesRef])

  function toggleMenu() {
    if (menuOpen) {
      memoUpdateSources()
      openMenu(false)
    } else {
      openMenu(true)
    }
  }

  const memoToggleMenu = useCallback(toggleMenu, [menuOpen, memoUpdateSources])

  function nextPage() {
    if (news.numPages === queryParams.page) return
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
        <meta name='description' content='Compare news coverage across the media landscape.' />
      </Head>
      <TopNav 
        navRef={navRef}
        menuOpen={menuOpen}
        toggleMenu={memoToggleMenu}
        loading={loading}
      />
      <Landing 
        initResults={initRender.current.results}
        articles={news.articles}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        loading={loading}
      />
      <Results
        articles={news.articles}
        resultsRef={resultsRef}
        bookmarks={JSON.parse(bookmarks)}
        setBookmarks={setBookmarks}
      />
      <Menu 
        sourcesRef={sourcesRef}
        queryParams={queryParams}
        menuOpen={menuOpen}
        bookmarks={JSON.parse(bookmarks)}
        setBookmarks={setBookmarks}
      />
      <BottomNav 
        news={news}
        nextPage={memoNextPage}
        prevPage={memoPrevPage}
        loading={loading}
      />
    </main> 
  )
}
