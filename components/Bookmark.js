import * as styles from '../styles/Bookmark.module.scss'
import { BsPlus, BsTrash2 } from 'react-icons/bs'
import { VscClose } from 'react-icons/vsc'
import { memo } from 'react'

function Bookmark({ title, url }) {
	// console.log('bookmark render')

	return (
		<li
			// key={readingList[title]}
			className={styles.bookmark}
			title={title}
		>
			<a 
				className={styles.title}
				href={url}
				target='_blank'
				rel='noopener noreferrer'
			>
				{`${title.substring(0, 30)}..`}
			</a>
			{/* Wrap the X */}
			<button 
				className={styles.remove}
				data-title={title}
			>
				<VscClose />
			</button>
		</li>
	)
}

export default memo(Bookmark)