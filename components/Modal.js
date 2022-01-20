import { memo, useState, useRef, useEffect } from 'react'
import * as styles from '../styles/Modal.module.scss'
import { disableBodyScroll, enableBodyScroll } from '../lib/utils'
import Sources from '../components/Sources'
import Bookmarks from '../components/Bookmarks'
import Info from '../components/Info'
// import { BsChevronDown } from 'react-icons/bs'
// import { BsGithub } from 'react-icons/bs'


function Modal({ modalOpen }) {	
	const menuRef = useRef()
	const menuItemRef = useRef()
	const itemRefs = {
		sources: useRef(),
		bookmarks: useRef(),
		info: useRef()
	}
	const [listHeight, setListHeight] = useState(0)
	const modalClass = modalOpen ? styles.modalOpen : styles.modal

	useEffect(() => {
		const menuHeight = parseInt(window.getComputedStyle(menuRef.current).height)
		const menuItemHeight = parseInt(window.getComputedStyle(menuItemRef.current).height)
		setListHeight(menuHeight - (menuItemHeight * 3))
	}, [listHeight])

	function toggleItems(itemToOpen, itemsToClose) {
		itemsToClose.forEach(item => item.style.cssText = 'height: 0px; padding: 0 25px;')
		if (window.getComputedStyle(itemToOpen).height === '0px') {
			itemToOpen.style.cssText = `height: ${listHeight}px; padding: 25px; border-top: var(--thinWhite);`
		} else {
			itemToOpen.style.cssText = `height: 0px; padding: 0 25px;`
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
					menuItemRef={menuItemRef}
					itemRefs={itemRefs}
					toggleItems={toggleItems}
				/>
				<Bookmarks 
					itemRefs={itemRefs}
					toggleItems={toggleItems}
				/>
				<Info 
					itemRefs={itemRefs}
					toggleItems={toggleItems}
				/>
			</menu>
		</nav>
	)
}

export default memo(Modal)