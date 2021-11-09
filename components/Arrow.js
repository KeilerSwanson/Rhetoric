import styles from '../styles/Arrow.module.scss'
// import { MdKeyboardArrowDown } from 'react-icons/md'

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