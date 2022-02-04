import { memo, useState, useRef, useCallback } from 'react'
import Sources from './Sources'
import Bookmarks from './Bookmarks'
import About from './About'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'
import styles from '../styles/Menu.module.scss'

function Menu({ sources, open, bookmarks, setBookmarks, sourcesRef }) {	
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
	const menuRef = useRef()
	const headerRef = useRef()
	const menuClass = open ? styles.menuOpen : styles.menu

	function setHeight() {
		const headerHeight = parseInt(window.getComputedStyle(headerRef.current).height)
		const availableHeight = parseInt(window.getComputedStyle(menuRef.current).height) - (headerHeight * 3)
		this.current.style.cssText = `height: ${availableHeight}px`
	}

	const memoSetHeight = useCallback(setHeight, [])

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

	const memoToggleItems = useCallback(toggleItems, [itemsOpen])

	return (
		<nav 
			className={menuClass}
			onMouseOver={disableBodyScroll}
			onMouseOut={enableBodyScroll}	
		>
			<menu 
				className={styles.menuItems}
				ref={menuRef}
			>
				<Sources
					open={itemsOpen.sources}
					itemRef={itemRefs.sources}
					headerRef={headerRef}
					toggleItems={memoToggleItems}
					setHeight={memoSetHeight}
					sourcesRef={sourcesRef}
					querySources={sources}
				/>
				<Bookmarks 
					open={itemsOpen.bookmarks}
					itemRef={itemRefs.bookmarks}
					toggleItems={memoToggleItems}
					setHeight={memoSetHeight}
					bookmarks={bookmarks}
					setBookmarks={setBookmarks}
				/>
				<About 
					open={itemsOpen.about}
					itemRef={itemRefs.about}
					toggleItems={memoToggleItems}
					setHeight={memoSetHeight}
				/>
			</menu>
		</nav>
	)
}

export default memo(Menu)