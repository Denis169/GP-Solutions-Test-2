import createSagaMiddleware from 'redux-saga';
import invariant from 'redux-immutable-state-invariant';

import { createLogger } from 'redux-logger';

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleware.push(invariant());
  middleware.push(createLogger({ collapsed: true }));
}

export default middleware;
