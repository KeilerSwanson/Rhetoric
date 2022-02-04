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
	return 'Source Unavailable'
}

function formatDate(dateStr) {
	if (typeof dateStr === 'string') {
		const newDateStr = new Date(dateStr).toDateString().substring(4)
		const datePieces = newDateStr.split(' ')
		datePieces[1] += ','
		return datePieces.join(' ')
	}
	return 'Date Unavailable'
}

function formatExcerpt(excerpt) {
	return (typeof excerpt === 'string') ? `${excerpt.substring(0, 300)}...` : '...'
}

export { disableBodyScroll, enableBodyScroll, formatSource, formatDate, formatExcerpt }