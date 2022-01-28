import styles from '../styles/Landing.module.scss'
import { BsArrowDownRight, BsChevronRight } from 'react-icons/bs'
import { useRef, memo } from 'react'

function Landing({ queryParams, setQueryParams, articles, initResults, loading }) {
	const messageClass = (initResults || articles || loading) ? styles.message : styles.messageShow
	const queryRef = useRef()

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
					{/* Find the stories you care about, 
					<br />
					from the sources you trust. */}
					Find the stories you care about, 
					<br />
					from the sources you trust.
				</h1>
				<form 
					name='search'
					className={styles.form}	
				>
					<input 
						ref={queryRef}
						name='search' 
						type='text' 
						placeholder='e.g. Elon Musk'
						className={styles.topic}
						onClick={(e) => e.target.select()}
						required={true}
					/>
					<button 
						onClick={formHandler}
						className={styles.submit} 
					>
						<BsChevronRight />
					</button>
				</form>
				<h6 className={messageClass}>{`No results for '${queryParams.query}'`}</h6>
			</header>
		</div>
	)
}

export default memo(Landing)