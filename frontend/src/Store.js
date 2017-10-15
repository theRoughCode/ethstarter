import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LANDED': {
      return {...state, ...action.payload, showIdeas: true};
    }
    case 'CREATE_CANCELLED': {
      return {...state, ...action.payload, showIdeas: true, showCreate: false};
    }
    case 'CREATE_CONTRACT': {
      return {...state, ...action.payload, showIdeas: false, showCreate: true};
    }
    case 'NEW_CONTRACT': {
      return {...state, ...action.payload, showIdeas: false, showCreate: true};
    }
    case 'CLICK_IDEA': {
      return {...state, ...action.payload, showDetails: true, showIdeas: false, showCreate: false};
    }
    default: {
      return {...state};
    }
  }
};


const middleWare = applyMiddleware(logger);
const store = createStore(reducer, middleWare);

export default store;
