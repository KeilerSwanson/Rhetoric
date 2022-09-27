import Landing from '../components/Landing'
import { render } from '@testing-library/react'

describe('true is truthy and false is falsy', () => {

	test('true should be true', () => {
		expect(true).toBe(true)
	})

	test('false should be false', () => {
		expect(false).toBe(false)
	})
})

