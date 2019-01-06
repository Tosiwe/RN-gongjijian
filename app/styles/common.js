import { Dimensions, Platform, NativeModules } from 'react-native'

const { StatusBarManager } = NativeModules

// 屏幕宽高
export const { width: screenWidth } = Dimensions.get('window')
export const { height: screenHeight } = Dimensions.get('window')

// 蓝色
export const primaryColor = '#FF7720'

// 状态栏高度
export const statusBarHeight =
  Platform.OS === 'ios' ? 40 : StatusBarManager.HEIGHT

// 一般图标大小
export const iconSize = 24
