import * as styles from '../styles/Articles.module.scss'
import { Article } from './article'

function Articles({ news }) {

	const articles = news ? news.articles.map((article, i) => {
		return (
			<Article 
				key={i}
				title={article.title}
				publisher={article.source.name}
				date={article.publishedAt}
				description={article.content}
				url={article.url}
			/>
		)
	}) : null

	return (
		<ul className={styles.articles}>
			{articles}
		</ul>
	)
}

export { Articles }