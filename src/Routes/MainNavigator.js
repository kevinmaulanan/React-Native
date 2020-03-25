import React, { Component } from 'react';
import PublicNavigator from './PublicNavigator'
import PrivateNavigator from './PrivateNavigator'
import { connect } from 'react-redux'


class MainNavigator extends Component {


    render() {
        console.log(this.props.authData.isLogin)
        if (this.props.authData.isLogin == false) {
            return (
                <PublicNavigator />
            )
        } else {
            return (
                <PrivateNavigator />
            )

        }
    }

}

const mapStateToProps = state => ({
    authData: state.auth
})

export default connect(mapStateToProps)(MainNavigator);