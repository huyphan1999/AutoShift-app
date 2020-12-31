import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { getParams, getParamsHeader } from '../../../utils/index';

function Item({ data, onPress }) {
    var time = `${data.timeStart}-${data.timeEnd}`
    return (
        <TouchableOpacity style={styles.txtContent}
            onPress={() => onPress(data)} >
            <Text >{data.title}</Text>
            <Text>{time}</Text>
        </TouchableOpacity>
    );
}

export default class Shift extends React.Component {

    static navigationOptions = ({ navigate, navigation }) => {
        const params = getParamsHeader(navigation);
        return {
            headerRight: (
                <TouchableOpacity
                    style={{ paddingRight: 15 }}
                    onPress={() => params.onPressHeader()}>
                    <Image
                        source={require('../../image/add_object.png')}
                        style={{ width: 20, height: 20 }}
                        tintColor='white'
                    />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, paddingLeft: 40 }}>
                        Ca
                    </Text>
                </View>
            ),
        };

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={({ item }) => <Item data={item} onPress={(data) => this.onPressItem(data)} />}
                    keyExtractor={item => item.id}
                    style={{ borderBottomWidth: 1, paddingLeft: 10, }}
                />
            </SafeAreaView>
        )
    };
}



const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    txtContent: {
        padding: 12,
        fontSize: 16,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
