import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import WorkflowHistory from '../../pages/WorkflowHistory';

test('renders WorkflowHistory page', () => {
  render(
    <Provider store={store}>
      <WorkflowHistory />
    </Provider>
  );
  expect(screen.getByText(/Workflow History/i)).toBeInTheDocument();
});
