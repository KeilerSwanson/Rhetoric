import { memo } from 'react'
import styles from '../styles/TopNav.module.scss'
import effects from '../styles/Effects.module.scss'

function TopNav({ navRef, menuOpen, toggleMenu }) {
	const btnClass = menuOpen ? styles.btnOpen : styles.btn

	function toTop() {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}

	return (
		<nav ref={navRef} className={styles.nav}>
			<h1 className={styles.logo} onClick={toTop}>
				Rhetoric
			</h1>
			<button className={`${btnClass} ${effects.hover}`} onClick={toggleMenu}>
				<span className={styles.barWrap}>
					<span className={styles.barOne} />
					<span className={styles.barTwo} />
				</span>
			</button>
		</nav>
	)
}

export default memo(TopNav)

