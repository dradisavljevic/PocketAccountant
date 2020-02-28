import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Item: FC<Props> = ({ name, price, category }) => (
  <View style={{paddingLeft: 10, paddingRight: 10, flex: 1, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1, borderTopColor: 'black', borderTopWidth: 1}}>
    <View style={{flex: 1, borderRightColor: 'black', padding: 5, borderRightWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Icon style={{ width: 30}} name={category} size={25} color={'black'} />
    </View>
    <View style={{flex: 8, borderRightColor: 'black', borderRightWidth: 2, padding: 5, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>{name}</Text>
    </View>
    <View style={{flex: 2, padding: 5, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>{price}</Text>
    </View>
  </View>
);

export default Item;
