import * as styles from '../styles/Buttons.module.scss'
import { MdAdd, MdKeyboardArrowRight } from 'react-icons/md'

function Buttons({url}) {
	return (
		<span className={styles.buttons}>
			<button 
				className={styles.add}
			>
				<MdAdd />
			</button>
			<a 
				className={styles.read}
				href={url}
				rel='noopener noreferrer'
				target='_blank'
			>
				<MdKeyboardArrowRight />
			</a>
		</span>
	)
}

export { Buttons }