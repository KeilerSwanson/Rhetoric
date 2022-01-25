import * as styles from '../styles/Loading.module.scss'
import { memo } from 'react'

function Loading({ loading }) {
	const loadingClass = loading ? styles.loading : styles.notLoading

	return (
		<div className={loadingClass}>
			<div className={styles.spinner}>
				<span className={styles.rect1} />
				<span className={styles.rect2} />
				<span className={styles.rect3} />
				<span className={styles.rect4} />
				<span className={styles.rect5} />
				<span className={styles.rect6} />
			</div>
		</div>
	)
}

export default memo(Loading)