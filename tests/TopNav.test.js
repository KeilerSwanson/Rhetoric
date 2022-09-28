import React from 'react'
import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import TopNav from '../components/TopNav'

render(<TopNav />)

it('Should render',  () => {
	const navBarHead = screen.getByText(/rhetoric/i)
	expect(navBarHead).toBeInTheDocument()
})

// toTop function
// toggleMenu function