import { memo, useEffect } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import Source from './Source'
import sourceList from '../lib/sourceList'
import styles from '../styles/MenuItem.module.scss'
import effects from '../styles/Effects.module.scss'

function Sources({ open, itemRef, headerRef, toggleItems, setHeight, sourcesRef, querySources }) {
	const itemClass = open ? styles.itemOpen : styles.item

	useEffect(() => {
		if (open) {
			setHeight.bind(sourcesRef)()
		} else {
			sourcesRef.current.style.cssText = 'height: 0px;'
		}
	})

	const sources = Object.keys(sourceList).map(title => {
		const checked = querySources.includes(sourceList[title]) ? true : false
		return (
			<Source 
				key={title}
				title={title} 
				dataSource={sourceList[title]}
				checked={checked}
			/>
		)
	})

	return (
		<li 
			id='sources'
			className={itemClass}
			ref={itemRef}
		>
			<span 
				className={`${styles.header} ${effects.hover}`}	
				ref={headerRef}
				onClick={() => toggleItems.bind(itemRef)()}
			>
				<h2 className={styles.heading}>Sources</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={sourcesRef}
			>
				{sources}
			</ul>
		</li>
	)
}

export default memo(Sources)