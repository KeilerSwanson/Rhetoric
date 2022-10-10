import { memo } from 'react'

import { formatSource, formatDate, formatExcerpt } from '../lib/utils'

import styles from '../styles/Article.module.scss'
import effects from '../styles/Effects.module.scss'


function Article({ title, source, date, excerpt, url }) {

	return (
		<li className={styles.article}>
			<h1 className={styles.title}>{title}</h1>
			<h2 className={styles.meta}>
				{formatSource(source)} / {formatDate(date)}
			</h2>
			<p className={styles.excerpt}>{formatExcerpt(excerpt)}</p>
			<span className={styles.btns}>
				<button 
					className={`${styles.bookmark} ${effects.hover}`}
					data-title={title}
					data-url={url}
				>
					Bookmark
				</button>
				<a 
					className={`${styles.read} ${effects.hover}`}
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