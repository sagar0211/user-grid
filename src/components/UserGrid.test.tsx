import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserGrid from './UserGrid';
import { User } from '../types';

const mockUsers: User[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    avatar: ''
  }
];

test('renders user grid with users', () => {
  render(<UserGrid users={mockUsers} />);
  
  const user1 = screen.getByText('John Doe');
  const user2 = screen.getByText('Jane Smith');

  expect(user1).toBeInTheDocument();
  expect(user2).toBeInTheDocument();
});

test('displays default image when avatar is missing', () => {
  render(<UserGrid users={mockUsers} />);
  
  const images = screen.getAllByRole('img');
  
  images.forEach((img, index) => {
    const expectedSrc = mockUsers[index].avatar || `${process.env.PUBLIC_URL}/logo192.png`;
    expect(img).toHaveAttribute('src', expectedSrc);
  });
});

test('displays email of users', () => {
  render(<UserGrid users={mockUsers} />);
  
  const email1 = screen.getByText('john.doe@example.com');
  const email2 = screen.getByText('jane.smith@example.com');

  expect(email1).toBeInTheDocument();
  expect(email2).toBeInTheDocument();
});
