import styles from '../styles/Landing.module.scss'
// import { MdKeyboardArrowDown } from 'react-icons/md'
// import { IoChevronDown } from 'react-icons/io5'
import { GoChevronDown } from 'react-icons/go'
import { BsArrowRight } from 'react-icons/bs'

function Landing({ getNews, filters, setQuery }) {

	function handler(e) {
		e.preventDefault()
		const query = document.querySelector('#query').value
		setQuery(query)
		// window.scrollTo({
		// 	top: document.querySelector('#articles'),		
		// 	left: 0,
		// 	behavior: 'smooth'
		// })
	}

	return (
		<div className={styles.landing}>
			<header className={styles.header}>
				<h1 className={styles.title}>News Sort</h1>
				{/* <p className={styles.text}>
					Find reporting on the topics 
					<br /> 
					you care about from the 
					<br /> 
					outlets you trust.
				</p> */}
				<form 
					name='search'
					className={styles.form}	
				>
					<input 
						id='query'
						name='search' 
						type='text' 
						placeholder='e.g. Bitcoin'
						className={styles.topic}
					/>
					<button 
						onClick={handler}
						className={styles.submit} 
					>
						{/* <GoChevronDown /> */}
						<BsArrowRight />
					</button>
				</form>
			</header>
		</div>
	)
}

export { Landing }