import { useEffect } from 'react'
import * as styles from '../styles/Articles.module.scss'
import Article from './Article'
import { memo } from 'react'

function Articles({ articles, resultsRef, bookmarks, setBookmarks }) {
	// const resultsClass = initRender.current.results ? styles.preResults : styles.results
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
		console.log('target: ', e.target)
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
				description={article.summary}
				url={article.link}
			/>
		)
	}) : null

	return (
		<div 
			ref={resultsRef}
			className={resultsClass}
		>
			<ul 
				onClick={(e) => addBookmark(e)}
				className={styles.articles}
			>
				{articleList}
			</ul>
		</div>
	)
}

export default memo(Articles)