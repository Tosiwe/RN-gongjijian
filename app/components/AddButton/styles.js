import { Easing } from 'react-native'
import {primaryColor} from '../../styles/common'
// Layout constants
export const center = {
	top: 128,
	left: -10,
}

export const topCenter = {
	top: 30,
	left: -10,
}

export const topLeft = {
	top: 60,
	left: -60,
}

export const topRight = {
	top: 60,
	left: 40,
}

// Style constants
export const bigBubbleSize = 40
export const smallBubbleSize = 40
export const bubbleColor = primaryColor

// Animate Constants
export const animateTime = 800
export const easingType = Easing.out(Easing.exp)
export const delay = 200