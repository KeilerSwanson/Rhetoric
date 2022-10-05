import { useRef, memo, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import styles from '../styles/Landing.module.scss'

function Landing({ queryParams, setQueryParams, articles, initResults }) {
	const queryRef = useRef()
	const landingRef = useRef()
	const messageClass = (initResults || articles) ? styles.message : styles.messageShow

	// useEffect(() => {
	// 	landingRef.current.style.cssText = `height: calc(var(--vh) * 100);`
	// })

	function handleForm(e) {
		e.preventDefault()
		if (queryRef.current.value === queryParams.query) return
		setQueryParams({
      query: queryRef.current.value,
      sources: queryParams.sources,
			fromDate: queryParams.fromDate,
      page: 1
    })
	}

	return (
		<section 
			ref={landingRef}
			className={styles.landing}
		>
			<header className={styles.header}>
				<h1 className={styles.heading}>
					Compare news coverage
					<br />
					across the media landscape.
				</h1>
				<form 
					name='search'
					className={styles.form}	
				>
					<input 
						ref={queryRef}
						name='search' 
						type='text' 
						placeholder='e.g. Taiwan'
						className={styles.query}
						onClick={(e) => e.target.select()}
						required={true}
					/>
					<button 
						onClick={handleForm}
						className={styles.btn} 
					>
						<BsSearch />
						T
					</button>
				</form>
				<p className={messageClass}>{`No results for '${queryParams.query}'`}</p>
			</header>
		</section>
	)
}

export default memo(Landing)