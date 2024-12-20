import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  test('renders the correct number of page buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    
    const pageButtons = screen.getAllByRole('listitem');
    expect(pageButtons).toHaveLength(5);
  });

  test('displays the current page with active styling', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    
    const activePageButton = screen.getByText('2');
    expect(activePageButton).toHaveClass('bg-blue-500 text-white');
  });

  test('calls onPageChange with correct page number when a page is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    
    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test('renders correct classes for non-current page buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    
    const nonCurrentPageButton = screen.getByText('4');
    expect(nonCurrentPageButton).toHaveClass('cursor-pointer hover:bg-gray-200');
  });
});
