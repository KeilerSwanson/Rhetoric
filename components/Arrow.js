import styles from '../styles/Arrow.module.scss'

function Arrow({handler}) {
	return (
		<div
			onClick={() => handler()}
			className={styles.arrow}
		>
		</div>
	)
}

export { Arrow }