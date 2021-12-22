import styles from '../styles/Landing.module.scss'
// import { GoChevronDown } from 'react-icons/go'
import { BsArrowRight } from 'react-icons/bs'
import { useRef } from 'react'

function Landing({ queryParams, setQueryParams, resultsRef, loading }) {
	const formClass = loading ? styles.formLoading : styles.form
	const queryRef = useRef()
	function formHandler(e) {
		e.preventDefault()
		setQueryParams({
      query: queryRef.current.value,
      sources: queryParams.sources,
      page: 1
    })
		// resultsRef is null until first fetch response 
		window.scrollTo({
			top: resultsRef.current.getBoundingClientRect().top + window.pageYOffset - 70,
			left: 0,
			behavior: 'smooth'
		})
	}

	return (
		<div className={styles.landing}>
			<header className={styles.header}>
				<h1 className={styles.title}>Rhetoric</h1>
				<p className={styles.text}>
					Find reporting on the topics 
					<br /> 
					you care about from the 
					<br /> 
					outlets you trust.
				</p>
				<form 
					name='search'
					className={formClass}	
				>
					<input 
						ref={queryRef}
						name='search' 
						type='text' 
						placeholder='e.g. Bitcoin'
						className={styles.topic}
					/>
					<button 
						onClick={formHandler}
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