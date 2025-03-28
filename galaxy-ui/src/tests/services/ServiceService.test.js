import { fetchServices } from '../../services/serviceService';

jest.mock('../../services/serviceService', () => ({
  fetchServices: jest.fn(),
}));

test('fetchServices should return mock service data', async () => {
  const mockData = [
    { name: 'Apache', status: 'Running', startupType: 'Automatic', processId: 5678, logonAs: 'LocalSystem', path: '/usr/bin/apache' },
  ];
  fetchServices.mockResolvedValue(mockData);

  const result = await fetchServices();
  expect(result).toEqual(mockData);
});
