import styles from '../styles/Landing.module.scss'
import { Arrow } from '../components/arrow'
import { MdKeyboardArrowDown } from 'react-icons/md'

function Landing({ getNews }) {

	function handler(e) {
		e.preventDefault()
		const query = document.querySelector('#query').value
		getNews(query)
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
						<MdKeyboardArrowDown />
					</button>
				</form>
			</header>
		</div>
	)
}

export { Landing }