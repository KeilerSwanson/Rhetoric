import * as styles from '../styles/MenuItem.module.scss'
// import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'
import { memo } from 'react'
import Bookmark from './Bookmark'

function Bookmarks({ itemRefs, toggleItems, bookmarks, setBookmarks }) {
	// console.log('bookmarks render')

	function removeBookmark(e) {
		console.log('target: ', e.target)
		const title = e.target.dataset.title
		delete bookmarks[title]
		window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
		setBookmarks(JSON.stringify(bookmarks))
	}

	const articles = (Object.keys(bookmarks).length > 0) ? Object.keys(bookmarks).map(title => {
		return (
			<Bookmark 
				key={bookmarks[title]}
				title={title}
				url={bookmarks[title]}
			/>
		)
	}) : <li className={styles.noBookmark}>No bookmarks</li>

	return (
		<li 
			className={styles.item}
		>
			<span 
				className={styles.header}
				onClick={() => toggleItems(itemRefs.bookmarks.current, [itemRefs.sources.current, itemRefs.info.current])}	
			>
				<h2 className={styles.title}>Bookmarks</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={itemRefs.bookmarks}
				onClick={(e) => removeBookmark(e)}
			>
				{articles}
			</ul>
		</li>
	)
}

export default memo(Bookmarks)