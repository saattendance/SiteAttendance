import React, { Component } from "react";
import {View, Platform} from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import {  Header,   Title,   Text,  Button,
  Icon,  Left,  Body,  Right,  Subtitle } from "native-base";
import config from "../../appConfig/config";

export default class AppHeader extends React.Component<Props> {
  render() {
    return (
      <Header style={{backgroundColor:'#00c0ef'}}>
        <Left>
        <View style={[Platform.OS==="android" && {flex:1,justifyContent:'center', alignItems:'center'}]}>
          <Button transparent onPress={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }>
            <Icon
            style={[ {color:'#fff'}]}
              active
              name="menu"
            />
          </Button>
          </View>
        </Left>
        <Body>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 10 }}>
              <Icon ios="ios-time" name="time" style={{color:'#fff'}}/>
            </View>
            <Subtitle style={ {color:'#fff'}}> {config.APP_NAME} </Subtitle>
          </View>
        </Body>
        <Right />
      </Header>
    );
  }
}
