import {ReducerActionType} from './Store';

export const CURRENCY = 'currency/short';

const initialState = {
  short: 'JPY',
};

export default (state = initialState, action: ReducerActionType) => {
  switch (action.type) {
    case CURRENCY: {
      return {
        ...state,
        short: action.payload,
      };
    }

    default: {
      return {...state};
    }
  }
};
