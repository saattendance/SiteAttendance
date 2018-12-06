import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  StatusBar
} from "react-native";
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
  Input,
  Label,
  Toast, Spinner, Badge,Footer
} from "native-base";
import { Constants, Location, Permissions, MapView } from "expo";
import { connect } from "react-redux";
import { setLastLocation, getLastLocation,getAppConfig } from "../util";
import {
  geoAddressApi,
  getSeverTime,
  saveTimeTracking,
  getEmployeesAll
} from "../lib/apiHelper";
import MultipleSelect from "../components/MultipleSelect";
import AppHeader from "../components/AppHeader";
import OfflineNotice from "../components/OfflineNotice";
import { getCurrentTime, getAllEmployees } from "../actions/users";

class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      selected2: "key0",
      selectedJobcode: null,
      locationAddress: "",
      selectedEmployees: [],
      loading:false
    };
  }

  onSelectedItemsChange = selectedEmployees => {
    //console.log(selectedEmployees);
    this.setState({ selectedEmployees });
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
    this._getServerTime();
  }
  toggleLoading = () => {
    this.setState(prevState => ({
      loading: !prevState.loading
    }));
  }
  _getServerTime() {
    getSeverTime(this.props.authToken).then(res => {
      this.props.getCurrentTime(res.CurrentDate);
    });
  }

  componentDidMount() {
    const { allEmployees, allJobcodes } = this.props;
    if (allEmployees && allEmployees.length == 1) {
      this.setState({ selectedEmployees: allEmployees });
    }
   this.timerID = setInterval(
       () => this._getServerTime(),
       10000
     );
   }

   componentWillUnmount() {
     clearInterval(this.timerID);
   }

  _getAddressAsync = async (lat, long) => {
    const config= await getAppConfig();
    if(!config.GEO_API_ENABLED)
      return this.fallBack(lat, long);
  console.log(`${config.GEO_API_URL}${lat},${long}&key=${config.GEO_API_KEY}`);
    geoAddressApi({ latitute: lat, longitude: long }).then(address => {
      if (address && address.results) {
        console.log(address.results[0].formatted_address);
        setLastLocation({
          latitude: lat,
          longitude: long,
          address: address.results[0].formatted_address
        });
        this.setState({
          locationAddress: address.results[0].formatted_address
        });
      }
    })
    .catch(
      error =>this.fallBack(lat, long));
  };

  fallBack = async (lat, long) =>
  {
    let addresses  = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long});
      console.log(addresses);
      if(addresses)
      {
        const {  name, street, city , postalCode,  region ,country} = addresses[0];
        this.setState({
          locationAddress: `${name} ${street}, ${city}  ${postalCode}  ,${region} ${country}`
        });
      }
  }

  _getLocationAsync = async () => {
    const lastLocation = await getLastLocation();
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    if (
      lastLocation &&
      lastLocation.latitude === location.coords.latitude &&
      lastLocation.longitude === location.coords.longitude
    ) {
      console.log("from Cache");
      this.setState({
        locationAddress: lastLocation.address
      });
    } else {
      console.log("from url");
      this._getAddressAsync(
        location.coords.latitude,
        location.coords.longitude
      );
    }
    this.setState({
      location,
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00522,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.00522
      }
    });
  };

  clearForm = () =>{
    const {  allEmployees, allJobcodes } = this.props;
    this.setState({
      selectedJobcode: (Platform.OS==='android' && allJobcodes && allJobcodes.length > 0)? allJobcodes[0].Code:undefined,
      selectedEmployees: allEmployees && allEmployees.length == 1? allEmployees: [],
      loading:false
    });
  }

  SaveTimeTracking =  async () => {
    this.toggleLoading();
    let x= undefined;
    const {
      region,
      locationAddress,
      selectedEmployees,
      selectedJobcode
    } = this.state;
    const {authToken, loggedInUser, allJobcodes} = this.props;
    if(selectedJobcode)
    {
      x = selectedJobcode;
    }
    else {
      x = allJobcodes[0].Code;
    }
    console.log(x);
    for (let i = 0; i < selectedEmployees.length; i++) {
      let employeee = selectedEmployees[i];
      let trackingPayload = {
        EmployeeId: employeee.ID,
        JobCode: x,
        Latitude: region.latitude,
        Longitude: region.longitude,
        Action: employeee.CurrentStatus,
        Location: locationAddress
      };
      console.log(trackingPayload);

     var res = await saveTimeTracking(authToken, trackingPayload);
    }
    this.toggleLoading();
    getEmployeesAll(
      authToken,
      loggedInUser.EmployeeID,
      loggedInUser.CompanyID
    ).then(res => {

      //console.log(res);
      Toast.show({
        text: "Success",
        duration: 2000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
      this.props.getAllEmployees(res);
      this.clearForm();
    });
  };

  onRegionChange(region) {
    //  this.setState({ region });
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  onValueChange3(value: string) {
    this.setState({
      selectedJobcode: value
    });
  }

  render() {
    const { allJobcodes, allEmployees, currentTime } = this.props;
    const { selectedEmployees, loading } = this.state;
    let text = "Waiting..";
    if (this.state && this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state && this.state.location) {
      text = this.state.locationAddress;
    }

    const coords = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    };
    let year = (new Date()).getFullYear();
    return (
      <Container style={styles.container}>
        <AppHeader navigation={this.props.navigation} />
        <OfflineNotice />
        <Content style={{paddingHorizontal: 5}}>
          <StatusBar hidden />
          <Form>
            <Item>
              <Left>
                <Label>Clock In/Out</Label>
              </Left>
              <Right>
                <MultipleSelect
                  items={allEmployees}
                  displayField="EmployeeName"
                  valueField="ID"
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={selectedEmployees}
                />
              </Right>
            </Item>
            {allEmployees.length > 1 && selectedEmployees.length > 0 ? (
              <Item>
                <View style={{ flexDirection: "row", padding: 10 }}>
                  {selectedEmployees.map(item => (
                    <Badge  key={item.ID + "d"} warning style={{ marginRight: 10 }}><Text>
                      {item.EmployeeName}
                    </Text>
                    </Badge>
                  ))}
                </View>
              </Item>
            ) : null}
            <View style={{padding:10}}>
            <Card>
              <CardItem>
                <Item success fixedLabel>
                  <Label>{selectedEmployees.length == 1 ? selectedEmployees[0].CurrentStatus : 'Time'}</Label>
                  <Input multiline disabled value={currentTime} />
                  <Icon name="checkmark-circle" />
                </Item>
              </CardItem>
              <CardItem>
                <Item disabled fixedLabel>
                  <Label>Location</Label>
                  <Input multiline disabled value={text} />
                </Item>
              </CardItem>
              <CardItem>
                <Item>
                  <Left>
                    <Label>Job Code</Label>
                  </Left>
                  <Right>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select Job Code"
                        placeholderStyle={{ color: "#000000" }}
                        placeholderIconColor="#000000"
                        selectedValue={this.state.selectedJobcode}
                        onValueChange={this.onValueChange3.bind(this)}
                      >
                      <Picker.Item label={"Select Job Code"} value={null}/>
                        {allJobcodes.map(item => (
                          <Picker.Item
                            key={item.Id + "j"}
                            label={`${item.Name}-${item.Code}`}
                            value={item.Code}
                          />
                        ))}
                      </Picker>
                    </Item>
                  </Right>
                </Item>
              </CardItem>
              {loading && <Spinner/>}
              <CardItem>
                <MapView
                  style={{ flex: 1, width: "100%", height: 175 }}
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}
                  showsMyLocationButton
                  Provider={MapView.PROVIDER_GOOGLE}
                >
                  <MapView.Marker
                    coordinate={coords}
                    description={this.state.locationAddress}
                  />
                </MapView>
              </CardItem>
              <CardItem>
                <Left>
                  <Button success onPress={this.SaveTimeTracking}>
                    <Text> Save </Text>
                  </Button>
                </Left>
                <Right>
                  <Button danger onPress={() => this.clearForm()}>
                    <Text> Reset </Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
            </View>
          </Form>
        </Content>
        <Footer style={{ backgroundColor: "#F8F8F8" }}>
          <View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row"  }}>
            <View padder>
              <Text style={{ color: "#000" }}>{'\u00A9'} Interaccion {year}</Text>
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
    loggedInUser: state.users.loggedInUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentTime: time => {
      dispatch(getCurrentTime(time));
    },
    getAllEmployees: res => {
      dispatch(getAllEmployees(res));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
