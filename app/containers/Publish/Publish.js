// native
import React, { Component } from "react"
import {
  TouchableOpacity,
  Animated,
  Easing,
  View,
  StyleSheet,
  Text,
  Dimensions
} from "react-native"
import { connect } from "react-redux"

import { NavigationActions } from "react-navigation"

import FAwesomeIcon from "react-native-vector-icons/FontAwesome"


// constants
import {
  center,
  topLeft,
  topRight,
  bigBubbleSize,
  smallBubbleSize,
  bubbleColor,
  animateTime,
  easingType,
  delay
} from "./constants"

@connect(({ app }) => ({ ...app }))
class AddButton extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.topLeftValue = new Animated.Value(0)
    this.topCenterValue = new Animated.Value(0)
    this.topRightValue = new Animated.Value(0)
  }

  componentDidMount = () => {
    this.animate(1)
  };

  handleAddButtonPress = () => {
    this.animateReverse(0)
    this.props.dispatch(NavigationActions.back())
  };

  animate = toValue => {
    Animated.stagger(delay, [
      Animated.parallel([
        Animated.timing(this.animatedValue, {
          toValue,
          duration: animateTime,
          easing: Easing.exp
        }),
        Animated.timing(this.topLeftValue, {
          toValue,
          duration: animateTime,
          easing: easingType
        })
      ]),
      Animated.timing(this.topRightValue, {
        toValue,
        duration: animateTime,
        easing: easingType
      })
    ]).start()
  };

  animateReverse = toValue => {
    Animated.stagger(delay, [
      Animated.timing(this.topRightValue, {
        toValue,
        duration: animateTime,
        easing: easingType
      }),
      Animated.timing(this.topCenterValue, {
        toValue,
        duration: animateTime,
        easing: easingType
      }),
      Animated.parallel([
        Animated.timing(this.animatedValue, {
          toValue,
          duration: animateTime,
          easing: easingType
        }),
        Animated.timing(this.topLeftValue, {
          toValue,
          duration: animateTime,
          easing: easingType
        })
      ])
    ]).start()
  };

  render() {
    const springValue = Animated.add(
      Animated.add(this.topLeftValue, this.topRightValue),
      this.topCenterValue
    )

    const { width, height } = Dimensions.get("window")
    return (
      <View style={{ backgroundColor: "rgba(255, 255, 255, 0)",opacity:0, width, height, }}>
        <View style={{ position: "absolute", bottom: 0 }}>
          <Animated.View
            style={[
              style.bigBubble,
              {
                transform: [
                  {
                    rotateZ: springValue.interpolate({
                      inputRange: [0, 1, 2, 3],
                      outputRange: ["-45deg", "-45deg", "0deg", "45deg"]
                    })
                  },
                  {
                    scaleY: springValue.interpolate({
                      inputRange: [0, 0.65, 1, 1.65, 2, 2.65, 3],
                      outputRange: [1, 1.1, 1, 1.1, 1, 1.1, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <View
            // onStartShouldSetResponder={evt => {
            // 	console.log("onStartShouldSetResponder")
            // }}
            // onMoveShouldSetResponder={evt=>{
            // 	console.log("onMoveShouldSetResponder")
            // }}
            // onResponderGrant={evt=>{
            // 	console.log("onResponderGrant")
            // }}
            // onResponderReject={evt=>{
            // 	console.log("onResponderReject")
            // }}
            // onResponderMove={evt=>{
            // 	console.log("onResponderMove")
            // }}
            // onResponderRelease={evt=>{
            // 	console.log("onResponderRelease")
            // }}
            // onResponderTerminationRequest={evt=>{
            // 	console.log("onResponderTerminationRequest")
            // }}
            // onResponderTerminate={evt=>{
            // 	console.log("onResponderTerminate")
            // }}
            >
              <TouchableOpacity
                hitSlop={{
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: 20
                }}
                onPress={this.handleAddButtonPress}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotateZ: springValue.interpolate({
                          inputRange: [0, 1, 2, 3],
                          outputRange: ["45deg", "45deg", "45deg", "0deg"]
                        })
                      }
                    ]
                  }}
                >
                  <FAwesomeIcon name="plus" size={35} color="#FFF" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              style.smallBubble,
              {
                position: "absolute",
                transform: [
                  {
                    translateX: this.topLeftValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [center.left, topLeft.left]
                    })
                  },
                  {
                    translateY: this.topLeftValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [center.top, topLeft.top]
                    })
                  },
                  {
                    rotateZ: this.topLeftValue.interpolate({
                      inputRange: [0, 0.6, 1],
                      outputRange: ["-90deg", "-45deg", "0deg"]
                    })
                  },
                  {
                    scaleY: this.topLeftValue.interpolate({
                      inputRange: [0, 0.8, 0.9, 1],
                      outputRange: [1, 1.5, 1.5, 1]
                    })
                  }
                ],
                opacity: this.topLeftValue,
                zIndex: -1
              }
            ]}
          >
            <Text style={style.smallText}>发布需求</Text>
          </Animated.View>
          <Animated.View
            style={[
              style.smallBubble,
              {
                position: "absolute",
                transform: [
                  {
                    translateX: this.topRightValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [center.left, topRight.left]
                    })
                  },
                  {
                    translateY: this.topRightValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [center.top, topRight.top]
                    })
                  },
                  {
                    rotateZ: this.topRightValue.interpolate({
                      inputRange: [0, 0.6, 1],
                      outputRange: ["90deg", "45deg", "0deg"]
                    })
                  },
                  {
                    scaleY: this.topRightValue.interpolate({
                      inputRange: [0, 0.8, 0.9, 1],
                      outputRange: [1, 1.5, 1.5, 1]
                    })
                  }
                ],
                opacity: this.topRightValue,
                zIndex: -1
              }
            ]}
          >
            <Text style={style.smallText}>发布信息</Text>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  bigBubble: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bubbleColor,
    height: bigBubbleSize,
    width: bigBubbleSize,
    borderRadius: bigBubbleSize / 2,
    top: -15
  },
  smallBubble: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bubbleColor,
    height: smallBubbleSize,
    width: smallBubbleSize * 2,
    borderRadius: smallBubbleSize / 2
  },
  smallText: {
    color: "#fff"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

export default AddButton
