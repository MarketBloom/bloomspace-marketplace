import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';

describe('Hero component', () => {
  it('renders without crashing', () => {
    render(<Hero />);
    expect(screen).toBeDefined();
  });
});