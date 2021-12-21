import * as styles from '../styles/Article.module.scss'
import { Buttons } from './Buttons'

function Article({title, source, date, description, content, url}) {
	const formattedDescription = description ? `${description.substring(0, 200)}..` : `${content.substring(0, 200)}..`

	function formatDate(date) {
		const newDate = new Date(date).toDateString().split('')
		newDate.splice(0, 4)
		newDate.splice(-5, 0, ',')
		return newDate.join('')
	}

	return (
		<li className={styles.article}>
			<span className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.meta}>{source} | {formatDate(date)}</h3>
				<p className={styles.description}>{formattedDescription}</p>
			</span>
			{/* <Buttons 
				url={url}
			/> */}
		</li>
	)
}

export { Article }