import * as styles from '../styles/Home.module.scss'
import Head from 'next/head'
import { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Landing } from '../components/Landing'
import { Articles } from '../components/Articles'
import { Filter } from '../components/Filter'

export default function Home() {
  const [news, setNews] = useState(false)

  // ADD ERROR HANDLING

  async function getNews(query) {
    const resp = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=100&sortBy=publishedAt&sources='abc-news,associated-press,axios,bbc-news,bloomberg,business-insider,cbs-news,fortune,google-news,national-review,nbc-news,new-york-magazine,reuters,politico,the-hill,the-wall-street-journal,the-washington-post,time,usa-today,wired'&apiKey=fbae51867b8e4c86b6f175aa0afa9982`)
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
      <NavBar />
      <Landing 
        getNews={getNews}
      />
      <Articles 
        news={news}
      />
      <Filter 
        getNews={getNews}
      />
    </main> 
  )
}
