import styles from '../styles/Loading.module.scss'

function Loading({ loadingRef }) {

	return (
		<div 
			ref={loadingRef}
			className={styles.loading}	
		>
			<div className={styles.spinner}>
				<span className={styles.cube1} />
				<span className={styles.cube2} />
			</div>
		</div>
	)
}

export default Loading