import serviceReducer, { setServices, toggleServiceStatus, setLoading } from '../../store/slice/serviceSlice';

test('should handle setServices action', () => {
  const initialState = { services: [], loading: false };
  const newState = serviceReducer(initialState, setServices([{ name: 'Apache', status: 'Running' }]));

  expect(newState.services.length).toBe(1);
  expect(newState.services[0].name).toBe('Apache');
});

test('should toggle service status', () => {
  const initialState = { services: [{ name: 'Apache', status: 'Running' }] };
  const newState = serviceReducer(initialState, toggleServiceStatus('Apache'));

  expect(newState.services[0].status).toBe('Stopped');
});
