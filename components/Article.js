import * as styles from '../styles/Article.module.scss'
import { BsPlus, BsArrowRightShort } from 'react-icons/bs'
import { formatDate } from '../lib/utils'
import { memo } from 'react'

function Article({ title, source, date, description, url }) {
	// console.log('article render')
	// const formattedDescription = description ? `${description.substring(0, 200)}..` : `${content.substring(0, 200)}..`
	const formattedDescription = `${description.substring(0, 300)}..`;

	return (
		<li 
			className={styles.article}
		>
			<span className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.meta}>{source} / {formatDate(date)}</h3>
				<p className={styles.description}>{formattedDescription}</p>
			</span>
			<span className={styles.buttons}>
				<button 
					className={styles.bookmark}
					data-title={title}
					data-url={url}
				>
					{/* <BsPlus /> */}
					Bookmark
				</button>
				<a 
					className={styles.read}
					href={url}
					rel='noopener noreferrer'
					target='_blank'
				>
					{/* <BsArrowRightShort /> */}
					Read
				</a>
			</span>
		</li>
	)
}

export default memo(Article)