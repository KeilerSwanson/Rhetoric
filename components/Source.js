import { memo } from 'react'

import styles from '../styles/Source.module.scss'
import effects from '../styles/Effects.module.scss'
import { BsCheck2 } from 'react-icons/bs'


function Source({ name, url, checked }) {

	return (
		<li className={`${styles.source} ${effects.hover}`} data-url={url}>
			<label 
				className={styles.label} 
				name='label'
				htmlFor={name}
			>
				{name}
			</label>
			<input 
				id={name}
				className={styles.checkbox} 
				type='checkbox' 
				name='checkbox'
				defaultChecked={checked}
			/>
			<BsCheck2 className={styles.icon} />
		</li>
	)
}


export default memo(Source)