import * as styles from '../styles/Publisher.module.scss'

function Publisher({ title }) {

	function formatTitle(title) {
		return title.split(' ').map(word => {
			return word.toLowerCase()
		}).join('-')
	}

	const formattedTitle = formatTitle(title)

	return (	
		<li 
			className={`${styles.publisher} publisher`}
		>
			<label 
				className={styles.label} 
				name='label'
				data-source={formattedTitle}
				htmlFor={formattedTitle}
			>
				{title}
			</label>
			<input 
				id={formattedTitle}
				className={styles.checkbox} 
				type='checkbox' 
				name='checkbox'
				defaultChecked={true}
			/>
		</li>
	)
}

export { Publisher }