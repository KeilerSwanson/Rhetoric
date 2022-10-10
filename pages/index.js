import Head from 'next/head'
import { useEffect, useState, useRef, useCallback } from 'react'

import TopNav from '../components/TopNav'
import Landing from '../components/Landing'
import Results from '../components/Results'
import Menu from '../components/Menu'
import BottomNav from '../components/BottomNav'
import Loading from '../components/Loading'

import sourceList from '../lib/sourceList'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'

import * as styles from '../styles/Home.module.scss'


export default function Home() {
  const date = useRef(new Date())
  // Refs for imperatively interacting with the DOM (dynamic styling, getting information, scrolling)
  const navRef = useRef()
  const resultsRef = useRef()
  const sourceListRef = useRef()
  // Flags for getting local storage on initial render only
  const init = useRef({
    sources: true,
    bookmarks: true,
    search: true
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const memoGetNews = useCallback(getNews, [queryParams])


  // Calculate height for Menu component so it stays flush with TopNav through window resizing
  useEffect(() => {
    const initMenuHeight = window.innerHeight - parseInt(window.getComputedStyle(navRef.current).height)
    document.documentElement.style.setProperty('--menuHeight', `${initMenuHeight}px`)
    window.addEventListener('resize', () => {
      const newMenuHeight = window.innerHeight - parseInt(window.getComputedStyle(navRef.current).height)
      document.documentElement.style.setProperty('--menuHeight', `${newMenuHeight}px`)
    })
  }, [])

  // Get source preferences from local storage on initial render only
  useEffect(() => {
    if (init.current.sources) {
      init.current.sources = false

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

  // Get bookmarks from local storage on initial render only
  useEffect(() => {
    if (init.current.bookmarks) {
      init.current.bookmarks = false

      if (window.localStorage.getItem('bookmarks')) {
        setBookmarks(window.localStorage.getItem('bookmarks'))
      }
    }
  }, [bookmarks])

  // Re-fetch news if any query parameters change
  useEffect(() => {
    if (queryParams.query === '') return
    if (init.current.search) init.current.search = false
    memoGetNews()
  }, [queryParams, memoGetNews])


  async function getNews() {
    setIsLoading(true)
		// Imperatively disable scrolling while loading articles
			// No straightforward declarative way to access the 'body' element in Next
			// Not manipulating anything React cares about
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
    setIsLoading(false)
  }

  function updateSources() {
    const activeSources = Array.from(sourceListRef.current.children).map(source => {
			return source.children.checkbox.checked ? source.dataset.url : null
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

  const memoUpdateSources = useCallback(updateSources, [queryParams, sourceListRef])

  function toggleMenu() {
    if (menuOpen) memoUpdateSources()

    setMenuOpen(!menuOpen)
  }

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
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='author' content='Keiler Swanson' />
        <meta name='description' content='Compare news coverage across the media landscape.' />
      </Head>
      <TopNav 
        navRef={navRef}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />
      <Landing 
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        initSearch={init.current.search}
        articles={news.articles}
      />
      <Results
        articles={news.articles}
        resultsRef={resultsRef}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />
      <Menu 
        isOpen={menuOpen}
        currentSources={queryParams.sources}
        sourceListRef={sourceListRef}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />
      <BottomNav 
        news={news}
        nextPage={memoNextPage}
        prevPage={memoPrevPage}
      />
      <Loading isLoading={isLoading}/>
    </main> 
  )
}
