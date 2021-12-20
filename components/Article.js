import * as styles from '../styles/Article.module.scss'
import { Buttons } from './Buttons'

function Article({title, publisher, date, description, content, url}) {

	const formattedDate = new Date(date).toDateString().split('').splice(-5, 0, '')
	formattedDate.splice(0, 4).join('')
	// const formattedDescription = description.length > 150 ? description.substring(0, 150) + '...' : description
	const formattedDescription = description ? `${description.substring(0, 150)}...` : `${content.substring(0, 150)}...`

	return (
		<li className={styles.article}>
			<span className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.meta}>{publisher} / {formattedDate}</h3>
				<p className={styles.description}>{formattedDescription}</p>
			</span>
			<Buttons 
				url={url}
			/>
		</li>
	)
}

export { Article }