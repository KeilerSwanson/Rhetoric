import { memo, useRef, useEffect } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import Bookmark from './Bookmark'
import styles from '../styles/MenuItem.module.scss'
import effects from '../styles/Effects.module.scss'

function Bookmarks({ open, itemRef, toggleItems, setHeight, bookmarks, setBookmarks }) {
	const dropdownRef = useRef()
	const itemClass = open ? styles.itemOpen : styles.item
	const bookmarksObj = JSON.parse(bookmarks)

	useEffect(() => {
		if (open) {
			setHeight.bind(dropdownRef)()
		} else {
			dropdownRef.current.style.cssText = 'height: 0px;'
		}
	})

	function removeBookmark(e) {
		const newBookmarks = {...bookmarksObj}
		const title = e.target.dataset.title
		delete newBookmarks[title]
		const newBookmarksStr = JSON.stringify(newBookmarks)
		window.localStorage.setItem('bookmarks', newBookmarksStr)
		setBookmarks(newBookmarksStr)
	}

	const articles = (Object.keys(bookmarksObj).length > 0) ? Object.keys(bookmarksObj).map(title => {
		return (
			<Bookmark 
				key={bookmarksObj[title]}
				title={title}
				url={bookmarksObj[title]}
			/>
		)
	}) : <Bookmark title='No bookmarks' />

	return (
		<li 
			id='bookmarks'
			className={itemClass}
			ref={itemRef}
		>
			<span 
				className={`${styles.header} ${effects.hover}`}
				onClick={() => toggleItems.bind(itemRef)()}
			>
				<h2 className={styles.heading}>Bookmarks</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={dropdownRef}
				onClick={(e) => removeBookmark(e)}
			>
				{articles}
			</ul>
		</li>
	)
}

export default memo(Bookmarks)