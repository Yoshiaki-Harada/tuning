import * as fromAuth from './auth.reducer';
import { getAuth } from './auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const result = getAuth({
      [fromAuth.authFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
