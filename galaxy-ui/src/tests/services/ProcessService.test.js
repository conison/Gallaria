import { fetchProcesses } from '../../services/processService';

jest.mock('../../services/processService', () => ({
  fetchProcesses: jest.fn(),
}));

test('fetchProcesses should return mock process data', async () => {
  const mockData = [
    { name: 'chrome.exe', processId: 1234, memory: '200MB', peakMemory: '300MB', thread: 5, path: 'C:/Program Files/Chrome' },
  ];
  fetchProcesses.mockResolvedValue(mockData);

  const result = await fetchProcesses();
  expect(result).toEqual(mockData);
});
