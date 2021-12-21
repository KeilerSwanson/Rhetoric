import * as styles from '../styles/Source.module.scss'
import { BsCheck2 } from 'react-icons/bs'

function Source({ title, checked }) {

	// REPLACE WITH SOURCIFY IN INDEX
	function formatTitle(title) {
		return title.split(' ').map(word => {
			return word.toLowerCase()
		}).join('-')
	}
	const formattedTitle = formatTitle(title)

	return (	
		<li 
			className={styles.source}
			data-source={formattedTitle}
		>
			<label 
				className={styles.label} 
				name='label'
				// data-source={formattedTitle}
				htmlFor={formattedTitle}
			>
				{title}
			</label>
			<input 
				id={formattedTitle}
				className={styles.checkbox} 
				type='checkbox' 
				name='checkbox'
				defaultChecked={checked}
			/>
			<BsCheck2 
				className={styles.check}
			/>
		</li>
	)
}

export { Source }