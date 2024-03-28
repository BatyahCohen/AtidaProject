import { createStore } from 'redux';
import produce from 'immer';

const Mystate = {
  coronaInfo: []
}

const reducer = produce(
  (state, action) => {
    switch (action.type) {
      case 'getAll':
        {
          state.coronaInfo = action.payload
          break;
        }

    }
  }, Mystate)

const store = createStore(reducer);

window.store = store;
export default store;