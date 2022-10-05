// import { useState } from 'react'
import Landing from '../components/Landing'
import { render, screen, cleanup } from '@testing-library/react'
import { toBeVisible } from '@testing-library/jest-dom'
import { sourceList } from '../lib/sourceList'

let articles, results, queryParams, setQueryParams	

// afterEach(cleanup)

test('renders with initial props', () => {
	// Arrange
	articles = null
	results = true
	queryParams = {
		query: '',
		sources: Object.values(sourceList),
		fromDate: new Date(),
		page: 1
	}
	setQueryParams = () => console.log('mock state function')

	// Act
	render(<Landing 
		articles
		results
		queryParams
		setQueryParams
	/>)

	// Assert
	expect(screen.getByRole('heading')).toBeVisible()
	expect(screen.getByPlaceholderText('e.g. Taiwan')).toBeVisible()
})

describe('if there are no results', () => {
	test(`display 'no results' message`, () => {
		render(<Landing 

		/>)

		expect(screen.getByText('No results for ')).toBeVisible()
	})

	test(`doesn't display articles`, () => {
		
	}) 
})

// describe('if there are results', () => {

// 	test('display articles', () => {

// 	})

// 	test(`don't display 'no results' message`, () => {

// 	})

// 	test(`update search bar value`, () => {

// 	})

// })



