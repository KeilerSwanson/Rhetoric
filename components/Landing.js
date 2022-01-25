import styles from '../styles/Landing.module.scss'
import { BsArrowDownRight } from 'react-icons/bs'
import { useRef, memo } from 'react'

function Landing({ queryParams, setQueryParams, articles, initRender, loading }) {
	const message = loading ? '' : `No results for '${queryParams.query}'`
	const messageClass = (initRender || articles) ? styles.message : styles.messageShow
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
						placeholder='e.g. SpaceX'
						className={styles.topic}
						// autoCapitalize='on'
						onClick={(e) => e.target.select()}
					/>
					<button 
						onClick={formHandler}
						className={styles.submit} 
					>
						<BsArrowDownRight />
					</button>
				</form>
				<h6 className={messageClass}>{message}</h6>
			</header>
		</div>
	)
}

export default memo(Landing)