import { createStore } from 'redux';
import produce from 'immer';

const Mystate = 
{
  coronaInfo:[]
}

const reducer = produce(
  (state, action) => {
    switch (action.type) {
      case 'getAll':
        {
          state.coronaInfo = action.payload
          break;
        }
        case 'delete':
          {
            let x=state.coronaInfo.filter((i)=>i.Id!=action.payload)
            state.coronaInfo = x
            break;
          }
        case 'add':
          {
            state.coronaInfo.push(action.payload)
            break;
          }
        case 'update':
          {
            let x=state.coronaInfo.filter((i)=>i.Id!=action.payload.Id)
            x.push(action.payload)
            state.coronaInfo = x
            break;
          }
    }
  }, Mystate)

const store = createStore(reducer);

window.store = store;
export default store;