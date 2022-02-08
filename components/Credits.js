import { memo } from 'react'
import styles from '../styles/Credits.module.scss'
import effects from '../styles/Effects.module.scss'

function Credits() {

	return (
		<li className={styles.credits}>
			<a
				className={`${styles.credit} ${effects.hover}`}
				href='https://github.com/KeilerSwanson/Rhetoric'
				target='_blank'
				rel='noopener noreferrer'
			>
				Github
			</a>
			<a
				className={`${styles.credit} ${effects.hover}`}
				href='https://keiler.me/'
				target='_blank'
				rel='noopener noreferrer'
			>
				Built by Keiler
			</a>
			<a
				className={`${styles.credit} ${effects.hover}`}
				href='https://newscatcherapi.com/'
				target='_blank'
				rel='noopener noreferrer'
			>
				Data from Newscatcher
			</a>
		</li>
	)
}

export default memo(Credits)