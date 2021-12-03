import * as styles from '../styles/Filter.module.scss'
import { Publisher } from './Publisher'

function Filter({ query, filterOpen, getNews, setFilters, toggleFilter }) {

	const filterClass = filterOpen ? styles.filterOpen : styles.filter

	const allSources = [
		'ABC News', 'Associated Press', 'Axios', 'BBC News', 'Bloomberg', 'Breitbart News', 
		'Business Insider', 'Buzzfeed', 'CBS News', 'CNN', 'Financial Post', 'Fortune', 'Fox News', 
		'Independent', 'MSNBC', 'National Review', 'NBC News', 'New York Magazine', 'Politico',
		'Reuters', 'The Hill', 'The Wall Street Journal', 'The Washington Post', 'Time', 'USA Today', 
		'Vice News', 'Wired'
	]

	function formHandler(e) {
		e.preventDefault()
		let sources = ''
		const publishers = document.querySelectorAll('.publisher')
		publishers.forEach(publisher => {
			if (publisher.children.checkbox.checked) {
				sources += `${publisher.children.label.dataset.source},`
			}
		})
		setFilters({
			query: query,
			sources: sources.slice(0, -1),
		})
		getNews(query, sources.slice(0, -1))
		toggleFilter()
	}

	return (
		<menu className={filterClass}>
			<form id='filterForm' className={styles.form}>
				<ul className={styles.publishers}>
					{
						allSources.map((source, i) => {
							return (
								<Publisher 
									key={i}
									title={source}
								/>
							)
						})
					}
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