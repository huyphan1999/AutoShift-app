import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { signupRequest } from '../../actions/signup.action';
import { getUserToken } from '../../selectors/index';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            email:null,
            password:null,
        }
    }
    componentDidMount = () => {
        let token = this.props.token
        if (token) {
            this.props.navigation.navigate("Home");
        }
    }
    render() {
        let {email,password}=this.state;
        return (
            <View>
                <View>
                    <Text style={{ color: '#39e394', fontSize: 28, paddingBottom: 80 }}>Tanca</Text>
                </View>

                <View style={styles.textHeader}>
                    <Text style={{ color: '#39e394', fontSize: 28 }}>Phần mềm quản lý nhân sự 4.0 </Text>
                    <Text style={{ color: '#39e394', fontSize: 28 }}> cho công ty hiện đại </Text>
                    <Text style={{ fontSize: 18, paddingTop: 8 }}>Đa nền tảng - Dùng đơn giản - Dễ triển khai</Text>

                </View>

                <View style={styles.textInput}>
                    <View style={styles.textInputContainer} >
                        <TextInput
                            style={styles.textInput}
                            textContentType='username'
                            placeholder='Tên đăng nhập'
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                    </View>
                    <View style={styles.textInputContainer} >
                        <TextInput
                            style={styles.textInput}
                            textContentType='telephoneNumber'
                            onChangeText={(text) => this.setState({ password: text })}
                            placeholder='Số điện thoại'
                        />
                    </View>
                    <View style={styles.checkBox}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={this.state.checked}
                                onValueChange={() => this.setState({ checked: !this.state.checked })}
                            />
                            <Text style={{ marginTop: 5 }}> Tôi đồng ý với điều khoản và chính sách bảo mật của Tanca</Text>
                        </View>
                    </View>

                    <View style={{ paddingTop: 20 }}>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => this.props.signupRequest({ email, password })}
                        >
                            <Text>DÙNG THỬ MIỄN PHÍ</Text>

                        </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    justifyContent: 'center', alignItems: 'center', paddingTop: 40
                }}>
                    <Text style={{ color: '#000', fontSize: 16 }}> TANCA HR ĐƯỢC TIN TƯỞNG SỬ DỤNG BỞI +</Text>
                    <Text style={{ color: '#000', fontSize: 16 }}>40,000 NGƯỜI DÙNG</Text>
                </TouchableOpacity>
            </View>
            </View >

        )
    }
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
        },
        textHeader: {
            height: 80,
            backgroundColor: '#ffff',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 30


        },

        textInput: {
            justifyContent: 'flex-start',
            backgroundColor: '#f2fcf8',
            alignItems: 'center'
        },

        textInputContainer: {
            width: 390,
            marginTop: 20,
            backgroundColor: '#ffffff',
            height: 60,
            paddingHorizontal: 10,
            borderRadius: 6,
        },
        textInput: {
            fontSize: 20,
        },
        loginBtn: {

            width: 390,
            height: 45,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#39e394',
            fontSize: 16,
        },
        checkBox: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 30,

        }
    });

const mapStateToProps = state => ({
    token: getUserToken(state),
})
function mapDispatchToProps(dispatch) {
    return {
        signupRequest: ({ email, password }) => dispatch(signupRequest({ email, password }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
