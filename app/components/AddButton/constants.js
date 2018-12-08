import { Easing } from 'react-native'

// Layout constants
export const center = {
	top: 8,
	left: 10,
}

export const topCenter = {
	top: -90,
	left: 10,
}

export const topLeft = {
	top: -60,
	left: -40,
}

export const topRight = {
	top: -60,
	left: 60,
}

// Style constants
export const bigBubbleSize = 60
export const smallBubbleSize = 40
export const bubbleColor = 'rgb(40, 155, 238)'

// Animate Constants
export const animateTime = 800
export const easingType = Easing.out(Easing.exp)
export const delay = 200