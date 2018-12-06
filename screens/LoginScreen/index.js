import * as React from "react";
import { Image, Platform, StatusBar } from "react-native";
import { Container, Content, Header, Body,
	 Title, Button, Text, View, Icon, Footer,
	  CheckBox,Card, CardItem,Spinner } from "native-base";

import config from '../../appConfig/config';
import OfflineNotice from '../../components/OfflineNotice';
//import styles from "./styles";
export interface Props {
	loginForm: any,
	onLogin: Function,
}
export interface State {}
class Login extends React.Component<Props, State> {
	render() {
		let year = (new Date()).getFullYear();
		const {isLoadingRequestData} = this.props;
		return (
			<Container style={{  backgroundColor: "#F0F8FF"}}>
				<Header style={{ height: 200, backgroundColor:'#00c0ef' }}>
					<Body style={{ alignItems: "center" }}>
						<Icon ios="ios-time" name="time" style={{ fontSize: 104 }} />
						<Title style={{color:'#000'}}>{config.APP_NAME}</Title>
					</Body>
				</Header>
				{isLoadingRequestData &&	<Spinner /> }
				<OfflineNotice />
				<Content>
				  <StatusBar hidden />
					{this.props.loginForm}
					<View padder>
						<Button block onPress={() => this.props.onLogin()}>
							<Text>Login</Text>
						</Button>
					</View>
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
export default Login;
