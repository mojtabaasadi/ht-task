import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostCard from "../src/components/PostCard"
import Feed from '../src/components/Feed'


test('should show data', async () => {
  render(<PostCard id={34} author='some' liked={false} content='text' image='' />)
  expect(screen.queryByText("text")).toBeInTheDocument()
  expect(screen.queryByText("some")).toBeInTheDocument()
  expect(screen.getByAltText("Post").getAttribute('src')).toBe("https://placehold.co/600x600?text=No+Image")
})

test('should like', async () => {
    render(<Feed />)
    fireEvent.click(screen.getByTestId('test-like-1'))
    
    expect(screen.getByTestId('test-like-1').innerHTML).toBe('Unlike')
})
  
test('should unlike', async () => {
    render(<Feed />)
    fireEvent.click(screen.getByTestId('test-like-3'))
    
    expect(screen.getByTestId('test-like-3').innerHTML).toBe('Like')
})


test('should save and unsave', async () => {
    render(<Feed />)
    fireEvent.click(screen.getByTestId('test-save-3'))
    
    expect(screen.getByTestId('test-save-3').innerHTML).toBe('Unsave')
    fireEvent.click(screen.getByTestId('test-save-3'))
    
    expect(screen.getByTestId('test-save-3').innerHTML).toBe('Save')
})

