import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
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
  H2,
  Spinner,
  Footer
} from "native-base";
import find from "lodash/find";
import AppHeader from "../components/AppHeader";
import OfflineNotice from "../components/OfflineNotice";
import { getSeverTime, getEmployeeDashboard } from "../lib/apiHelper";
import { getCurrentTime } from "../actions/users";

class LinksScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selected2: null,
      loading: false,
      dashboardData: undefined
    };
  }

  _getServerTime() {
    getSeverTime(this.props.authToken).then(res => {
      this.props.getCurrentTime(res.CurrentDate);
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this._getServerTime(), 5000);
    const { allEmployees, loggedInUser } = this.props;
    console.log(loggedInUser);
    if (allEmployees && allEmployees.length > 0) {
      const currentEmp = find(
        allEmployees,
        emp => emp["ID"] === loggedInUser.EmployeeID
      );
      console.log(currentEmp);
      if (currentEmp) {
        this.setState({ selected2: currentEmp.ID });
          this.getData(currentEmp.ID, loggedInUser.CompanyID);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onValueChange2(value: string) {
    console.log(value);
    this.getData(value);
    this.setState({
      selected2: value
    });
  }

  toggleLoading = () => {
    this.setState(prevState => ({
      loading: !prevState.loading
    }));
  };

    getData = async (id, compid) => {
    if (!id) return;
    const { authToken } = this.props;
        this.toggleLoading();
        try {
            var dashboardData = await getEmployeeDashboard(authToken, id, compid);
            console.log(dashboardData);
            if (dashboardData && dashboardData["EmployeeId"] !== undefined) {
                this.setState({
                    dashboardData
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    this.toggleLoading();
  };

  render() {
    const { allJobcodes, allEmployees, currentTime } = this.props;
      const { loading, dashboardData } = this.state;

      //"HeadCount":"1","TotalHours":"12.37","EarlyIn":"00:00:00","LateIn":"00:09:14","EarlyOut":"00:00:00","OverTime":"04:38:44"
    //console.log(dashboardData);
    const year = new Date().getFullYear();
    return (
      <Container style={styles.container}>
        <AppHeader navigation={this.props.navigation} />
        <OfflineNotice />
        {loading && <Spinner />}
        <Content style={{ paddingHorizontal: 5 }}>
          <StatusBar hidden />
          <Item picker>
            <Left>
              <Title
                style={[
                  Platform.OS === "android" && {
                    color: "#000000",
                    marginLeft: 10
                  }
                ]}
              >
                Dashboard
              </Title>
            </Left>
            <Right>
              <Picker
                mode="dropdown"
                //iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: Platform.OS === "android" ? 200 : undefined }}
                placeholder="Select Employee"
                placeholderStyle={{ color: "#000000" }}
                placeholderIconColor="#000000"
                note={false}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label={"Select Employee"} value={null} />
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
          <Item style={{ paddingVertical: 10 }}>
            <Left>
              <Title
                style={[
                  Platform.OS === "android" && {
                    color: "#000000",
                    marginLeft: 10
                  }
                ]}
              >
                Time
              </Title>
            </Left>
            <Right>
              <Text>{currentTime}</Text>
            </Right>
          </Item>
          <Grid>
            <Row>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem
                    bordered
                    cardBody
                    style={{ backgroundColor: "#00c0ef" }}
                  >
                    <View
                      style={{ height: 120, flexDirection: "column", flex: 1 }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          flex: 70
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Icon
                            ios="ios-time"
                            name="time"
                            style={{ fontSize: 40, color: "#ffffff" }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                                                <H1 style={{ color: "#ffffff" }}>{dashboardData ? dashboardData.TotalHours : "00:00"}</H1>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.2)",
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 30
                        }}
                      >
                        <Text style={{ color: "#ffffff" }}>Total Hrs</Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </Col>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem
                    bordered
                    cardBody
                    style={{ backgroundColor: "#00a65a" }}
                  >
                    <View
                      style={{ height: 120, flexDirection: "column", flex: 1 }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          flex: 70
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Icon
                            ios="ios-timer"
                            name="timer"
                            style={{ fontSize: 40, color: "#ffffff" }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <H1 style={{ color: "#ffffff" }}>
                            {dashboardData ? dashboardData.OverTime : "00:00"}
                          </H1>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.2)",
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 30
                        }}
                      >
                        <Text style={{ color: "#ffffff" }}>Over time</Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem
                    bordered
                    cardBody
                    style={{ backgroundColor: "#dd4b39" }}
                  >
                    <View
                      style={{ height: 120, flexDirection: "column", flex: 1 }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          flex: 70
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Icon
                            ios="ios-walk"
                            name="walk"
                            style={{ fontSize: 40, color: "#ffffff" }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <H1 style={{ color: "#ffffff" }}>
                            {dashboardData ? dashboardData.LateIn : "00"}
                          </H1>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.2)",
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 30
                        }}
                      >
                        <Text style={{ color: "#ffffff" }}>Late In</Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </Col>
              <Col style={{ padding: 10, height: 150 }}>
                <Card>
                  <CardItem
                    bordered
                    cardBody
                    style={{ backgroundColor: "#f39c12" }}
                  >
                    <View
                      style={{ height: 120, flexDirection: "column", flex: 1 }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          flex: 70
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Icon
                            ios="ios-walk"
                            name="walk"
                            style={{
                              fontSize: 40,
                              color: "#ffffff",
                              transform: [{ rotateY: "180deg" }]
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <H1 style={{ color: "#ffffff" }}>
                            {dashboardData ? dashboardData.EarlyOut : "00"}
                          </H1>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.2)",
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 30
                        }}
                      >
                        <Text style={{ color: "#ffffff" }}>Early Out</Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </Col>
            </Row>
          </Grid>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              paddingVertical: 20
            }}
          >
            <Button
              block
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text> Clock In Time </Text>
            </Button>
          </View>
        </Content>
        <Footer style={{ backgroundColor: "#F8F8F8" }}>
          <View
            style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}
          >
            <View padder>
              <Text style={{ color: "#000" }}>
                {"\u00A9"} Interaccion {year}
              </Text>
            </View>
          </View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF"
  }
});

const mapStateToProps = state => {
  return {
    allJobcodes: state.users.allJobcodes,
    allEmployees: state.users.allEmployees ? state.users.allEmployees : [],
    currentTime: state.users.currentTime,
    authToken: state.users.authToken,
    loggedInUser: state.users.loggedInUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentTime: time => {
      dispatch(getCurrentTime(time));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);
