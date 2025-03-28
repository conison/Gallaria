import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { Provider } from 'react-redux';
import store from '../../store';

test('renders Home page without crashing', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByText(/Node Info/i)).toBeInTheDocument();
});
