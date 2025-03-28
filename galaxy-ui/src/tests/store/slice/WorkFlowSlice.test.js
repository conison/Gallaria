import workflowReducer, { setWorkflows, updateWorkflowStatus, setLoading } from '../../store/slice/workflowSlice';

test('should handle setWorkflows action', () => {
  const initialState = { workflows: [], loading: false };
  const newState = workflowReducer(initialState, setWorkflows([{ id: 1, status: 'Running' }]));

  expect(newState.workflows.length).toBe(1);
  expect(newState.workflows[0].status).toBe('Running');
});

test('should handle updateWorkflowStatus action', () => {
  const initialState = { workflows: [{ id: 1, status: 'Running' }] };
  const newState = workflowReducer(initialState, updateWorkflowStatus({ id: 1, status: 'Completed' }));

  expect(newState.workflows[0].status).toBe('Completed');
});

test('should handle setLoading action', () => {
  const initialState = { loading: false };
  const newState = workflowReducer(initialState, setLoading(true));

  expect(newState.loading).toBe(true);
});
