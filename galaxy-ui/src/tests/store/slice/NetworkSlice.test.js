import networkReducer, { setNetworkDetails, setLoading } from '../../store/slice/networkSlice';

test('should handle setNetworkDetails action', () => {
  const initialState = { networkDetails: [], loading: false };
  const newState = networkReducer(initialState, setNetworkDetails([{ ip: '192.168.1.1' }]));

  expect(newState.networkDetails.length).toBe(1);
  expect(newState.networkDetails[0].ip).toBe('192.168.1.1');
});
