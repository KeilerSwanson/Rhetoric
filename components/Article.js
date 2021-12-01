import * as styles from '../styles/Article.module.scss'
import { Buttons } from './Buttons'

function Article({title, publisher, date, description, url}) {

	const formattedDate = new Date(date).toDateString().slice(4)
	const formattedDescription = description.length > 150 ? description.substring(0, 150) + '...' : description

	return (
		<li className={styles.article}>
			<h2 className={styles.title}>{title}</h2>
			<h3 className={styles.meta}>{publisher} / {formattedDate}</h3>
			<p className={styles.description}>{formattedDescription}</p>
			<Buttons 
				url={url}
			/>
		</li>
	)
}

export { Article }