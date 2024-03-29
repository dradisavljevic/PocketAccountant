import colors from './colors';
import icons from './icons';

type StringDictionaryType = {
  [key: string]: string;
};

export const currencyList = [
  {short: 'CAD', name: 'Canadian Dollar'},
  {short: 'GBP', name: 'British Pound'},
  {short: 'RUB', name: 'Russian Ruble'},
  {short: 'JPY', name: 'Japanese Yen'},
  {short: 'CHF', name: 'Swiss Franc'},
  {short: 'EUR', name: 'Euro'},
  {short: 'CNY', name: 'Chinese Yuan'},
  {short: 'NZD', name: 'New Zealand Dollar'},
  {short: 'USD', name: 'US Dollar'},
  {short: 'AUD', name: 'Australian Dollar'},
  {short: 'ILS', name: 'Israeli New Shekel'},
  {short: 'RSD', name: 'Serbian Dinar'},
  {short: 'KRW', name: 'South Korean Won'},
  {short: 'ZAR', name: 'South African Rand'},
  {short: 'TRY', name: 'Turkish Lira'},
  {short: 'SEK', name: 'Swedish Krona'},
  {short: 'NOK', name: 'Norwegian Krone'},
  {short: 'BRL', name: 'Brazilian Real'},
  {short: 'MXN', name: 'Mexican Peso'},
];

export const themeList = [
  {color: colors.dollarBill, name: 'Dollar'},
  {color: colors.egyptianBlue, name: 'Egyptian Blue'},
  {color: colors.pastelBlue, name: 'Pastel Blue'},
  {color: colors.pastelBrown, name: 'Pastel Brown'},
  {color: colors.darkPastelPurple, name: 'Dark Pastel Purple'},
  {color: colors.pastelOrange, name: 'Pastel Orange'},
  {color: colors.chimeraGreen, name: 'Chimera Green'},
  {color: colors.lipstickRed, name: 'Lipstic Red'},
  {color: colors.barossa, name: 'Barossa'},
  {color: colors.lightCoral, name: 'Light Coral'},
  {color: colors.lightPastelPurple, name: 'Light Pastel Purple'},
  {color: colors.carrotOrange, name: 'Carrot Orange'},
  {color: colors.wedgewood, name: 'Wedgewood'},
  {color: colors.black, name: 'Black'},
];

export const categoryList = [
  {icon: icons.meal, name: 'Meals'},
  {icon: icons.clothes, name: 'Clothes & Accessories'},
  {icon: icons.tickets, name: 'Tickets & Fares'},
  {icon: icons.drinks, name: 'Drinks'},
  {icon: icons.snacks, name: 'Snacks'},
  {icon: icons.school, name: 'Education'},
  {icon: icons.healthcare, name: 'Healthcare'},
  {icon: icons.lifestyle, name: 'Lifestyle'},
  {icon: icons.technology, name: 'Technology'},
  {icon: icons.games, name: 'Entertainment'},
  {icon: icons.bills, name: 'Bills'},
  {icon: icons.gifts, name: 'Gifts'},
  {icon: icons.miscellaneous, name: 'Other'},
];

export const currencySymbols: StringDictionaryType = {
  CAD: 'C$',
  GBP: '£',
  RUB: '₽',
  JPY: 'JP¥',
  CHF: 'Fr.',
  EUR: '€',
  CNY: 'CN¥',
  NZD: 'NZ$',
  USD: '$',
  AUD: 'AU$',
  ILS: '₪',
  RSD: 'РСД',
  KRW: '₩',
  ZAR: 'R',
  TRY: '₺',
  SEK: 'kr',
  NOK: 'kr',
  BRL: 'R$',
  MXN: 'Mex$',
};

export const monthAbbrev = {
  0: 'Jan.',
  1: 'Feb.',
  2: 'Mar.',
  3: 'Apr.',
  4: 'May',
  5: 'Jun.',
  6: 'Jul.',
  7: 'Aug.',
  8: 'Sep.',
  9: 'Oct.',
  10: 'Nov.',
  11: 'Dec.',
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const roundedUpCurrencies = ['JPY', 'RSD', 'KRW', 'NOK', 'SEK'];
