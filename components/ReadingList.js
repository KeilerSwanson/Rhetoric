import * as styles from '../styles/ReadingList.module.scss'
import { BsX } from 'react-icons/bs'

function ReadingList({ readingOpen, readingList, setReadingList }) {
	const readingClass = readingOpen ? styles.readingOpen : styles.reading
	let articles = []
	if (readingList) {
		for (let title in readingList) {
			articles.push(
				<li
					key={readingList[title]}
					className={styles.article}
				>
					<a 
						className={styles.title}
						href={readingList[title]}
						target='_blank'
						rel='noopener noreferrer'
					>
						{`${title.substring(0, 25)}..`}
					</a>
					<BsX 
						onClick={() => removeArticle(title)}
					/>
				</li>
			)
		}
	}

	function removeArticle(title) {
		const listCopy = {...readingList}
		delete listCopy[title]
		setReadingList(listCopy)
	}

	return (
		<nav className={readingClass}>
			<menu className={styles.articles}>
				{articles}
			</menu>
		</nav>
	)
}

export { ReadingList }