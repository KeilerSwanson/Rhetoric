import * as styles from '../styles/Articles.module.scss'
import { Article } from './article'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'

function Articles({ news, page, nextPage, prevPage }) {
	// Article interval 
	const articlesClass = news ? styles.articles : null
	const articles = news ? news.articles.map((article, i) => {
		return (
			<Article 
				key={i}
				title={article.title}
				publisher={article.source.name}
				date={article.publishedAt}
				description={article.description}
				content={article.content}
				url={article.url}
			/>
		)
	}) : null

	return (
		<div className={styles.results}>
			<nav className={styles.nav}>
				<h3 className={styles.nums}>{`x - y of z`}</h3>
				<span className={styles.buttons}>
					<BsArrowLeft 
						onClick={prevPage}
					/>
					<BsArrowRight 
						onClick={nextPage}
					/>
				</span>
			</nav>
			<ul id='articles' className={articlesClass}>
				{articles}
			</ul>
		</div>
	)
}

export { Articles }