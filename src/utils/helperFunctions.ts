export const getSpendingByCurrency = data => {
  let sums = {};

  for (var itemIndex in data) {
    if (data[itemIndex].currency in sums) {
      sums[data[itemIndex].currency] +=
        data[itemIndex].quantity *
        (data[itemIndex].price +
          ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);
    } else {
      sums[data[itemIndex].currency] = 0;
      sums[data[itemIndex].currency] +=
        data[itemIndex].quantity *
        (data[itemIndex].price +
          ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);
    }
  }

  return sums;
};

export const getInformationByCategory = data => {
  let categorizedSums = {};

  for (var itemIndex in data) {
    if (data[itemIndex].currency in categorizedSums) {
      if (
        data[itemIndex].category in categorizedSums[data[itemIndex].currency]
      ) {
        categorizedSums[data[itemIndex].currency][
          data[itemIndex].category
        ].price +=
          data[itemIndex].quantity *
          (data[itemIndex].price +
            ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);
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
      categorizedSums[data[itemIndex].currency][
        data[itemIndex].category
      ].price +=
        data[itemIndex].quantity *
        (data[itemIndex].price +
          ((data[itemIndex].price * 1.0) / 100) * data[itemIndex].tax);
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
      if (price > items[data[itemIndex].currency].price) {
        items[data[itemIndex].currency].price = price;
        items[data[itemIndex].currency].name = data[itemIndex].name;
      }
    }
  }

  return items;
};
