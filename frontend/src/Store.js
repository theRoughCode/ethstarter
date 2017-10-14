import { createStore } from 'redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_CANCELLED': {
      return {...state, ...action.payload, showIdeas: true, showCreate: false};
    }
    case 'CREATE_CONTRACT': {
      return {...state, ...action.payload, showIdeas: false, showCreate: true};
    }
    case 'NEW_CONTRACT': {
      return {...state, ...action.payload, showIdeas: false, showCreate: true};
    }
    default: {
      return {...state};
    }
  }
};

const store = createStore(reducer);

export default store;


