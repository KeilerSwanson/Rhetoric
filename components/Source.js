import { memo } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import styles from '../styles/Source.module.scss'
import effects from '../styles/Effects.module.scss'

function Source({ title, dataSource, checked }) {

	return (
		<li 
			className={`${styles.source} ${effects.hover}`}
			data-source={dataSource}
		>
			<label 
				className={styles.label} 
				name='label'
				htmlFor={title}
			>
				{title}
			</label>
			<input 
				id={title}
				className={styles.checkbox} 
				type='checkbox' 
				name='checkbox'
				defaultChecked={checked}
			/>
			<BsCheck2 
				className={styles.icon}
			/>
		</li>
	)
}

export default memo(Source)