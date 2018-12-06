import * as React from "react";
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
  Thumbnail,H1
} from "native-base";
import { Image, View } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

export interface Props {
  navigation: any;
  loggedInUser: any;
}
export interface State {}
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

const iconPath = require("../../assets/images/icon.png");

export default class Sidebar extends React.Component<Props, State> {
  render() {
    const { loggedInUser } = this.props;
    let routes = [];
    //if (loggedInUser.Role === "admin") {
      routes.push({
        route: "DashBoard",
        caption: "DashBoard"
      });
  //  }
    routes.push({
      route: "Home",
      caption: "Clock In/Out"
    });
    if (loggedInUser.Role === "admin01") {
      routes.push({
        route: "SettingsScreen",
        caption: "Clock In Report"
      });
    }
    routes.push({
      route: "Login",
      caption: "Logout"
    });
    return (
      <Container style={{ backgroundColor:'#5691e6', color:'#ffffff'}}>
        <Content>
          <View
            style={{
              flex: 1,
              height: 230,
              backgroundColor: "#F0F8FF",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 30
            }}
          >
            <Image
              source={iconPath}
              style={{
                width: 140,
                height: 140
              }}
            />
            <H1 style={{color:"#000", marginTop:10}}>{loggedInUser.UserName}</H1>
          </View>
          <List
            style={{ marginTop: 20 }}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => {
                    data.route === "Login"
                      ? this.props.navigation.dispatch(resetAction)
                      : this.props.navigation.navigate(data.route);
                  }}
                >
                  <Text style={{ backgroundColor:'#5691e6', color:'#ffffff'}}>{data.caption}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
