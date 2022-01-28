import { memo, useState, useRef } from 'react'
import * as styles from '../styles/Modal.module.scss'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'
import Sources from './Sources'
import Bookmarks from './Bookmarks'
import About from './About'

function Modal({ queryParams, modalOpen, bookmarks, setBookmarks, sourcesRef }) {	
	const menuRef = useRef()
	const [itemsOpen, setItemsOpen] = useState({
		sources: false,
		bookmarks: false,
		about: false
	})
	const itemRefs = {
		sources: useRef(),
		bookmarks: useRef(),
		about: useRef()
	}
	const headerRef = useRef()
	const modalClass = modalOpen ? styles.modalOpen : styles.modal

	function setHeight() {
		const headerHeight = parseInt(window.getComputedStyle(headerRef.current).height)
		const availableHeight = parseInt(window.getComputedStyle(menuRef.current).height) - (headerHeight * 3)
		this.current.style.cssText = `height: ${availableHeight}px`
	}


	// Implement without creating objects each call?
	function toggleItems() {
		const newItemsOpen = {}
		for (let item in itemsOpen) {
			if (item === this.current.id) {
				newItemsOpen[item] = !itemsOpen[item]
			} else {
				newItemsOpen[item] = false
			}
		}
		setItemsOpen(newItemsOpen)
	}

	return (
		<nav 
			className={modalClass}
			onMouseOver={disableBodyScroll}
			onMouseOut={enableBodyScroll}	
		>
			<menu 
				className={styles.menu}
				ref={menuRef}
			>
				<Sources
					open={itemsOpen.sources}
					itemRef={itemRefs.sources}
					headerRef={headerRef}
					toggleItems={toggleItems}
					setHeight={setHeight}
					sourcesRef={sourcesRef}
					queryParams={queryParams}
				/>
				<Bookmarks 
					open={itemsOpen.bookmarks}
					itemRef={itemRefs.bookmarks}
					toggleItems={toggleItems}
					setHeight={setHeight}
					bookmarks={bookmarks}
					setBookmarks={setBookmarks}
				/>
				<About 
					open={itemsOpen.about}
					itemRef={itemRefs.about}
					toggleItems={toggleItems}
					setHeight={setHeight}
				/>
			</menu>
		</nav>
	)
}

export default memo(Modal)