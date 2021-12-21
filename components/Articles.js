import * as styles from '../styles/Articles.module.scss'
import { Article } from './article'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'

function Articles({ news, nextPage, prevPage, resultsRef }) {
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
			/>
		)
	}) : null

	return news ? (
		<div 
			ref={resultsRef}
			className={resultsClass}
		>
			<nav className={styles.nav}>
				{/* <BsArrowLeft 
					className={styles.prev}
					onClick={prevPage}
				/> */}
				<button
					className={styles.button}
					onClick={prevPage}
				>
					Prev
				</button>
				<h3 className={styles.count}>{`${news.start} - ${news.end} of ${news.count}`}</h3>
				{/* <span className={styles.buttons}> */}
					{/* <BsArrowLeft 
						onClick={prevPage}
					/> */}
				<button
					className={styles.button}
					onClick={nextPage}
				>
					Next
				</button>
				{/* <BsArrowRight 
					className={styles.next}
					onClick={nextPage}
				/> */}
				{/* </span> */}
			</nav>
			<ul 
				// id='articles' 
				className={styles.articles}
			>
				{articles}
			</ul>
		</div>
	) : null
}

export { Articles }