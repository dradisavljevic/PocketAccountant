import {combineReducers} from 'redux';
import theme from './ThemeReducer';
import currency from './CurrencyReducer';
import items from './ItemsReducer';

const rootReducer = combineReducers({
  theme,
  currency,
  items,
});

export default rootReducer;
