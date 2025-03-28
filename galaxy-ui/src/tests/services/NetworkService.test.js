import { fetchNetworkDetails } from '../../services/networkService';

jest.mock('../../services/networkService', () => ({
  fetchNetworkDetails: jest.fn(),
}));

test('fetchNetworkDetails should return mock network data', async () => {
  const mockData = [
    { dnsSuffix: 'example.com', fqdn: 'server.example.com', name: 'server', type: 'static', ip: '192.168.1.1', mac: 'AA:BB:CC:DD:EE:FF' },
  ];
  fetchNetworkDetails.mockResolvedValue(mockData);

  const result = await fetchNetworkDetails();
  expect(result).toEqual(mockData);
});
