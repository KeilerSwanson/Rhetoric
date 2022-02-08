import { sourceList } from './sourceList'
import { parseISO, format } from 'date-fns'

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
		return format(parseISO(dateStr), 'MM-dd-yyyy')
	}
	return 'Date Unavailable'
}

function formatExcerpt(excerpt) {
	return (typeof excerpt === 'string') ? `${excerpt.substring(0, 300)}...` : '...'
}


export { disableBodyScroll, enableBodyScroll, formatSource, formatDate, formatExcerpt }
