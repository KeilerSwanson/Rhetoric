import styles from '../styles/NavBar.module.scss'
import { BsBookmarks, BsSliders, BsArrowUp, BsInfoCircle } from 'react-icons/bs'
import { memo, useState } from 'react'

function NavBar({ modalOpen, toggleModal }) {
	const btnClass = modalOpen ? styles.btnOpen : styles.btn

	return (
		<nav className={styles.navBar}>
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

