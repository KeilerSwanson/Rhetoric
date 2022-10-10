import { memo } from 'react'

import styles from '../styles/BottomNav.module.scss'
import effects from '../styles/Effects.module.scss'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'


function BottomNav({ news, prevPage, nextPage }) {
	const navClass = news.articles ? styles.navShow : styles.nav

	return (
		<nav className={navClass}>
			<span className={styles.paginate}>
				<button className={`${styles.prev} ${effects.hover}`} onClick={prevPage}>
					<BsChevronLeft className={styles.icon} />
				</button>
				<span className={styles.pages}>
					{`Page ${news.currPage} of ${news.numPages}`}	
				</span>
				<button className={`${styles.next} ${effects.hover}`} onClick={nextPage}>
					<BsChevronRight className={styles.icon} />
				</button>
			</span>
		</nav>
	)
}


export default memo(BottomNav)