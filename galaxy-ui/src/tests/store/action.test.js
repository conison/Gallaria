import * as actions from '../../store/action';

test('action creators should return correct actions', () => {
  const testAction = actions.someActionCreator({ data: 'test' });
  expect(testAction).toEqual({ type: 'SOME_ACTION', payload: { data: 'test' } });
});
