import { memo } from 'react'
import { VscClose } from 'react-icons/vsc'
import * as styles from '../styles/Bookmark.module.scss'

function Bookmark({ title, url }) {

	return (
		<li
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