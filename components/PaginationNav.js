import * as styles from '../styles/PaginationNav.module.scss'
import { memo } from 'react'
import { BsChevronRight, BsChevronLeft, BsChevronUp } from 'react-icons/bs'

function PaginationNav({ news, prevPage, nextPage }) {
	const navClass = news.articles ? styles.navShow : styles.nav

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
					{`Page ${news.currPage} of ${news.numPages}`}	
				</span>
				<button 
					className={styles.next}
					onClick={nextPage}	
				>
					<BsChevronRight />
				</button>
			</span>
		</nav>
	)
}

export default memo(PaginationNav)