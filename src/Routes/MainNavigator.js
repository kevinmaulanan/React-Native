import React, { Component } from 'react';
import PublicNavigator from './PublicNavigator'
import PrivateNavigator from './PrivateNavigator'
import { connect } from 'react-redux'


class MainNavigator extends Component {


    render() {
        console.log('isLogin', this.props.authData.isLogin)
        if (this.props.authData.isLogin == true) {
            return (
                <PrivateNavigator />
            )
        } else {
            return (
                <PublicNavigator />
            )

        }
    }

}

const mapStateToProps = state => ({
    authData: state.auth
})

export default connect(mapStateToProps)(MainNavigator);