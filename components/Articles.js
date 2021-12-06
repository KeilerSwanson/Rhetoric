import * as styles from '../styles/Articles.module.scss'
import { Article } from './article'

function Articles({ news }) {

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
		<ul id='articles' className={articlesClass}>
			{articles}
		</ul>
	)
}

export { Articles }