import styles from '../styles/Landing.module.scss'
import { Arrow } from '../components/arrow'
import { MdKeyboardArrowDown } from 'react-icons/md'

function Landing() {

	function handler(e) {
		const query = document.querySelector('#query').value
		console.log(`Search for ${query}`)
		e.preventDefault()
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