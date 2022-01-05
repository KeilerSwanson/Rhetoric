import * as styles from '../styles/ReadingList.module.scss'
import { BsX } from 'react-icons/bs'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'
import { memo } from 'react'

function ReadingList({ readingOpen, readingList, setReadingList }) {
	const readingClass = readingOpen ? styles.readingOpen : styles.reading

	function removeArticle(e) {
		const title = e.target.dataset.title
		const listCopy = {...readingList}
		delete listCopy[title]
		window.localStorage.setItem('readingList', JSON.stringify(listCopy))
		setReadingList(listCopy)
	}

	const articles = (Object.keys(readingList).length > 0) ? Object.keys(readingList).map(title => {
		return (
			<li
				key={readingList[title]}
				className={styles.article}
				title={title}
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
	}) : <li className={styles.noArticles}>No Saved Articles</li>

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

export default memo(ReadingList)