import React, { Component } from 'react'
import { ActivityIndicator, View, Modal } from 'react-native'


const Loading = ({ isLoading }) => {
    <Modal
        transparent={true}
        animationType={'none'}
        visible={isLoading}
    >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator style={{ marginTop: 15 }} size="large" color='#233324'>

            </ActivityIndicator>
        </View>

    </Modal>
}

export default Loading
