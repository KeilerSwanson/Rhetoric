import * as styles from '../styles/Source.module.scss'
import { BsCheck2 } from 'react-icons/bs'
import { memo } from 'react'

function Source({ title, formattedTitle, checked }) {

	return (	
		<li 
			className={styles.source}
			data-source={formattedTitle}
		>
			<label 
				className={styles.label} 
				name='label'
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

export default memo(Source)