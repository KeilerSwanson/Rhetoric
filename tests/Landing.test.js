// import { useState } from 'react'
import Landing from '../components/Landing'
import { render, screen, cleanup } from '@testing-library/react'
import { toBeVisible } from '@testing-library/jest-dom'
import sourceList from '../lib/sourceList'

// Suite (describe) = Under this condition...
// Test (test) = I expect this result...
// Assert (expect) = And I'll know from these outputs.

// afterEach(cleanup)

let queryParams, setQueryParams, articles	

describe('if initial props', () => {
	queryParams = {
		query: '',
		sources: Object.values(sourceList),
		fromDate: new Date(),
		page: 1
	}
	setQueryParams = () => console.log('mock setState function')
	articles = null

	test('renders', () => {
		render(<Landing 
			queryParams={queryParams}
			setQueryParams={setQueryParams}
			articles={articles}
		/>)

		expect(screen.getByRole('heading')).toBeVisible()
		expect(screen.getByPlaceholderText('e.g. Taiwan')).toBeVisible()
		expect(screen.getByText(`No results for ''`)).not.toBeVisible()
	})
})


describe('if there are no results', () => {
	queryParams = {
		query: 'alskdfjiwlkdflsjd',
		sources: Object.values(sourceList),
		fromDate: new Date(),
		page: 1
	}
	setQueryParams = () => console.log('mock setState function')
	articles = null

	test(`displays 'no results' message`, () => {
		render(<Landing 
			queryParams={queryParams}
			setQueryParams={setQueryParams}
			articles={articles}
		/>)

		expect(screen.getByText(`No results for 'alskdfjiwlkdflsjd'`)).toBeVisible()
	})
})


