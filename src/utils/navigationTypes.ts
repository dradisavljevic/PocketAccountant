export type StackParamList = {
  Calendar: undefined;
  Day: {_year: number, _month: string, _day: string | number};
  Form: {_year: number, _month: string, _day: number, _pickDate: boolean};
  Report: {_year: number, _month: string};
};