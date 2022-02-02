import { memo } from 'react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import * as styles from '../styles/PaginationNav.module.scss'

function PaginationNav({ news, prevPage, nextPage, loading }) {
	const navClass = news.articles ? styles.navShow : styles.nav
	const pagClass = loading ? styles.paginationLoading : styles.pagination

	return (
		<nav className={navClass}>
			<span className={pagClass}>
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