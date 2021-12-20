import * as styles from '../styles/Filter.module.scss'
import { Source } from './Source'
import { useRef } from 'react'

function Filter({ filterOpen, queryParams, setQueryParams, toggleFilter }) {
	const filterClass = filterOpen ? styles.filterOpen : styles.filter
	const sourceTitles = [
		'ABC News', 'Associated Press', 'Axios', 'BBC News', 'Bloomberg', 'Breitbart News', 
		'Business Insider', 'Buzzfeed', 'CBS News', 'CNN', 'Financial Post', 'Fortune', 'Fox News', 
		'Independent', 'MSNBC', 'National Review', 'NBC News', 'New York Magazine', 'Politico',
		'Reuters', 'The Hill', 'The Wall Street Journal', 'The Washington Post', 'Time', 'USA Today', 
		'Vice News', 'Wired'
	]
	const sources = sourceTitles.map((source, i) => {
		return (
			<Source 
				key={i}
				title={source}
			/>
		)
	})
	const sourcesRef = useRef()

	function formHandler(e) {
		e.preventDefault()
		let sources = ''
		for (let source of sourcesRef.current.children) {
			if (source.children.checkbox.checked) {
				sources += `${source.children.label.dataset.source},`
			}
		}	
		setQueryParams({
      query: queryParams.query,
      sources: sources.slice(0, -1),
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
				<ul 
					ref={sourcesRef}
					className={styles.sources}
				>
					{sources}
				</ul>
				<button 
					className={styles.submit}
					onClick={formHandler}
				>
					Done
				</button>
			</form>
		</menu>
	)
}

export { Filter }