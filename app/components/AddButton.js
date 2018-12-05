// native
import React, { Component } from "react"
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing
} from "react-native"
import FAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { primaryColor } from "../styles/theme"

const animateTime = 200
const easingType = "ease"

class AddButton extends Component {
  constructor(props) {
    super(props)
    this.topLeftValue = new Animated.Value(0) // for the small button
    this.topCenterValue = new Animated.Value(0)
    this.topRightValue = new Animated.Value(0)
    this.animatedValue = new Animated.Value(0) // for the add button
    this.springValue = new Animated.Value(0)
  }

  handleAddButtonPress = () => {
    this.animate(1)
  };

  animate = toValue => {
    Animated.stagger(200, [
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
      Animated.timing(this.topLeftValue, {
        toValue,
        duration: animateTime,
        easing: easingType
      }),
      Animated.timing(this.topLeftValue, {
        toValue,
        duration: animateTime,
        easing: easingType
      })
    ]).start()
  };

  render() {
    return (
      <View>
        <Animated.View
          style={[
            style.bigBubble,
            {
              transform: [
                {
                  rotateZ: this.springValue.interpolate({
                    inputRange: [0, 1, 2, 3],
                    outputRange: ["-45deg", "-45deg", "0deg", "45deg"]
                  })
                },
                {
                  scaleY: this.springValue.interpolate({
                    inputRange: [0, 0.65, 1, 1.65, 2, 2.65, 3],
                    outputRange: [1, 1.1, 1, 1.1, 1, 1.1, 1]
                  })
                }
              ]
            }
          ]}
        >
          <TouchableOpacity
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20
            }}
            onPress={this.handleAddButtonPress}

          >
            <Animated.View
              style={{
                transform: [
                  {
                    rotateZ: this.springValue.interpolate({
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
        </Animated.View>
        {/* <TouchableOpacity
          style={style.bigBubble}
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
        }}
        onPress={this.handleAddButtonPress}
        >
          <FAwesomeIcon name="plus" size={35} color="#FFF" />
        </TouchableOpacity> */}
      </View>
    )
  }
}
const style = StyleSheet.create({
  bigBubble: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor,
    height: 50,
    width: 50,
    left: -25,
    borderRadius: 50 / 2,
    top: -10,
    position: "absolute"
  }
})
export default AddButton
