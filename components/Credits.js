import * as styles from '../styles/Credits.module.scss'

function Credits() {
	return (
		<li className={styles.credits}>
			<a
				className={styles.credit}
				href='https://github.com/KeilerSwanson/Rhetoric'
				target='_blank'
				rel='noopener noreferrer'
			>
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