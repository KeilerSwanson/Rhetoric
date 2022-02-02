import { memo } from 'react'
import { VscClose } from 'react-icons/vsc'
import styles from '../styles/Bookmark.module.scss'
import effects from '../styles/Effects.module.scss'

function Bookmark({ title, url }) {

	if (title === 'No bookmarks') {
		return (
			<li
				className={`${styles.bookmark} ${styles.title}`}
				title={title}
			>
			{title}
			</li>
		)
	}

	return (
		<li
			className={`${styles.bookmark} ${effects.hover}`}
			title={title}
		>
			<a 
				className={styles.title}
				href={url}
				target='_blank'
				rel='noopener noreferrer'
			>
				{`${title.substring(0, 28)}..`}
			</a>
			<button 
				className={styles.remove}
				data-title={title}
			>
				<VscClose 
					className={styles.icon}
				/>
			</button>
		</li>
	)
}

export default memo(Bookmark)