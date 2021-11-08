import styles from '../styles/Landing.module.scss'

function Landing() {

	function handler(e) {
		e.preventDefault()
	}

	return (
		<div className={styles.landing}>
			<header className={styles.header}>
				<h1 className={styles.title}>News Screen</h1>
				<p className={styles.text}>Find reporting on the topics you care about from the outlets you trust.</p>
				<form 
					name='search'
					className={styles.form}	
				>
					<input 
						name='topic' 
						type='text' 
						placeholder='Topic'
						className={styles.topic}	
					/>
					<button 
						onClick={handler}
						className={styles.submit} 
					/>
				</form>
			</header>
		</div>
	)
}

export { Landing }