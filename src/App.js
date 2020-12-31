/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";

import initStore from "./store/store.config";

import { Root, StyleProvider } from "native-base";
import { Provider } from "react-redux";
import NavigationService from "./navigation/NavigationService";
import Home from "./containers/Home/Home";
import Navigation from "./navigation/index";
import Test from "containers/TestScreen/index.js";

import getTheme from "app/native-base-theme/components";

const store = initStore();

class App extends Component {
  render() {
    // return <Test />;

    return (
      <Provider store={store}>
        <StyleProvider style={getTheme()}>
          <Root>
            <Navigation
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}

export default App;

/* constructor(props) {
     super(props)
 
     this.state = {
       branch: []
     }
   }
 
   <MultipleChoice options={DATA} onSelection={(selectedOptions)=>this.onSelectBracnh(selectedOptions)} />
 
   onSelectBracnh = (selectedOptions) => {
     this.setState({ branch: [...selectedOptions] })
   }
   */
