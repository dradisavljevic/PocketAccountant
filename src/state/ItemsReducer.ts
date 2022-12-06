import {ReducerActionType} from './Store';

export const ITEMS = 'items';

const initialState = {
  items: {},
};

export default (state = initialState, action: ReducerActionType) => {
  switch (action.type) {
    case ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }

    default: {
      return {...state};
    }
  }
};
