import * as styles from '../styles/Filter.module.scss'
import { Source } from './Source'
import { useRef } from 'react'

function Filter({ filterOpen, queryParams, setQueryParams, toggleFilter }) {
	const filterClass = filterOpen ? styles.filterOpen : styles.filter
	const formattedSources = [
		'ABC News', 'Associated Press', 'Axios', 'BBC News', 'Bloomberg', 'Breitbart News', 
		'Business Insider', 'Buzzfeed', 'CBS News', 'CNN', 'Financial Post', 'Fortune', 'Fox News', 
		'Independent', 'MSNBC', 'National Review', 'NBC News', 'New York Magazine', 'Politico',
		'Reuters', 'The Hill', 'The Wall Street Journal', 'The Washington Post', 'Time', 'USA Today', 
		'Vice News', 'Wired'
	]
	const sources = formattedSources.map((source, i) => {
		const checked = queryParams.sources.includes(source.toLowerCase().split(' ').join('-')) ? true : false
		return (
			<Source 
				key={i}
				title={source}
				formattedTitle={formatTitle(source)}
				checked={checked}
			/>
		)
	})
	const sourcesRef = useRef()

	function formatTitle(title) {
		return title.toLowerCase().split(' ').join('-')
	}

	function formHandler(e) {
		e.preventDefault()
		const activeSources = Array.from(sourcesRef.current.children).map(source => {
			// EXTRA COMMA CONCATENATED WHEN USING NULL. IS THIS SAFE?
			return source.children.checkbox.checked ? source.dataset.source : null
		})
		console.log('activeSources: ', activeSources)
		window.localStorage.setItem('sources', JSON.stringify(activeSources))
		setQueryParams({
      query: queryParams.query,
			sources: activeSources,
      page: 1
    })
		toggleFilter()
	}

	return (
		<menu 
			id='filter'
			className={filterClass}
		>
			<form className={styles.form}>
				<h2 className={styles.sourcesLabel}>Sources</h2>
				<menu 
					ref={sourcesRef}
					className={styles.sources}
				>
					{sources}
				</menu>
				{/* <span className={styles.submitWrap}> */}
					<button 
						className={styles.submit}
						onClick={formHandler}
					>
						Done
					</button>
				{/* </span> */}
			</form>
		</menu>
	)
}

export { Filter }