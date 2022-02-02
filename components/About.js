import { memo, useRef, useEffect } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { Credits } from './Credits'
import * as styles from '../styles/MenuItem.module.scss'

function About({ open, itemRef, toggleItems, setHeight }) {
	const dropdownRef = useRef()
	const itemClass = open ? styles.itemOpen : styles.item

	useEffect(() => {
		if (open) {
			setHeight.bind(dropdownRef)()
		} else {
			dropdownRef.current.style.cssText = 'height: 0px;'
		}
	})

	return (
		<li 
			id='about'
			className={itemClass}
			ref={itemRef}
		>
			<span 
				className={styles.header}
				onClick={() => toggleItems.bind(itemRef)()}
			>
			<h2 className={styles.title}>About</h2>
			<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={dropdownRef}
			>
				<Credits />
			</ul>
		</li>
	)
}

export default memo(About)