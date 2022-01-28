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
	return (typeof dateStr === 'string') ? new Date(dateStr).toDateString().substring(4) : 'Date Unknown'
}

function formatExcerpt(excerpt) {
	return (typeof excerpt === 'string') ? `${excerpt.substring(0, 250)}...` : '...'
}

// Lighter weight equality check for memoized components?

export { disableBodyScroll, enableBodyScroll, formatSource, formatDate, formatExcerpt }