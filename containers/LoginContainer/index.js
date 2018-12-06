// @flow
import * as React from "react";
import { Item, Input, Icon, Toast, Form } from "native-base";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import Login from "../../screens/LoginScreen";
import {
  userLogin,
  getSeverTime,
  getJobCodesAll,
  getEmployeesAll
} from "../../lib/apiHelper";
import {
  getAllJobCodes,
  getAllEmployees,
  getCurrentTime,
  userSignIn,
  setAuthToken
} from "../../actions/users";
import { signIn, getToken } from "../../util";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(5);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export interface Props {
  navigation: any;
}
export interface State {}
class LoginForm extends React.Component<Props, State> {
  textInput: any;
  constructor(props) {
    super(props);
    this.state = {isLoadingRequestData:false}
  }
  toggleLoading = () => {
    this.setState(prevState => ({
      isLoadingRequestData: !prevState.isLoadingRequestData
    }));
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched}>
        <Icon active name={input.name === "Username" ? "person" : "unlock"} />
        <Input
          ref={c => (this.textInput = c)}
          placeholder={input.name === "Username" ? "Username" : "Password"}
          secureTextEntry={input.name === "Password" ? true : false}
          autoCapitalize="none"
          {...input}
        />
      </Item>
    );
  }

  login = () => {
    if (this.props.valid) {
      const { Username, Password } = this.props;
      //this.props.submit();
      this.toggleLoading();
      userLogin({ Username/*:'amir'*/, Password /*:'test_213'*/})
        .then(apiresponse => {
          if (apiresponse.response && apiresponse.response.Success) {
            //signIn({token: apiresponse.token, userData: apiresponse.response.Data});
            this.props.dispatch(userSignIn(apiresponse.response.Data));
            this.props.dispatch(setAuthToken(apiresponse.token));
            getEmployeesAll(
              apiresponse.token,
              apiresponse.response.Data.EmployeeID,
              apiresponse.response.Data.CompanyID
            ).then(res => {
              this.props.dispatch(getAllEmployees(res));
              this.props.navigation.navigate("Drawer");
            });
            getJobCodesAll(apiresponse.token).then(res => {
              this.props.dispatch(getAllJobCodes(res));
            });
            this.toggleLoading();
          } else if (apiresponse.response)
              this.toggleLoading();
              console.log('fffffssss' + apiresponse.response.ResultDesc)
              if(apiresponse.response.ResultDesc)
            Toast.show({
              text: apiresponse.response.ResultDesc,
              duration: 2000,
              position: "top",
              textStyle: { textAlign: "center" }
            });
        })
        .catch(error => {
          this.toggleLoading();
          Toast.show({
            text: error,
            duration: 2000,
            position: "top",
            textStyle: { textAlign: "center" }
          });
        });
    } else {
      Toast.show({
        text: "Enter Valid Username & password!",
        duration: 2000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  render() {
    const { error, submitting } = this.props;
    const form = (
      <Form>
        <Field
          name="Username"
          component={this.renderInput}
          validate={[required]}
        />
        <Field
          name="Password"
          component={this.renderInput}
          validate={[required]}
        />
      </Form>
    );
    return (
      <Login
        navigation={this.props.navigation}
        loginForm={form}
        onLogin={() => this.login()}
        isLoadingRequestData = {this.state.isLoadingRequestData}
      />
    );
  }
}
let LoginContainer = reduxForm({
  form: "login"
  //onSubmitSuccess:
  //onSubmit:userLogin
})(LoginForm);
const selector = formValueSelector("login"); // <-- same as form name
LoginContainer = connect(state => {
  // can select values individually
  const Username = selector(state, "Username");
  const Password = selector(state, "Password");
  return {
    Username,
    Password
  };
})(LoginContainer);
export default LoginContainer;
