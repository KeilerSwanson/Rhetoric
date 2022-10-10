import Link from 'next/link'

import styles from '../styles/Error.module.scss'


function Error({ message }) {

	return (
		<div className={styles.error}>
			<h1 className={styles.message}>{message}</h1>
			<Link href='/'>
				<a className={styles.btn}>Home</a>
			</Link>
		</div>
	)
}


export { Error }