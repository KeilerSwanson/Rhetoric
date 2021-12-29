import { useEffect } from 'react'
import * as styles from '../styles/Articles.module.scss'
import Article from './Article'
import { memo } from 'react'

function Articles({ news, nextPage, prevPage, resultsRef, readingList, setReadingList }) {
	const resultsClass = news.articles ? styles.results : styles.preResults

	useEffect(() => {
		if (news.articles) {
			window.scrollTo({
				top: resultsRef.current.getBoundingClientRect().top + window.pageYOffset - 120,
				left: 0,
				behavior: 'smooth'
			})
		}
	}, [news, resultsRef])

	function addArticle(e) {
		const articleData = e.target.dataset
		const listCopy = {...readingList}
		listCopy[articleData.title] = articleData.url
		window.localStorage.setItem('readingList', JSON.stringify(listCopy))
		setReadingList(listCopy)
	}

	// This is the only list using indexes for keys
	const articles = news.articles ? news.articles.map((article, i) => {
		return (
			<Article 
				key={i}
				title={article.title}
				source={article.source.name}
				date={article.publishedAt}
				description={article.description}
				content={article.content}
				url={article.url}
			/>
		)
	}) : null

	return news ? (
		<div 
			ref={resultsRef}
			className={resultsClass}
		>
			{/* MAKE NAV COMPONENT? */}
			<nav className={styles.nav}>
				<button
					className={styles.button}
					onClick={prevPage}
				>
					Prev
				</button>
				<h3 className={styles.count}>{`${news.start} - ${news.end} of ${news.count}`}</h3>
				<button
					className={styles.button}
					onClick={nextPage}
				>
					Next
				</button>
			</nav>
			<ul 
				onClick={(e) => addArticle(e)}
				className={styles.articles}
			>
				{articles}
			</ul>
			<nav className={styles.nav}>
				<button
					className={styles.button}
					onClick={prevPage}
				>
					Prev
				</button>
				<h3 className={styles.count}>{`${news.start} - ${news.end} of ${news.count}`}</h3>
				<button
					className={styles.button}
					onClick={nextPage}
				>
					Next
				</button>
			</nav>
		</div>
	) : null
}

export default memo(Articles)