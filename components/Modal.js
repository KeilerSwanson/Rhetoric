import { memo, useState, useRef, useEffect } from 'react'
import * as styles from '../styles/Modal.module.scss'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'
import Sources from './Sources'
import Bookmarks from './Bookmarks'
import Info from './Info'
// import { BsChevronDown } from 'react-icons/bs'
// import { BsGithub } from 'react-icons/bs'


function Modal({ queryParams, modalOpen, menuItemRefs, bookmarks, setBookmarks }) {	
	// console.log('modal render')
	const menuRef = useRef()
	const menuItemRef = useRef()
	const [listHeight, setListHeight] = useState(0)
	const modalClass = modalOpen ? styles.modalOpen : styles.modal

	useEffect(() => {
		const menuHeight = parseInt(window.getComputedStyle(menuRef.current).height)
		const menuItemHeight = parseInt(window.getComputedStyle(menuItemRef.current).height)
		setListHeight(menuHeight - (menuItemHeight * 3))
	}, [listHeight])

	function toggleItems(itemToOpen, itemsToClose) {
		itemsToClose.forEach(item => item.style.cssText = 'height: 0px; padding: 0 2rem;')
		if (window.getComputedStyle(itemToOpen).height === '0px') {
			itemToOpen.style.cssText = `height: ${listHeight}px; padding: 2rem; border-top: var(--thinWhite);`
		} else {
			itemToOpen.style.cssText = `height: 0px; padding: 0 2rem;`
		}
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
					queryParams={queryParams}
					menuItemRef={menuItemRef}
					itemRefs={menuItemRefs}
					toggleItems={toggleItems}
				/>
				<Bookmarks 
					itemRefs={menuItemRefs}
					toggleItems={toggleItems}
					bookmarks={bookmarks}
					setBookmarks={setBookmarks}
				/>
				<Info 
					itemRefs={menuItemRefs}
					toggleItems={toggleItems}
				/>
			</menu>
		</nav>
	)
}

export default memo(Modal)