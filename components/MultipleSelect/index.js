import React, { Component } from "react";
import { Modal, TouchableHighlight, View, Alert, Platform } from "react-native";
import {
  Container,
  Header,
  Item,
  Content,
  Text,
  Button,
  Left,
  Body,
  Right,
  Label,
  List,
  ListItem,
  Icon, Title,Subtitle, Footer
} from "native-base";

import reject from "lodash/reject";
import find from "lodash/find";
import get from "lodash/get";

export default class MultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  onSelection = item => {
    const { valueField, selectedItems } = this.props;
    const selectedItem = find(
      selectedItems,
      singleItem => singleItem[valueField] === item[valueField]
    );
    if (selectedItem) {
      this._removeItem(item);
    } else {
      this._addItem(item);
    }
  };

  getIcon = (item, selectedItems) => {
    const { valueField } = this.props;
    const selectedItem = find(
      selectedItems,
      singleItem => singleItem[valueField] === item[valueField]
    );

    return selectedItem;
  };

  _removeItem = item => {
    const { valueField, selectedItems, onSelectedItemsChange } = this.props;
    const newItems = reject(
      selectedItems,
      singleItem => item[valueField] === singleItem[valueField]
    );
    //console.log(newItems);
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems);
  };

  _addItem = item => {
    const { valueField, selectedItems, onSelectedItemsChange } = this.props;
    if(selectedItems.length>0 && selectedItems[0].CurrentStatus !== item.CurrentStatus)
    {
      // Do nothing
    }
    else {
    let newSelectedItems = [];
    newSelectedItems = [...selectedItems, item];
    onSelectedItemsChange(newSelectedItems);
  }
  };

  render() {
    const { items, displayField, selectedItems, valueField } = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
          }}
        >
          <Container>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                {Platform.OS === 'ios'?   <Text>Back</Text> :
                  <Subtitle>Back</Subtitle>
                }
                </Button>
              </Left>
              <Body>
              <View style={{flex:1 ,justifyContent:'center'}}>
                  <Title>Select Employee</Title>
                  </View>
              </Body>
            </Header>
            <Content>
              <List>
                {items.map(item => (
                  <ListItem key={item[valueField]}
                    selected={this.getIcon(item, selectedItems) ? true : false}
                    button
                    onPress={() => {
                      this.onSelection(item);
                    }}
                  >
                    <Body>
                      <Text>{item[displayField]} - {item['CurrentStatus']}</Text>
                    </Body>
                    <View>
                      {this.getIcon(item, selectedItems) ? (
                        <Icon name="checkmark" ios="ios-checkmark" color="blue" />
                      ) : null}
                    </View>
                  </ListItem>
                ))}
              </List>
            </Content>
            <Footer style={{backgroundColor:'#ffffff'}}>

            <View style={{flex:1, paddingHorizontal:10}}>
            <Button
              block
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            ><View padder>
            <Text style={[Platform.OS === 'android' && {color:'#ffffff'}]}>Ok</Text>
            </View></Button>
            </View>
            </Footer>
          </Container>
        </Modal>
        {items.length > 1 ?
        <Button
          transparent
          dark
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Select Employees</Text>
          <Icon name="arrow-dropdown" ios="ios-arrow-down" />
        </Button>:
        items.map(item => (
          <View style={{padding:10}} key={item[valueField]+'-ss'}>
     <Text>{item[displayField]}</Text>
     </View>
   ))}
      </View>
    );
  }
}
