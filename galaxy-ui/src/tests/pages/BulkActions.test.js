import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import BulkActions from '../../pages/BulkActions';

test('renders BulkActions page', () => {
  render(
    <Provider store={store}>
      <BulkActions />
    </Provider>
  );
  expect(screen.getByText(/Bulk Actions/i)).toBeInTheDocument();
});
