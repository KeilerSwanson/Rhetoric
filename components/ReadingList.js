import * as styles from '../styles/ReadingList.module.scss'
import { BsX } from 'react-icons/bs'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'

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
						{`${title.substring(0, 20)}..`}
					</a>
					<BsX 
						className={styles.remove}
						data-title={title}
					/>
				</li>
			)
		}
	}

	function removeArticle(e) {
		const listCopy = {...readingList}
		delete listCopy[e.target.dataset.title]
		setReadingList(listCopy)
	}

	return (
		<menu 
			className={readingClass}
			onMouseOver={disableBodyScroll}
			onMouseOut={enableBodyScroll}
		>
			<h2 className={styles.articlesLabel}>Reading List</h2>
			<menu 
				className={styles.articles}
				onClick={(e) => removeArticle(e)}
			>
				{articles}
			</menu>
		</menu>
	)
}

export { ReadingList }