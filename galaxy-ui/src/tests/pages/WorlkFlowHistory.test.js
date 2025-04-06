import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Workflow from '../../pages/Workflow';

test('renders Workflow page', () => {
  render(
    <Provider store={store}>
      <Workflow />
    </Provider>
  );
  expect(screen.getByText(/Workflow/i)).toBeInTheDocument();
});
