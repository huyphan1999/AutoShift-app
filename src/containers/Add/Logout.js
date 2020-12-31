import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity,Alert } from 'react-native';
import { connect } from 'react-redux';

class Logout extends Component {
    static navigationOptions = {

        headerTitle: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18,paddingRight:20 }}>Cài đặt</Text>
            </View>

        ),
    };

    ProcessLogout=()=>{
        this.props.dispatch({type:'LOG_OUT'})
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor:'#e6e6e6',paddingTop:40}}>
                <TouchableOpacity
                    onPress={() => Alert.alert(
                        'Thông báo',
                        'Bạn chắc chắn muốn đăng xuất tài khoản của bạn?',
                        [
                            { text: 'Hủy', onPress: () => console.log('Cancel Pressed!') },
                            { text: 'Đồng ý', onPress: this.ProcessLogout },
                        ],
                        { cancelable: false }
                    )}>

                    <Text
                     style={{ color: '#db3b3b', borderBottomWidth: 0.4, borderTopWidth: 0.4, backgroundColor:'#fcfcfc',padding:20}}
                     >
                         Đăng xuất tài khoản
                    </Text>
                </TouchableOpacity>
           </View>
        )
    }
}

export default connect()(Logout)