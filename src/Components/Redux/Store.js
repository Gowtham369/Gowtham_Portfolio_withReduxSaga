import { createStore, compose, applyMiddleware } from "redux";
import Reducer from "./Reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Reduxsaga";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(rootSaga);
export default store;
