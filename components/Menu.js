import { memo, useState, useRef, useCallback } from 'react'

import Sources from './Sources'
import Bookmarks from './Bookmarks'
import About from './About'

import { disableBodyScroll, enableBodyScroll } from '../lib/utils'

import styles from '../styles/Menu.module.scss'


function Menu({ isOpen, currentSources, sourceListRef, bookmarks, setBookmarks }) {	
	const [itemOpen, setItemOpen] = useState({
		sources: false,
		bookmarks: false,
		about: false
	})
	
	const menuRef = useRef()
	const headerRef = useRef()

	const menuClass = isOpen ? styles.menuOpen : styles.menu


	// Calculate available height for open menu item without overflowing the viewport
	// Setting height imperatively is the only way I could get the 'scroll open' effect I wanted
	function setHeight() {
		const headerHeight = parseInt(window.getComputedStyle(headerRef.current).height)
		const availableHeight = parseInt(window.getComputedStyle(menuRef.current).height) - (headerHeight * 3)
		this.current.style.cssText = `height: ${availableHeight}px`
	}

	const memoSetHeight = useCallback(setHeight, [])

	// Open only one menu item at a time
	function toggleItems(itemId) {
		const items = {}

		for (let item in itemOpen) {
			if (item === itemId) {
				items[item] = !itemOpen[item]
			} else {
				items[item] = false
			}
		}

		setItemOpen(items)
	}

	const memoToggleItems = useCallback(toggleItems, [itemOpen])


	return (
		<nav 
			className={menuClass}
			onMouseOver={disableBodyScroll}
			onMouseOut={enableBodyScroll}	
		>
			<menu className={styles.menuItems} ref={menuRef}>
				<Sources
					isOpen={itemOpen.sources}
					headerRef={headerRef}
					sourceListRef={sourceListRef}
					currentSources={currentSources}
					toggleItems={memoToggleItems}
					setHeight={memoSetHeight}
				/>
				<Bookmarks 
					isOpen={itemOpen.bookmarks}
					bookmarks={bookmarks}
					setBookmarks={setBookmarks}
					toggleItems={memoToggleItems}
					setHeight={memoSetHeight}
				/>
				<About 
					isOpen={itemOpen.about}
					toggleItems={memoToggleItems}
					setHeight={memoSetHeight}
				/>
			</menu>
		</nav>
	)
}


export default memo(Menu)