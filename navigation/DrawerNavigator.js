import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import bottomTabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";
import Logout from "../screens/Logout";
import firebase from "firebase";
import CustomSidebarMenu from "../screens/CustomSidebarMenu"



const Drawer = createDrawerNavigator()
export default class DrawerNavigator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            light_theme: true
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

    render() {
        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: "#231678",
                    inactiveTintColor: this.state.light_theme ? "black" : "white",
                    itemStyle: { marginVertical: 5 }
                }}
                drawerContent={props => <CustomSidebarMenu {...props} />}
            >
                <Drawer.Screen name="Tela Inicial" component={StackNavigator} />
                <Drawer.Screen name="Perfil" component={Profile} />
                <Drawer.Screen name="Logout" component={Logout} />
            </Drawer.Navigator>
        )
    }

}
