import * as styles from '../styles/Loading.module.scss'
import { memo } from 'react'

function Loading({ loading }) {
	const loadingClass = loading ? styles.loading : styles.notLoading

	return (
		<div className={loadingClass}>
			<div className={styles.spinner}>
				<div className={styles.cube1}></div>
				<div className={styles.cube2}></div>
			</div>
		</div>
	)
}

export default memo(Loading)