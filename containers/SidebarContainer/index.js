// @flow
import * as React from "react";
import { connect } from 'react-redux';
import Sidebar from "../../screens/Sidebar";
export interface Props {
	navigation: any,
}
export interface State {}
class SidebarContainer extends React.Component<Props, State> {
	render() {
		return <Sidebar navigation={this.props.navigation} loggedInUser={this.props.loggedInUser} />;
	}
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.users.loggedInUser
  }
}
export default connect(mapStateToProps)(SidebarContainer);
