import store from '../../store';

test('store should initialize correctly', () => {
  const state = store.getState();
  expect(state).toBeDefined();
});
