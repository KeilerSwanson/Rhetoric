import * as styles from '../styles/Article.module.scss'
import { BsPlus, BsArrowRightShort } from 'react-icons/bs'

function Article({ title, source, date, description, content, url, readingList, setReadingList }) {
	const formattedDescription = description ? `${description.substring(0, 200)}..` : `${content.substring(0, 200)}..`

	function formatDate(date) {
		const newDate = new Date(date).toDateString().split('')
		newDate.splice(0, 4)
		newDate.splice(-5, 0, ',')
		return newDate.join('')
	}

	function addArticle(title, url) {
		const listCopy = {...readingList}
		listCopy[title] = url
		window.localStorage.setItem('readingList', JSON.stringify(listCopy))
		setReadingList(listCopy)
	}

	return (
		<li className={styles.article}>
			<span className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.meta}>{source} | {formatDate(date)}</h3>
				<p className={styles.description}>{formattedDescription}</p>
			</span>
			<span className={styles.buttons}>
				<button 
					className={styles.add}
					onClick={() => addArticle(title, url)}
				>
					<BsPlus />
				</button>
				<a 
					className={styles.read}
					href={url}
					rel='noopener noreferrer'
					target='_blank'
				>
					<BsArrowRightShort />
				</a>
			</span>
		</li>
	)
}

export { Article }