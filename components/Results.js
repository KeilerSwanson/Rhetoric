import { useEffect, memo } from 'react'

import Article from './Article'

import styles from '../styles/Results.module.scss'


function Results({ articles, resultsRef, bookmarks, setBookmarks }) {
	const resultsClass = articles ? styles.results : styles.preResults
	const bookmarksObj = JSON.parse(bookmarks)


	useEffect(() => {
		if (articles) {
			window.scrollTo({
				top: resultsRef.current.getBoundingClientRect().top + window.pageYOffset,
				left: 0,
				behavior: 'smooth'
			})
		}
	}, [articles, resultsRef])

	// In Results to use event bubbling for adding bookmarks
	function addBookmark(e) {
		const newBookmarks = {...bookmarksObj}
		const articleData = e.target.dataset
		newBookmarks[articleData.title] = articleData.url
		const newBookmarksStr = JSON.stringify(newBookmarks)
		window.localStorage.setItem('bookmarks', newBookmarksStr)
		setBookmarks(newBookmarksStr)
	}


	return (
		<section ref={resultsRef} className={resultsClass}>
			<ul onClick={(e) => addBookmark(e)} className={styles.articles}>
				{
					// This is the only list using indices for keys
					articles ? articles.map((article, i) => {
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
				}
			</ul>
		</section>
	)
}


export default memo(Results)