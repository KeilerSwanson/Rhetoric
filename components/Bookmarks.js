import * as styles from '../styles/MenuItem.module.scss'
// import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'
import { memo } from 'react'

function Bookmarks({ itemRefs, toggleItems }) {

	return (
		<li 
			className={styles.item}
		>
			<span 
				className={styles.header}
				onClick={() => toggleItems(itemRefs.bookmarks.current, [itemRefs.sources.current, itemRefs.info.current])}	
			>
				<h2 className={styles.title}>Bookmarks</h2>
				<BsChevronDown className={styles.icon} />
			</span>
			<ul 
				className={styles.dropdown}
				ref={itemRefs.bookmarks}
			>

			</ul>
		</li>
	)
}

export default memo(Bookmarks)