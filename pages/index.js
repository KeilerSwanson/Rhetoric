import Head from 'next/head'
import { Landing } from '../components/Landing'
import { NavBar } from '../components/NavBar'

export default function Home() {
  return (
    <main>
      <Head>
        <title>News Screen</title>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='author' content='Keiler Swanson' />
        <meta name='description' content='Find reporting on the topics you care about from the outlets you trust.' />
      </Head>
      <NavBar />
      <Landing />
    </main> 
  )
}
