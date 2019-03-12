// native
import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native'
import { connect } from 'react-redux'

import { Modal } from '@ant-design/react-native'
import { NavigationActions } from 'react-navigation'

import Icon from 'react-native-vector-icons/AntDesign'

@connect(({ app }) => ({ ...app }))
class AddButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  handleAddButtonPress = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  /**
   *
   * type： 1:发布需求,  2:发布信息
   * @memberof AddButton
   */
  toPublish = type => {
    const { dispatch } = this.props
    this.setState(
      {
        visible: false,
      },
      () =>
        dispatch(
          NavigationActions.navigate({
            routeName: 'Publish',
            params: {
              type,
              name: `选择${type === 1 ? '需求' : '信息'}分类`,
            },
          })
        )
    )
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={style.bigBubble}
          hitSlop={{
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          }}
          onPress={()=>this.toPublish(2)}
        >
          <Image
            style={style.addImage}
            source={require('./images/icon_tool_release.png')}
          />
        </TouchableOpacity>
        {/* <Modal
          transparent
          visible={this.state.visible}
          animationType="slide"
          maskClosable
          onClose={this.onClose}
          footer={null}
          style={style.modal}
        >
          <TouchableOpacity style={style.btn} onPress={() => this.toPublish(1)}>
            <Image
              style={style.btnImg}
              source={require('./images/icon_demand.png')}
            />
            <Text style={style.btnText}>发布需求</Text>
            <Icon style={style.icon} name="right" />
          </TouchableOpacity>
          <TouchableOpacity style={style.btn} onPress={() => this.toPublish(2)}>
            <Image
              style={style.btnImg}
              source={require('./images/icon_information.png')}
            />
            <Text style={style.btnText}>发布信息</Text>
            <Icon style={style.icon} name="right" />
          </TouchableOpacity>
        </Modal> */}
      </View>
    )
  }
}

const style = StyleSheet.create({
  bigBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  modal: {
    width: 400,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  addImage: {
    width: 60,
    height: 60,
  },
  btn: {
    borderRadius: 40,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 80,
    backgroundColor: '#FFF',
    padding: 10,
  },
  btnText: {
    fontSize: 18,
  },
  btnImg: {
    width: 60,
  },
  icon: {
    fontSize: 18,
    color: '#D5D5D5',
  },
})

export default AddButton
