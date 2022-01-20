import * as styles from '../styles/MenuItem.module.scss'
import { BsChevronDown, BsGithub } from 'react-icons/bs'
import { memo } from 'react'
import { Credits } from './Credits'

function Info({ itemRefs, toggleItems }) {

	return (
		<li 
			className={styles.item}
		>
			<span 
				className={styles.header}
				onClick={() => toggleItems(itemRefs.info.current, [itemRefs.sources.current, itemRefs.bookmarks.current])}	
			>
			<h2 className={styles.title}>Info</h2>
			<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={itemRefs.info}
			>
				<Credits />
			</ul>
		</li>
	)
}

export default memo(Info)