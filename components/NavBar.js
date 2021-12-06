import styles from '../styles/NavBar.module.scss'
// import { GrFormClose } from 'react-icons/gr'
// import { IoChevronForward, IoChevronBack, IoClose } from 'react-icons/io5'
import { GoChevronLeft, GoChevronRight, GoX } from 'react-icons/go'

function NavBar({ toggleFilter, filterOpen, readingOpen }) {

	const readingIcon = readingOpen ? <GoX /> : <GoChevronLeft />
	const filterIcon = filterOpen ? <GoX /> : <GoChevronRight />
	const filterClass = filterOpen ? styles.open : styles.filter

	return (
		<nav className={styles.navBar}>
			<menu className={styles.menu}>
				<li 
					className={styles.readingList}
				>
					{/* {readingIcon} */}
					{/* <MdArrowBackIos />  */}
					Reading List
				</li>
				<li
					className={filterClass}
					onClick={toggleFilter}
				>
					Filter
					{/* <MdArrowForwardIos /> */}
					{/* {filterIcon} */}
				</li>
			</menu>
		</nav>
	)
}

export { NavBar }