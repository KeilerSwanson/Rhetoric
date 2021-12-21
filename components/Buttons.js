import * as styles from '../styles/Buttons.module.scss'
import { MdAdd, MdKeyboardArrowRight } from 'react-icons/md'

function Buttons({ url, title, readingList, setReadingList }) {
	function addArticle(title, url) {
		const listCopy = {...readingList}
		listCopy[title] = url
		window.localStorage.setItem('readingList', JSON.stringify(listCopy))
		setReadingList(listCopy)
	}

	return (
		<span className={styles.buttons}>
			<button 
				className={styles.add}
				onClick={() => addArticle(title, url)}
			>
				<MdAdd />
			</button>
			<a 
				className={styles.read}
				href={url}
				rel='noopener noreferrer'
				target='_blank'
			>
				<MdKeyboardArrowRight />
			</a>
		</span>
	)
}

export { Buttons }