import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  it('renders product title and price', () => {
    render(<ProductCard id="1" title="Test Product" price={19.99} image="https://via.placeholder.com/200x300" />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });
});
