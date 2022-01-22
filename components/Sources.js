import { memo } from 'react'
import * as styles from '../styles/MenuItem.module.scss'
import { BsChevronDown } from 'react-icons/bs'
import Source from './Source'
import { sourceList } from '../lib/sourceList'

function Sources({ menuItemRef, itemRefs, toggleItems, queryParams }) {

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