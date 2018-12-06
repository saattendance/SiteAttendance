import React from 'react';
import { createStackNavigator , createDrawerNavigator   } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../containers/LoginContainer';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Sidebar from '../containers/SidebarContainer';

const Drawer = createDrawerNavigator (
	{
		Home: { screen: HomeScreen },
		DashBoard: {screen: LinksScreen},
		SettingsScreen: {screen: SettingsScreen}
	},
	{
		initialRouteName: "DashBoard",
		contentComponent: props => <Sidebar {...props} />,
	}
);

export default createStackNavigator(
	{
		Login: { screen: LoginScreen },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	}
);
