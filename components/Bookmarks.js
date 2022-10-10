import { memo, useRef, useEffect } from 'react'

import Bookmark from './Bookmark'

import styles from '../styles/MenuItem.module.scss'
import effects from '../styles/Effects.module.scss'
import { BsChevronDown } from 'react-icons/bs'


function Bookmarks({ isOpen, bookmarks, setBookmarks, toggleItems, setHeight }) {
	const dropdownRef = useRef()
	const bookmarksObj = JSON.parse(bookmarks)
	const itemClass = isOpen ? styles.itemOpen : styles.item


	useEffect(() => {
		if (isOpen) {
			setHeight.call(dropdownRef)
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


	return (
		<li className={itemClass}>
			<span className={`${styles.header} ${effects.hover}`} onClick={() => toggleItems('bookmarks')}>
				<h2 className={styles.heading}>Bookmarks</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={dropdownRef}
				onClick={(e) => removeBookmark(e)}
			>
				{
					(Object.keys(bookmarksObj).length > 0) ? Object.keys(bookmarksObj).map(title => {
						return (
							<Bookmark 
								key={bookmarksObj[title]}
								title={title}
								url={bookmarksObj[title]}
							/>
						)
					}) : <Bookmark title='No bookmarks' />
				}
			</ul>
		</li>
	)
}


export default memo(Bookmarks)