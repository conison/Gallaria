import hostReducer, { setHosts, setLoading } from '../../store/slice/hostSlice';

test('should handle setHosts action', () => {
  const initialState = { hosts: [], loading: false };
  const newState = hostReducer(initialState, setHosts([{ hostname: 'host1' }]));

  expect(newState.hosts.length).toBe(1);
  expect(newState.hosts[0].hostname).toBe('host1');
});

test('should handle setLoading action', () => {
  const initialState = { loading: false };
  const newState = hostReducer(initialState, setLoading(true));

  expect(newState.loading).toBe(true);
});
