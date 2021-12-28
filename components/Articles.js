import * as styles from '../styles/Articles.module.scss'
import { Article } from './Article'

function Articles({ news, nextPage, prevPage, resultsRef, readingList, setReadingList }) {
	const resultsClass = news.articles ? styles.results : styles.preResults
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
				readingList={readingList}
				setReadingList={setReadingList}
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

export { Articles }