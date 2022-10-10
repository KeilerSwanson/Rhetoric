import { memo, useEffect } from 'react'

import Source from './Source'

import sourceList from '../lib/sourceList'

import styles from '../styles/MenuItem.module.scss'
import effects from '../styles/Effects.module.scss'
import { BsChevronDown } from 'react-icons/bs'


function Sources({ isOpen, headerRef, sourceListRef, currentSources, toggleItems, setHeight }) {
	const itemClass = isOpen ? styles.itemOpen : styles.item


	useEffect(() => {
		if (isOpen) {
			setHeight.call(sourceListRef)
		} else {
			sourceListRef.current.style.cssText = 'height: 0px;'
		}
	}) 


	return (
		<li className={itemClass}>
			<span 
				className={`${styles.header} ${effects.hover}`}	
				ref={headerRef}
				onClick={() => toggleItems('sources')}
			>
				<h2 className={styles.heading}>Sources</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul className={styles.dropdown} ref={sourceListRef}>
				{
					Object.keys(sourceList).map(name => {
						const isChecked = currentSources.includes(sourceList[name])

						return (
							<Source 
								key={name}
								name={name} 
								url={sourceList[name]}
								checked={isChecked}
							/>
						)
					})
				}
			</ul>
		</li>
	)
}


export default memo(Sources)