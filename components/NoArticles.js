import * as styles from '../styles/NoArticles.module.scss'

function NoArticles({ query }) {
	return (
		<div className={styles.noArticles}>
			<h1>{`It looks like there's no articles for '${query}'`}</h1>
		</div>
	)
}

export { NoArticles }