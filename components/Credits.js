import * as styles from '../styles/Credits.module.scss'
import { BsGithub } from 'react-icons/bs'

function Credits() {
	return (
		<li className={styles.credits}>
			<a
				className={styles.credit}
				href='https://github.com/KeilerSwanson/Rhetoric'
				target='_blank'
				rel='noopener noreferrer'
			>
				{/* <BsGithub 
					className={styles.github}
				/> */}
				Github
			</a>
			<a
				className={styles.credit}
				href='https://keiler.me/'
				target='_blank'
				rel='noopener noreferrer'
			>
				Built by Keiler
			</a>
			<a
				className={styles.credit}
				href='https://newscatcherapi.com/'
				target='_blank'
				rel='noopener noreferrer'
			>
				Data from Newscatcher API
			</a>
		</li>
	)
}

export { Credits }