import colors from '../constants/colors';
export const THEME = 'theme/color';

const initialState = {
  color: colors.dollarBill,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME: {
      return {
        ...state,
        color: action.payload,
      };
    }

    default: {
      return {...state};
    }
  }
};
