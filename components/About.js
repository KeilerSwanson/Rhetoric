import { memo, useRef, useEffect } from 'react'

import Credits from './Credits'

import styles from '../styles/MenuItem.module.scss'
import effects from '../styles/Effects.module.scss'
import { BsChevronDown } from 'react-icons/bs'


function About({ isOpen, toggleItems, setHeight }) {
	const dropdownRef = useRef()
	const itemClass = isOpen ? styles.itemOpen : styles.item


	useEffect(() => {
		if (isOpen) {
			setHeight.call(dropdownRef)
		} else {
			dropdownRef.current.style.cssText = 'height: 0px;'
		}
	})


	return (
		<li className={itemClass}>
			<span className={`${styles.header} ${effects.hover}`} onClick={() => toggleItems('about')}>
				<h2 className={styles.heading}>About</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul className={styles.dropdown} ref={dropdownRef}>
				<Credits />
			</ul>
		</li>
	)
}


export default memo(About)