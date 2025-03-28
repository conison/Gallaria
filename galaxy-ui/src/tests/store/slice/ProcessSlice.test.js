import processReducer, { setProcesses, removeProcess, setLoading } from '../../store/slice/processSlice';

test('should handle setProcesses action', () => {
  const initialState = { processes: [], loading: false };
  const newState = processReducer(initialState, setProcesses([{ name: 'chrome.exe', processId: 1234 }]));

  expect(newState.processes.length).toBe(1);
  expect(newState.processes[0].name).toBe('chrome.exe');
});

test('should handle removeProcess action', () => {
  const initialState = { processes: [{ name: 'chrome.exe', processId: 1234 }] };
  const newState = processReducer(initialState, removeProcess(1234));

  expect(newState.processes.length).toBe(0);
});
