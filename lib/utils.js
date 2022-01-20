// I'm only directly manipulating the DOM because there's no straightforward way to
// add a ref to the body tag in NextJS and I'm not updating any state
function disableBodyScroll() {
	document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
}

function enableBodyScroll() {
	document.getElementsByTagName('body')[0].style.overflowY = 'visible'
}

function formatTitle(title) {
	return title.toLowerCase().split(' ').join('-')
}

function formatDate(date) {
	const newDate = new Date(date).toDateString().split('')
	newDate.splice(0, 4)
	newDate.splice(-5, 0, ',')
	return newDate.join('')
}

// function toggleMenuItem(menu, menuItem, list) {
// 	if (parseInt(window.getComputedStyle(list).height) === 0) {
// 		const menuHeight = parseInt(window.getComputedStyle(menu).height)
// 		const menuItemHeight = parseInt(window.getComputedStyle(menuItem).height)
// 		const listHeight = menuHeight - (menuItemHeight * 3)
// 		list.style.height = `${listHeight}px`
// 	} else {
// 		list.style.height = '0px'
// 	}
// }

// Lighter weight equality check for memoized components?

export { disableBodyScroll, enableBodyScroll, formatTitle, formatDate }