import {roundedUpCurrencies} from '../constants/data';

export const getSpendingByCurrency = data => {
  let sums = {};
  let sum = 0;
  for (var itemIndex in data) {
    if (data[itemIndex].currency in sums) {
      sum =
        data[itemIndex].quantity *
        (data[itemIndex].price +
          ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);

      if (roundedUpCurrencies.includes(data[itemIndex].currency)) {
        if (data[itemIndex].currency === 'JPY') {
          sum = Math.floor(sum);
        } else {
          sum = Math.round(sum);
        }
      }

      sums[data[itemIndex].currency] += sum;
    } else {
      sums[data[itemIndex].currency] = 0;
      sum =
        data[itemIndex].quantity *
        (data[itemIndex].price +
          ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);

      if (roundedUpCurrencies.includes(data[itemIndex].currency)) {
        if (data[itemIndex].currency === 'JPY') {
          sum = Math.floor(sum);
        } else {
          sum = Math.round(sum);
        }
      }
      sums[data[itemIndex].currency] += sum;
    }
  }

  return sums;
};

export const getInformationByCategory = data => {
  let categorizedSums = {};
  let price = 0;

  for (var itemIndex in data) {
    if (data[itemIndex].currency in categorizedSums) {
      if (
        data[itemIndex].category in categorizedSums[data[itemIndex].currency]
      ) {
        price =
          data[itemIndex].quantity *
          (data[itemIndex].price +
            ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);

        if (roundedUpCurrencies.includes(data[itemIndex].currency)) {
          if (data[itemIndex].currency === 'JPY') {
            price = Math.floor(price);
          } else {
            price = Math.round(price);
          }
        }
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ].price += price;
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ].quantity += data[itemIndex].quantity;
      } else {
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ] = {};
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ].price = 0;
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ].quantity = 0;

        price =
          data[itemIndex].quantity *
          (data[itemIndex].price +
            ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);

        if (roundedUpCurrencies.includes(data[itemIndex].currency)) {
          if (data[itemIndex].currency === 'JPY') {
            price = Math.floor(price);
          } else {
            price = Math.round(price);
          }
        }
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ].price += price;
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ].quantity += data[itemIndex].quantity;
      }
    } else {
      categorizedSums[data[itemIndex].currency] = {};
      categorizedSums[data[itemIndex].currency][data[itemIndex].category] = {};
      categorizedSums[data[itemIndex].currency][
        data[itemIndex].category
      ].price = 0;
      categorizedSums[data[itemIndex].currency][
        data[itemIndex].category
      ].quantity = 0;
      price =
        data[itemIndex].quantity *
        (data[itemIndex].price +
          ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);

      if (roundedUpCurrencies.includes(data[itemIndex].currency)) {
        if (data[itemIndex].currency === 'JPY') {
          price = Math.floor(price);
        } else {
          price = Math.round(price);
        }
      }
      categorizedSums[data[itemIndex].currency][
        data[itemIndex].category
      ].price += price;
      categorizedSums[data[itemIndex].currency][
        data[itemIndex].category
      ].quantity += data[itemIndex].quantity;
    }
  }
  return categorizedSums;
};

export const getMostExpensiveItem = data => {
  let items = {};

  for (var itemIndex in data) {
    if (data[itemIndex].currency in items) {
      price =
        data[itemIndex].price +
        ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax;
      if (roundedUpCurrencies.includes(data[itemIndex].currency)) {
        if (data[itemIndex].currency === 'JPY') {
          price = Math.floor(price);
        } else {
          price = Math.round(price);
        }
      }
      if (price > items[data[itemIndex].currency].price) {
        items[data[itemIndex].currency].price = price;
        items[data[itemIndex].currency].name = data[itemIndex].name;
      }
    } else {
      items[data[itemIndex].currency] = {};
      items[data[itemIndex].currency].price = 0;
      items[data[itemIndex].currency].name = '';
      price =
        data[itemIndex].price +
        ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax;
      if (roundedUpCurrencies.includes(data[itemIndex].currency)) {
        if (data[itemIndex].currency === 'JPY') {
          price = Math.floor(price);
        } else {
          price = Math.round(price);
        }
      }
      if (price > items[data[itemIndex].currency].price) {
        items[data[itemIndex].currency].price = price;
        items[data[itemIndex].currency].name = data[itemIndex].name;
      }
    }
  }

  return items;
};
