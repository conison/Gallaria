import preregistrationReducer, { setDevices, registerDevice, setLoading } from '../../store/slice/preregistrationSlice';

test('should handle setDevices action', () => {
  const initialState = { devices: [], loading: false };
  const newState = preregistrationReducer(initialState, setDevices([{ mac: 'AA:BB:CC:DD:EE:FF', nodeType: 'Desktop' }]));

  expect(newState.devices.length).toBe(1);
  expect(newState.devices[0].nodeType).toBe('Desktop');
});

test('should handle registerDevice action', () => {
  const initialState = { devices: [] };
  const newState = preregistrationReducer(initialState, registerDevice({ mac: 'FF:EE:DD:CC:BB:AA', nodeType: 'KIOSK' }));

  expect(newState.devices.length).toBe(1);
  expect(newState.devices[0].nodeType).toBe('KIOSK');
});

test('should handle setLoading action', () => {
  const initialState = { loading: false };
  const newState = preregistrationReducer(initialState, setLoading(true));

  expect(newState.loading).toBe(true);
});
