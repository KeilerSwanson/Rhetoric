import { memo } from 'react'
import * as styles from '../styles/MenuItem.module.scss'
import { BsChevronDown } from 'react-icons/bs'
import Source from './Source'
import { sourceList } from '../lib/sourceList'

function Sources({ menuItemRef, itemRefs, toggleItems }) {

	const sources = Object.keys(sourceList).map(title => {
		return (
			<Source 
				key={title}
				title={title} 
			/>
		)
	})

	return (
		<li 
			className={styles.item}
			ref={menuItemRef}
		>
			<span 
				className={styles.header}	
				onClick={() => toggleItems(itemRefs.sources.current, [itemRefs.bookmarks.current, itemRefs.info.current])}
			>
				<h2 className={styles.title}>Sources</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={itemRefs.sources}	
			>
				{sources}
			</ul>
		</li>
	)
}

export default memo(Sources)