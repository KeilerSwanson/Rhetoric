import * as styles from '../styles/ToTop.module.scss'
import { MdKeyboardArrowUp } from 'react-icons/md'

function ToTop() {
	return (
		<button className={styles.toTop}>
			<MdKeyboardArrowUp />
		</button>
	)
}

export { ToTop }