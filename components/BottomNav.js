import { memo } from 'react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import styles from '../styles/BottomNav.module.scss'
import effects from '../styles/Effects.module.scss'

function BottomNav({ news, prevPage, nextPage, loading }) {
	const navClass = news.articles ? styles.navShow : styles.nav
	const paginateClass = loading ? styles.paginateLoading : styles.paginate

	return (
		<nav className={navClass}>
			<span className={paginateClass}>
				<button 
					className={`${styles.prev} ${effects.hover}`}
					onClick={prevPage}
				>
					<BsChevronLeft className={styles.icon} />
				</button>
				<span className={styles.pages}>
					{`Page ${news.currPage} of ${news.numPages}`}	
				</span>
				<button 
					className={`${styles.next} ${effects.hover}`}
					onClick={nextPage}	
				>
					<BsChevronRight className={styles.icon} />
				</button>
			</span>
		</nav>
	)
}

export default memo(BottomNav)