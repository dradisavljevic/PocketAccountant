import {combineReducers} from 'redux';
import theme from './ThemeReducer';
import currency from './CurrencyReducer';

const rootReducer = combineReducers({
  theme,
  currency,
});

export default rootReducer;
