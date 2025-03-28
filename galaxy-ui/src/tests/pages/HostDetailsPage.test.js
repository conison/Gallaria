import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import HostDetailsPage from '../../pages/HostDetailsPage';
import { MemoryRouter } from 'react-router-dom';

test('renders HostDetailsPage without crashing', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HostDetailsPage />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/Host Details/i)).toBeInTheDocument();
});
