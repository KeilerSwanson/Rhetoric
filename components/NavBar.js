import { memo } from 'react'
import styles from '../styles/NavBar.module.scss'

function NavBar({ navRef, modalOpen, toggleModal, loading }) {
	const btnClass = modalOpen ? styles.btnOpen : styles.btn
	const navClass = loading ? styles.navLoading : styles.nav

	return (
		<nav 
			ref={navRef}
			className={navClass}	
		>
			<h1 className={styles.logo}>Rhetoric</h1>
			<button 
				className={btnClass}
				onClick={toggleModal}
			>
				<div className={styles.barWrapper}>
					<span className={styles.barOne} />
					<span className={styles.barTwo} />
				</div>
			</button>
		</nav>
	)
}

export default memo(NavBar)

