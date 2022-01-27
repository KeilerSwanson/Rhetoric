import { sourceList } from './sourceList'

// I'm only directly manipulating the DOM because there's no straightforward way to
// add a ref to the body tag in NextJS and I'm not updating any state
function disableBodyScroll() {
	document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
}

function enableBodyScroll() {
	document.getElementsByTagName('body')[0].style.overflowY = 'visible'
}

function formatSource(url) {
	for (let title in sourceList) {
		if (sourceList[title] === url) {
			return title
		}
	}
}

function formatDate(dateStr) {
	if (typeof dateStr === 'string') {
		const date = new Date(dateStr).toDateString()
		const dateItems = date.substring(4).split(' ')
		dateItems[1] += ','
		return dateItems.join(' ')
	} 
	return 'Date Unknown'
}

function formatExcerpt(excerpt) {
	return (typeof excerpt === 'string') ? `${excerpt.substring(0, 300)}...` : '...'
}

// Lighter weight equality check for memoized components?

export { disableBodyScroll, enableBodyScroll, formatSource, formatDate, formatExcerpt }