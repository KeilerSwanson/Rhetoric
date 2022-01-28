import { memo, useEffect } from 'react'
import * as styles from '../styles/MenuItem.module.scss'
import { BsChevronDown } from 'react-icons/bs'
import Source from './Source'
import { sourceList } from '../lib/sourceList'

function Sources({ open, itemRef, headerRef, toggleItems, setHeight, sourcesRef, queryParams }) {
	const itemClass = open ? styles.itemOpen : styles.item

	useEffect(() => {
		if (open) {
			setHeight.bind(sourcesRef)()
		} else {
			sourcesRef.current.style.cssText = 'height: 0px;'
		}
	})

	const sources = Object.keys(sourceList).map(title => {
		const checked = queryParams.sources.includes(sourceList[title]) ? true : false
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
				className={styles.header}	
				ref={headerRef}
				onClick={() => toggleItems.bind(itemRef)()}
			>
				<h2 className={styles.title}>Sources</h2>
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