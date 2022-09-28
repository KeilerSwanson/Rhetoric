import Landing from '../components/Landing'
import { render, screen } from '@testing-library/react'

// suite / component: thing that has multiple features to test
	// tests / features: the thing should do x
		// assertions: expect y result from x

// Should render with no props
// Should update the query on search
// Should display 'no results' message if no results

describe('Landing Component', () => {
	test('True should be true', () => {
		expect(true).toBe(true)
	})
})