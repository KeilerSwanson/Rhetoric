import { useRef, memo } from 'react'

import styles from '../styles/Landing.module.scss'
import { BsSearch } from 'react-icons/bs'


function Landing({ queryParams, setQueryParams, articles }) {
	const queryRef = useRef()
	const landingRef = useRef()
	const messageClass = (articles) ? styles.message : styles.messageShow


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
		<section ref={landingRef} className={styles.landing}>
			<header className={styles.header}>
				<h1 className={styles.heading}>
					Compare news coverage
					<br />
					across the media landscape.
				</h1>
				<form name='search' className={styles.form}>
					<input 
						ref={queryRef}
						name='search' 
						type='text' 
						placeholder='e.g. Taiwan'
						className={styles.query}
						onClick={(e) => e.target.select()}
						required={true}
					/>
					<button onClick={handleForm} className={styles.btn}>
						<BsSearch />
					</button>
				</form>
				<p className={messageClass}>{`No results for '${queryParams.query}'`}</p>
			</header>
		</section>
	)
}


export default memo(Landing)