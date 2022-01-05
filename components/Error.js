import Link from 'next/link'
import * as styles from '../styles/Error.module.scss'

function Error({ message }) {
	return (
		<div className={styles.notFound}>
			<h1 className={styles.message}>{message}</h1>
			<Link href='/'>
				<a className={styles.home}>Home</a>
			</Link>
		</div>
	)
}

export { Error }