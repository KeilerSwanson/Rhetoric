import styles from '../styles/NavBar.module.scss'
// import { GrFormClose } from 'react-icons/gr'
// import { IoChevronForward, IoChevronBack, IoClose } from 'react-icons/io5'
import { GoChevronLeft, GoChevronRight, GoX } from 'react-icons/go'
import { VscLibrary, VscFilter } from 'react-icons/vsc'
import { BsBookmarks, BsSliders } from 'react-icons/bs'

function NavBar({ toggleFilter, toggleReading, filterOpen, readingOpen }) {
	console.log('readingOPen: ', readingOpen)

	// const readingIcon = readingOpen ? <GoX /> : <GoChevronLeft />
	const filterIcon = filterOpen ? <GoX /> : <GoChevronRight />
	const filterClass = filterOpen ? styles.filterOpen : styles.filter
	const readingClass = readingOpen ? styles.readingOpen : styles.readingList

	return (
		<nav className={styles.navBar}>
			<menu className={styles.menu}>
				<li 
					className={readingClass}
					onClick={toggleReading}
				>
					{/* {readingIcon} */}
					<BsBookmarks /> 
					{/* List */}
				</li>
				<li
					className={filterClass}
					onClick={toggleFilter}
				>
					{/* Filter */}
					<BsSliders />
					{/* {filterIcon} */}
				</li>
			</menu>
		</nav>
	)
}

export { NavBar }