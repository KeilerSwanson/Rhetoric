// Libraries
import Head from 'next/head'
import { useEffect, useState, useRef, useCallback } from 'react'

// Components
import TopNav from '../components/TopNav'
import Landing from '../components/Landing'
import Results from '../components/Results'
import Menu from '../components/Menu'
import BottomNav from '../components/BottomNav'
import Loading from '../components/Loading'

// Utilities
import { sourceList } from '../lib/sourceList'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'

// Styles
import * as styles from '../styles/Home.module.scss'


export default function Home() {
  const date = useRef(new Date())

  // Refs for imperatively interacting with the DOM (dynamic styling, getting information, scrolling)
  const navRef = useRef()
  const resultsRef = useRef()
  const sourcesRef = useRef()
  const loadingRef = useRef()

  // Flags to indicate whether a component has been interacted with yet (invert these)
  const initRender = useRef({
    sources: true,
    bookmarks: true,
    results: true
  })

  const [queryParams, setQueryParams] = useState({
    query: '',
    sources: Object.values(sourceList),
    fromDate: date.current.setDate(date.current.getDate() - 5),
    page: 1
  })
  const [news, setNews] = useState({
    numPages: 0,
    currPage: 1,
    articles: null,
  })
  const [bookmarks, setBookmarks] = useState('{}')
  const [menuOpen, openMenu] = useState(false)
  const memoGetNews = useCallback(getNews, [queryParams])


  // Calculate height for the Menu component so it stays flush with the navbar through window resizing
  useEffect(() => {
    const initMenuHeight = window.innerHeight - parseInt(window.getComputedStyle(navRef.current).height)
    document.documentElement.style.setProperty('--menuHeight', `${initMenuHeight}px`)
    window.addEventListener('resize', () => {
      const newMenuHeight = window.innerHeight - parseInt(window.getComputedStyle(navRef.current).height)
      document.documentElement.style.setProperty('--menuHeight', `${newMenuHeight}px`)
    })
  }, [])

  useEffect(() => {
    if (initRender.current.sources) {
      initRender.current.sources = false
      if (window.localStorage.getItem('sources')) {
        setQueryParams({
          query: queryParams.query,
          sources: JSON.parse(window.localStorage.getItem('sources')),
          fromDate: queryParams.fromDate,
          page: queryParams.page
        })
      }
    }
  }, [queryParams])

  useEffect(() => {
    if (initRender.current.bookmarks) {
      initRender.current.bookmarks = false
      if (window.localStorage.getItem('bookmarks')) {
        setBookmarks(window.localStorage.getItem('bookmarks'))
      }
    }
  }, [bookmarks])

  useEffect(() => {
    if (queryParams.query === '') return
    if (initRender.current.results) initRender.current.results = false
    memoGetNews()
  }, [queryParams, memoGetNews])


  async function getNews() {
    loadingRef.current.style.cssText = `display: flex;`
    disableBodyScroll()
    try {
      const jsonResp = await fetch(`https://free-news.p.rapidapi.com/v1/search?lang=en&search_in=title&from=${queryParams.fromDate}&q='${queryParams.query}'&sources=${queryParams.sources.join(',')}&page=${queryParams.page}`, {
        'method': 'GET',
        'headers': {
          'x-rapidapi-host': 'free-news.p.rapidapi.com',
          'x-rapidapi-key': process.env.NEXT_PUBLIC_NEWSCATCHER_KEY
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
    loadingRef.current.style.cssText = `display: none;`
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
      fromDate: queryParams.fromDate,
      page: 1
    })
  }

  const memoUpdateSources = useCallback(updateSources, [queryParams, sourcesRef])

  function toggleMenu() {
    if (menuOpen) memoUpdateSources()
    openMenu(!menuOpen)
  }

  const memoToggleMenu = useCallback(toggleMenu, [menuOpen, memoUpdateSources])

  function nextPage() {
    if (news.numPages === queryParams.page) return
    setQueryParams({
      query: queryParams.query,
      sources: queryParams.sources,
      fromDate: queryParams.fromDate,
      page: queryParams.page + 1
    })
  }

  const memoNextPage = useCallback(nextPage, [news, queryParams])

  function prevPage() {
    if (queryParams.page === 1) return
    setQueryParams({
      query: queryParams.query,
      sources: queryParams.sources,
      fromDate: queryParams.fromDate,
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
      />
      <Landing 
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        initResults={initRender.current.results}
        articles={news.articles}
      />
      <Results
        articles={news.articles}
        resultsRef={resultsRef}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />
      <Menu 
        sourcesRef={sourcesRef}
        sources={queryParams.sources}
        open={menuOpen}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />
      <BottomNav 
        news={news}
        nextPage={memoNextPage}
        prevPage={memoPrevPage}
      />
      <Loading 
        loadingRef={loadingRef}  
      />
    </main> 
  )
}
