import React, { Component } from 'react';
import Signup from './Signup';
import { connect } from 'react-redux';
import { getData } from '../../selectors/index';

class SignupContainer extends Signup {
    constructor(props) {
        super(props);
        console.log(this.props)
      }
}

const mapStateToProps = state => ({
    isLoading: getData(state, 'signup', 'requesting')
})
export default connect(mapStateToProps)(SignupContainer)