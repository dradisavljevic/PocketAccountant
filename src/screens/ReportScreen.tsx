import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Header from '../components/Header';
import colors from '../constants/colors';
import {
  currencySymbols,
  months,
  currencyList,
  categoryList,
} from '../constants/data';
import {
  getSpendingByCurrency,
  getInformationByCategory,
  getMostExpensiveItem,
} from '../utils/helperFunctions';

const ReportScreen = ({navigation}) => {
  const _year = navigation.getParam('_year');
  const _month = navigation.getParam('_month');
  const {theme, currency, items} = useSelector(state => ({
    theme: state.theme.color,
    currency: state.currency.short,
    items: state.items,
  }));
  const [data, setData] = useState([]);

  const themeColorStyle = {
    backgroundColor: theme,
  };

  useEffect(() => {
    var month = months.indexOf(_month) + 1;
    days = Array(31)
      .fill()
      .map((_, i) => i + 1);
    dataset = [];
    monthstring = month.toString();
    if (month < 10) {
      monthstring = '0' + month.toString();
    }

    Object.keys(days).forEach(function(key) {
      day = days[key];
      daystring = day.toString();
      if (day < 10) {
        daystring = '0' + day.toString();
      }
      date = daystring + '-' + monthstring + '-' + _year.toString();
      if (items.items && items.items[date]) {
        dataset = dataset.concat(items.items[date]);
      }
    });
    setData(dataset);
  }, [items]);

  const getFullOverview = (sums, categorizedSums, mostExpensiveItems) => {
    var rows = [];
    for (var key in sums) {
      rows.push(
        getCurrencyReport(
          key,
          sums[key],
          categorizedSums[key],
          mostExpensiveItems[key],
        ),
      );
    }
    return <View>{rows}</View>;
  };

  const getCategoryInformation = categorizedSums => {
    mostCommonCategory = {};
    mostExpensiveCategory = {};
    mostCommonCategory.name = '';
    mostCommonCategory.quantity = 0;
    mostExpensiveCategory.name = '';
    mostExpensiveCategory.price = 0;
    for (var key in categorizedSums) {
      quantity = categorizedSums[key].quantity;
      price = categorizedSums[key].price;
      if (quantity > mostCommonCategory.quantity) {
        mostCommonCategory.name = key;
        mostCommonCategory.quantity = quantity;
      }
      if (price > mostExpensiveCategory.price) {
        mostExpensiveCategory.name = key;
        mostExpensiveCategory.price = price;
      }
    }
    for (index in categoryList) {
      if (categoryList[index].icon == mostCommonCategory.name) {
        mostCommonCategory.name = categoryList[index].name;
      }
      if (categoryList[index].icon == mostExpensiveCategory.name) {
        mostExpensiveCategory.name = categoryList[index].name;
      }
    }
    return [mostCommonCategory, mostExpensiveCategory];
  };

  const getCurrencyReport = (
    currency,
    spending,
    categorizedSums,
    mostExpensiveItem,
  ) => {
    var currencyName = currencyList.filter(function(ob) {
      return ob.short === currency;
    });
    name = currencyName[0].name;
    values = getCategoryInformation(categorizedSums);
    mostCommonCat = values[0];
    mostExpensiveCat = values[1];
    itemPlurality = mostCommonCat.quantity > 1 ? 'Times' : 'Time';

    return (
      <View key={currency}>
        <View style={styles.headerContainerStyle}>
          <Text
            style={styles.headerTextStyle}
            adjustsFontSizeToFit
            numberOfLines={2}>
            Purchase Report for {name}:
          </Text>
        </View>
        <View style={styles.informationWrapperStyle}>
          <View style={styles.informationContainerStyle}>
            <Text style={styles.boldTextStyle}>
              Total Spending in Currency:{' '}
            </Text>
            <Text>
              {spending}
              {currencySymbols[currency]}
            </Text>
          </View>
          <View style={styles.informationContainerStyle}>
            <Text style={styles.boldTextStyle}>Most Expensive Item: </Text>
            <Text>
              {mostExpensiveItem.name} ({mostExpensiveItem.price}
              {currencySymbols[currency]})
            </Text>
          </View>
          <View style={styles.informationContainerStyle}>
            <Text style={styles.boldTextStyle}>
              Most Commonly Purchased Item Category:{' '}
            </Text>
            <Text>
              {mostCommonCat.name} ({mostCommonCat.quantity} {itemPlurality})
            </Text>
          </View>
          <View style={styles.informationContainerStyle}>
            <Text style={styles.boldTextStyle}>Most Expensive Category: </Text>
            <Text>
              {mostExpensiveCat.name} ({mostExpensiveCat.price}
              {currencySymbols[currency]})
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const getReport = () => {
    sums = getSpendingByCurrency(data);
    categorizedSums = getInformationByCategory(data);
    mostExpensiveItems = getMostExpensiveItem(data);
    if (Object.keys(sums).length === 0) {
      return (
        <View style={styles.blankReportContainerStyle}>
          <Text style={styles.blankReportTextStyle}>
            There have been no expenses during this month.
          </Text>
        </View>
      );
    } else {
      currencyPlurality =
        Object.keys(sums).length > 1 ? 'currencies' : 'currency';
      currencyOverview =
        'You have purchased in ' +
        Object.keys(sums).length.toString() +
        ' ' +
        currencyPlurality +
        ' this month: ';

      elements = Object.keys(sums).length;
      if (elements > 0) {
        var i = 0;
        for (var key in sums) {
          i = i + 1;
          var currencyName = currencyList.filter(function(ob) {
            return ob.short === key;
          });
          currencyOverview += currencyName[0].name;
          if (i == elements - 1) {
            currencyOverview += ' and ';
          } else if (i == elements) {
          } else {
            currencyOverview += ', ';
          }
        }
      } else {
        currencyOverview += '0' + currencySymbols[currency];
      }
      return (
        <View style={styles.reportContainerStyle}>
          <Text style={styles.overviewTextStyle}>{currencyOverview}</Text>
          {getFullOverview(sums, categorizedSums, mostExpensiveItems)}
        </View>
      );
    }
  };

  return (
    <SafeAreaView
      forceInset={{top: 'always'}}
      style={[styles.backgroundStyle, themeColorStyle]}>
      <Header
        title={`Report ${_month} ${_year}`}
        onPress={() => navigation.goBack(null)}
        icon={'arrow-left'}
        showBackButton={true}
      />
      <ScrollView contentContainerStyle={styles.scrollContainerStyle}>
        {getReport()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  scrollContainerStyle: {
    flexGrow: 1,
  },
  overviewTextStyle: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  reportContainerStyle: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  blankReportTextStyle: {
    fontSize: 25,
    textAlign: 'center',
  },
  blankReportContainerStyle: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  boldTextStyle: {
    fontWeight: 'bold',
  },
  headerContainerStyle: {
    borderBottomWidth: 1,
    borderColor: colors.black,
    marginTop: 15,
  },
  headerTextStyle: {
    fontSize: 25,
    textAlign: 'center',
  },
  informationContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  informationWrapperStyle: {
    paddingVertical: 10,
  },
});

export default ReportScreen;
