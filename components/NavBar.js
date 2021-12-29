import styles from '../styles/NavBar.module.scss'
import { BsBookmarks, BsSliders, BsArrowUp, BsInfoCircle } from 'react-icons/bs'
import { memo } from 'react'

function NavBar({ toggleFilter, toggleReading, filterOpen, readingOpen }) {
	// const infoClass = styles.info
	const filterClass = filterOpen ? styles.filterOpen : styles.filter
	const readingClass = readingOpen ? styles.readingOpen : styles.readingList

	return (
		<nav className={styles.navBar}>
			<menu className={styles.menu}>
				<li 
					className={styles.top}
					onClick={() => window.scrollTo({
						top: 0,
						left: 0,
						behavior: 'smooth'
					})}
				>
					<BsArrowUp />
				</li>
				{/* <li
					className={infoClass}
					onClick={toggleInfo}
				>
					<BsInfoCircle />
				</li> */}
				<li 
					className={readingClass}
					onClick={toggleReading}
				>
					<BsBookmarks /> 
				</li>
				<li
					className={filterClass}
					onClick={toggleFilter}
				>
					<BsSliders />
				</li>
			</menu>
		</nav>
	)
}

export default memo(NavBar)

