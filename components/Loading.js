import styles from '../styles/Loading.module.scss'

function Loading({ loadingRef, isLoading }) {
	const loadingClass = isLoading ? styles.loadingShow : styles.loading

	return (
		<div ref={loadingRef} className={loadingClass}>
			<div className={styles.spinner}>
				<span className={styles.cube1} />
				<span className={styles.cube2} />
			</div>
		</div>
	)
}

export default Loading