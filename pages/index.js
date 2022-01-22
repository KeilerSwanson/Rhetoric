import * as styles from '../styles/Home.module.scss'
import Head from 'next/head'
import { useEffect, useState, useRef, useCallback } from 'react'
import NavBar from '../components/NavBar'
import Landing from '../components/Landing'
import Articles from '../components/Articles'
import Modal from '../components/Modal'
import { sourceList } from '../lib/sourceList'

export default function Home() {
  const initRender = useRef({
    sources: true,
    bookmarks: true
  })
  const resultsRef = useRef()
  const menuItemRefs = {
		sources: useRef(),
		bookmarks: useRef(),
		info: useRef()
	}
  const [queryParams, setQueryParams] = useState({
    query: '',
    sources: Object.values(sourceList),
    page: 1
  })
  const [news, setNews] = useState({
    count: 0,
    articles: null,
    start: 0,
    end: 0
  })
  const [bookmarks, setBookmarks] = useState('{}')
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
    if (initRender.current.bookmarks) {
      initRender.current.bookmarks = false
      if (window.localStorage.getItem('bookmarks')) {
        setBookmarks(window.localStorage.getItem('bookmarks'))
      }
    }
    return
  }, [bookmarks])

  // Add error handling

  async function getNews() {
    setLoading(true)
    const jsonResp = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=${queryParams.query}&lang=en&sources=${queryParams.sources.join(',')}&page=${queryParams.page}`, {
      'method': 'GET',
      'headers': {
        'x-rapidapi-host': 'free-news.p.rapidapi.com',
        'x-rapidapi-key': '2a5c538804mshf5bccd8a56569c1p113de4jsnd5ef3abf3d6c'
        // 'x-rapidapi-key': process.env.NEXT_PUBLIC_NEWSCATCHER_KEY
      }
    })
    const resp = await jsonResp.json()
    setLoading(false)
    setNews({
      count: resp.total_hits,
      articles: resp.articles,
      start: queryParams.page * 50 - 49,
      end: (queryParams.page * 50 > resp.totalResults) ? resp.totalResults : queryParams.page * 50
    })
  }

  function updateSources() {
    const activeSources = Array.from(menuItemRefs.sources.current.children).map(source => {
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

  const memoUpdateSources = useCallback(updateSources, [queryParams, menuItemRefs.sources])

  function toggleModal() {
    if (modalOpen) {
      memoUpdateSources()
      openModal(false)
    } else {
      openModal(true)
    }
  }

  const memoToggleModal = useCallback(toggleModal, [modalOpen, memoUpdateSources])

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
        // bookmarks={bookmarks}
        bookmarks={JSON.parse(bookmarks)}
        setBookmarks={setBookmarks}
      />
      <Modal 
        menuItemRefs={menuItemRefs}
        queryParams={queryParams}
        modalOpen={modalOpen}
        // bookmarks={bookmarks}
        bookmarks={JSON.parse(bookmarks)}
        setBookmarks={setBookmarks}
      />
    </main> 
  )
}
