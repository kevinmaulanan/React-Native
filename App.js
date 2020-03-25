
import React, { Component } from 'react'
import MainNavigator from './src/Routes/MainNavigator'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import persist from './src/Redux/Store/Store'

const persistStore = persist()

class App extends Component {
  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
};



export default App;
