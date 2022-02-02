import { useEffect, memo } from 'react'
import Article from './Article'
import styles from '../styles/Results.module.scss'

function Results({ articles, resultsRef, bookmarks, setBookmarks }) {
	const resultsClass = articles ? styles.results : styles.preResults

	useEffect(() => {
		if (articles) {
			window.scrollTo({
				top: resultsRef.current.getBoundingClientRect().top + window.pageYOffset,
				left: 0,
				behavior: 'smooth'
			})
		}
	}, [articles, resultsRef])

	function addBookmark(e) {
		const articleData = e.target.dataset
		bookmarks[articleData.title] = articleData.url
		window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
		setBookmarks(JSON.stringify(bookmarks))
	}

	// This is the only list using indices for keys
	const articleList = articles ? articles.map((article, i) => {
		return (
			<Article 
				key={i}
				title={article.title}
				source={article.clean_url}
				date={article.published_date}
				excerpt={article.summary}
				url={article.link}
			/>
		)
	}) : null

	return (
		<section 
			ref={resultsRef}
			className={resultsClass}
		>
			<ul 
				onClick={(e) => addBookmark(e)}
				className={styles.articles}
			>
				{articleList}
			</ul>
		</section>
	)
}

export default memo(Results)