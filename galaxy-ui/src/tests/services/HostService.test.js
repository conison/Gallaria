import { fetchHosts } from '../../services/hostService';

jest.mock('../../services/hostService', () => ({
  fetchHosts: jest.fn(),
}));

test('fetchHosts should return mock host data', async () => {
  const mockData = [
    { hostname: 'host1', mac: '00:1A:2B:3C:4D:5E', location: 'NY', regDate: '2025-03-25', registeredBy: 'admin' },
  ];
  fetchHosts.mockResolvedValue(mockData);

  const result = await fetchHosts();
  expect(result).toEqual(mockData);
});
