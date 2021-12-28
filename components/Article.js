import * as styles from '../styles/Article.module.scss'
import { BsPlus, BsArrowRightShort } from 'react-icons/bs'
import { formatDate } from '../lib/utils'

function Article({ title, source, date, description, content, url }) {
	const formattedDescription = description ? `${description.substring(0, 200)}..` : `${content.substring(0, 200)}..`

	return (
		<li 
			className={styles.article}
		>
			<span className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.meta}>{source} | {formatDate(date)}</h3>
				<p className={styles.description}>{formattedDescription}</p>
			</span>
			<span className={styles.buttons}>
				<button 
					className={styles.add}
					data-title={title}
					data-url={url}
				>
					<BsPlus />
				</button>
				<a 
					className={styles.read}
					href={url}
					rel='noopener noreferrer'
					target='_blank'
				>
					<BsArrowRightShort />
				</a>
			</span>
		</li>
	)
}

export { Article }