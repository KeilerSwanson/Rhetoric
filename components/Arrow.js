import styles from '../styles/Arrow.module.scss'

function Arrow({ handler, left }) {

	const arrowClass = left ? styles.arrowLeft : styles.arrow

	return (
		<span
			onClick={() => handler()}
			className={arrowClass}
		>
		</span>
	)
}

export { Arrow }