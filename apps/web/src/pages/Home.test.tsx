import { render, screen } from '@testing-library/react';
import { AppRoot } from '../AppRoot';
import { Home } from './Home';

test('loading data', () => {
  render(
    <AppRoot>
      <Home />
    </AppRoot>
  );

  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
