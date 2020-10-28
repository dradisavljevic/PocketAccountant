export const ITEMS = 'items';

const initialState = {
  items: {},
};

export default (state = initialState, action) => {
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
