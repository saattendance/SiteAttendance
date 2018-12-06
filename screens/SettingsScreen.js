import React, { Component } from "react";
import { StyleSheet, View, StatusBar, WebView, Dimensions, Platform } from "react-native";
import { connect } from "react-redux";
import { DrawerActions } from "react-navigation-drawer";
import {
  Container,
  Form,
  Header,
  Item,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  CardItem,
  Subtitle,
  Picker,
  Card,
  Grid,
  Col,
  Row,
  H1,
  Spinner
} from "native-base";
import AppHeader from "../components/AppHeader";
import OfflineNotice from "../components/OfflineNotice";
import config from "../appConfig/config";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: null,
      loading: false,
    };
  }

  componentDidMount() {
    const { allEmployees } = this.props;
    if(Platform.OS==='android' && allEmployees && allEmployees.length > 0)
    {
      this.setState({selected2: allEmployees[0].ID});
  //      this.getData(allEmployees[0].ID);
    }
  }

  onValueChange2(value: string) {
    console.log(value);
    this.setState({
      selected2: value
    });
  }

  render() {
    const { allJobcodes, allEmployees, currentTime } = this.props;
    const {loading} = this.state;
    return (
      <Container style={{ backgroundColor: "#F0F8FF" }}>
        <AppHeader navigation={this.props.navigation} />
        <OfflineNotice />
        {loading && <Spinner />}
        <Content>
          <StatusBar hidden />
          <Item picker>
            <Left>
              <Title style={[Platform.OS==='android' &&{ color:'#000000', marginLeft:10}]}>Clock In Report</Title>
            </Left>
            <Right>
              <Picker
                mode="dropdown"
                //iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width:Platform.OS==='android'?200: undefined }}
                placeholder="Select Employee"
                placeholderStyle={{ color: "#000000" }}
                placeholderIconColor="#000000"
                note={false}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {allEmployees.map(item => (
                  <Picker.Item
                    key={item.ID + "l"}
                    label={item.EmployeeName}
                    value={item.ID}
                  />
                ))}
              </Picker>
            </Right>
          </Item>
          <View style={{flex:1, height:Dimensions.get("window").height -100}}>
          <WebView
            originWhitelist={["*"]}
            source={{ uri: `${config.REPORT_PATH}` }}
          />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allJobcodes: state.users.allJobcodes,
    allEmployees: state.users.allEmployees ? state.users.allEmployees : [],
    currentTime: state.users.currentTime,
    authToken: state.users.authToken
  };
};

export default connect(mapStateToProps)(SettingsScreen);
