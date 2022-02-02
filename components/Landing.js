import { useRef, memo } from 'react'
import { BsSearch } from 'react-icons/bs'
import styles from '../styles/Landing.module.scss'

function Landing({ queryParams, setQueryParams, articles, initResults, loading }) {
	const queryRef = useRef()
	const messageClass = (initResults || articles || loading) ? styles.message : styles.messageShow

	function formHandler(e) {
		e.preventDefault()
		if (queryRef.current.value === queryParams.query) return
		setQueryParams({
      query: queryRef.current.value,
      sources: queryParams.sources,
      page: 1
    })
	}

	return (
		<div className={styles.landing}>
			<header className={styles.header}>
				<h1 className={styles.title}>
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
						className={styles.topic}
						onClick={(e) => e.target.select()}
						required={true}
					/>
					<button 
						onClick={formHandler}
						className={styles.submit} 
					>
						<BsSearch />
						T
					</button>
				</form>
				<h6 className={messageClass}>{`No results for '${queryParams.query}'`}</h6>
			</header>
		</div>
	)
}

export default memo(Landing)