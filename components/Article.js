import * as styles from '../styles/Article.module.scss'
import { formatSource, formatDate, formatExcerpt } from '../lib/utils'
import { memo } from 'react'

function Article({ title, source, date, excerpt, url }) {

	return (
		<li 
			className={styles.article}
		>
			<span className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.meta}>
					{formatSource(source)}
					<pre className={styles.spacer}> / </pre>
					{formatDate(date)}
				</h3>
				<p className={styles.excerpt}>{formatExcerpt(excerpt)}</p>
			</span>
			<span className={styles.buttons}>
				<button 
					className={styles.bookmark}
					data-title={title}
					data-url={url}
				>
					Bookmark
				</button>
				<a 
					className={styles.read}
					href={url}
					rel='noopener noreferrer'
					target='_blank'
				>
					Read
				</a>
			</span>
		</li>
	)
}

export default memo(Article)