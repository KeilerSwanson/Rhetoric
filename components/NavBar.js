import styles from '../styles/NavBar.module.scss'
import { ReadingList } from './ReadingList'
import { Filter } from './Filter'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

function NavBar() {
	return (
		<nav className={styles.navBar}>
			<menu className={styles.menu}>
				<li 
					className={styles.readingList}
				>
					<MdKeyboardArrowLeft /> 
					Reading List
				</li>
				<li
					className={styles.filter}
				>
					Filter 
					<MdKeyboardArrowRight />
				</li>
			</menu>
		</nav>
	)
}

export { NavBar }