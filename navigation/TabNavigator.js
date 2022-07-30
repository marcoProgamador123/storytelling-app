import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";


const Tab = createMaterialBottomTabNavigator()

export default class BottomTabNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      light_theme: true,
      isUpdated:false
    }
  }
  componentDidMount() {
    this.fetchUser()
  }
  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({
      light_theme: theme === "light" ? true : false
    })
  }

  renderFeed = props => {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderStory = props => {
    return <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };
  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            var iconName
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "CreateStory") {
              iconName = focused ? "add-circle" : "add-circle-outline"
            }
            return <Ionicons name={iconName} size={size} color={color} style={styles.icons} />
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}>
        <Tab.Screen name="Feed" component={this.renderFeed} />

        <Tab.Screen name="CreateStory" component={this.renderStory} />
      </Tab.Navigator>
    );
  }

}
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});




