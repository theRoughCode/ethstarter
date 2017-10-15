import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LANDED': {
      return {...state, ...action.payload, showIdeas: true};
    }
    case 'CREATE_CANCELLED': {
      return {...action.payload, showIdeas: true, showCreate: false};
    }
    case 'CREATE_CONTRACT': {
      return {...state, ...action.payload, showIdeas: false, showCreate: true};
    }
    case 'CONTRACT_CREATE_PENDING': {
      return {...action.payload, showLoading: true, showDetails: false};
    }
    case 'CONTRACT_CREATE_SUCCEEDED': {
      return {...action.payload, showLoading: false, showDetails: true};
    }
    case 'CONTRACT_CREATE_FAILED': {
      return {...action.payload, showLoading: false, showDetails: false, showIdeas: true};
    }
    case 'NEW_CONTRACT': {
      return {...state, ...action.payload, showIdeas: false, showCreate: true};
    }
    case 'CLICK_IDEA': {
      return {...state, ...action.payload, showDetails: true, showIdeas: false, showCreate: false};
    }
    case 'GOT_IDEAS': {
      return {...state, ...action.payload, showIdeas: true, showCreate: false, showDetails: false};
    }
    case 'GOT_USER_ADDRESS': {
      return {...state, ...action.payload};
    }
    case 'INVEST': {
      return {...state, ...action.payload};
    }
    default: {
      return {...state};
    }
  }
};


const middleWare = applyMiddleware(logger);
const store = createStore(reducer, middleWare);

export default store;
