import styles from '../styles/Landing.module.scss'
// import { MdKeyboardArrowDown } from 'react-icons/md'
// import { IoChevronDown } from 'react-icons/io5'
import { GoChevronDown } from 'react-icons/go'

function Landing({ getNews, filters, setQuery }) {

	function handler(e) {
		e.preventDefault()
		const query = document.querySelector('#query').value
		setQuery(query)
		getNews(query, filters.sources)
	}

	return (
		<div className={styles.landing}>
			<header className={styles.header}>
				<h1 className={styles.title}>News Screen</h1>
				<p className={styles.text}>Find reporting on the topics <br /> you care about from the <br /> outlets you trust.</p>
				<form 
					name='search'
					className={styles.form}	
				>
					<input 
						id='query'
						name='search' 
						type='text' 
						placeholder='Search'
						className={styles.topic}	
					/>
					<button 
						onClick={handler}
						className={styles.submit} 
					>
						<GoChevronDown />
					</button>
				</form>
			</header>
		</div>
	)
}

export { Landing }