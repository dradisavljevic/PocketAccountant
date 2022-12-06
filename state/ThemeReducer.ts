import colors from '../constants/colors';
import {ReducerActionType} from './Store';

export const THEME = 'theme/color';

const initialState = {
  color: colors.dollarBill,
};

export default (state = initialState, action: ReducerActionType) => {
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
