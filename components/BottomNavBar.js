import * as styles from '../styles/BottomNavBar.module.scss'
import { memo } from 'react'
import { BsChevronRight, BsChevronLeft, BsChevronUp } from 'react-icons/bs'

function BottomNavBar({ articles, numPages, currPage, prevPage, nextPage }) {
	const navClass = articles ? styles.navShow : styles.nav

	function toTop() {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}

	return (
		<nav className={navClass}>
			<span className={styles.pagination}>
				<button 
					className={styles.prev}
					onClick={prevPage}
				>
					<BsChevronLeft />
				</button>
				<span className={styles.pages}>
					{`Page ${currPage} of ${numPages}`}	
				</span>
				<button 
					className={styles.next}
					onClick={nextPage}	
				>
					<BsChevronRight />
				</button>
			</span>
			<button 
				className={styles.top}
				onClick={toTop}
			>
				<BsChevronUp />
			</button>
		</nav>
	)
}

export default memo(BottomNavBar)