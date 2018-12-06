import React, { Component } from "react";
import { StyleSheet,View, StatusBar } from "react-native";

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
  Row, H1
} from "native-base";
import AppHeader from "../components/AppHeader";
import OfflineNotice from '../components/OfflineNotice';

export default class ClockInReports extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selected2: "key0"
    };
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <AppHeader navigation={this.props.navigation}/>
        <OfflineNotice />
        <Content>
         <StatusBar hidden />
          <Item picker>
            <Left>
              <Title>Dashboard</Title>
            </Left>
            <Right>
              <Picker
                mode="dropdown"
                //iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Employee"
                placeholderStyle={{ color: "#bfc6ea" }}
                note={false}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Sumit Kumar" value="key0" />
                <Picker.Item label="Test Employee" value="key1" />
                <Picker.Item label="Debit Card Employee" value="key2" />
                <Picker.Item label="Credit Card Employee" value="key3" />
                <Picker.Item label="Net Banking Employee" value="key4" />
              </Picker>
            </Right>
          </Item>
          <Grid>
            <Row>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem bordered>
                    <Left />
                    <Body>
                      <Icon
                        ios="ios-time"
                        name="time"
                        style={{ fontSize: 50 }}
                      />
                    </Body>
                    <Right />
                  </CardItem>
                  <CardItem footer bordered>
                    <Text>View Details</Text>
                  </CardItem>
                </Card>
              </Col>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem bordered>
                  <View style={{ flex:1, flexDirection: 'column',
        justifyContent: 'center',alignItems: 'center'}}>
                      <H1>00:00 hrs</H1>
                      <Subtitle>Over time</Subtitle>
                      </View>
                  </CardItem>
                  <CardItem footer bordered>
                    <Text>View Details</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem bordered>
                  <View style={{ flex:1, flexDirection: 'column',
        justifyContent: 'center',alignItems: 'center'}}>
                      <H1>05</H1>
                      <Subtitle>Late In</Subtitle>
                      </View>
                  </CardItem>
                  <CardItem footer bordered>
                    <Text>View Details</Text>
                  </CardItem>
                </Card>
              </Col>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem bordered>
                  <View style={{ flex:1, flexDirection: 'column',
        justifyContent: 'center',alignItems: 'center'}}>
                      <H1>09</H1>
                      <Subtitle>Early Out</Subtitle>
                      </View>
                  </CardItem>
                  <CardItem footer bordered>
                    <Text>View Details</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem bordered>
                  <View style={{ flex:1, flexDirection: 'column',
        justifyContent: 'center',alignItems: 'center'}}>
                      <H1>04</H1>
                      <Subtitle>Leaves</Subtitle>
                      </View>
                  </CardItem>
                  <CardItem footer bordered>
                    <Text>View Details</Text>
                  </CardItem>
                </Card>
              </Col>
              <Col style={{ backgroundColor: "#FFFFFF", height: 150 }} >
              <View style={{ flex:1, flexDirection: 'column',
    justifyContent: 'center',alignItems: 'center'}}>
    <Button light><Text> Clock In Time </Text></Button>
    </View>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
