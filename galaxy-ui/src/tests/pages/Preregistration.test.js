import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Preregistration from '../../pages/Preregistration';

test('renders Preregistration page', () => {
  render(
    <Provider store={store}>
      <Preregistration />
    </Provider>
  );
  expect(screen.getByText(/Preregistration/i)).toBeInTheDocument();
});
