import * as styles from '../styles/Buttons.module.scss'
import { MdAdd, MdKeyboardArrowRight } from 'react-icons/md'

function Buttons({url}) {
	return (
		<span className={styles.buttons}>
			<button 
				className={styles.add}
			>
				<MdAdd />
				{/* Add To List */}
			</button>
			<a 
				className={styles.read}
				href={url}
				rel='noopener noreferrer'
				target='_blank'
			>
				<MdKeyboardArrowRight />
				{/* Read */}
			</a>
		</span>
	)
}

export { Buttons }