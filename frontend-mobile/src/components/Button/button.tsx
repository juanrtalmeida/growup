/* eslint-disable no-unused-vars */
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import Lottie from 'lottie-react-native'
import loaderYellow from '../../assets/animations/71490-rounding-lines-2-yellow.json'
import loaderBlack from '../../assets/animations/71490-rounding-lines-2-black.json'
import { text as TextConst } from '../../assets/styles/text'
import { colors } from '../../assets/styles/colors'
import { notificationAsync, NotificationFeedbackType } from 'expo-haptics'

type ButtonPropsType = {
	isLoading?: boolean
	onPress?: () => void
	title: string
	style?: ViewStyle
	theme?: keyof typeof BUTTON_THEMES
	isDisabled?: boolean
}

export enum BUTTON_THEMES {
	YELLOW,
	BLACK
}

export function Button({ isLoading, onPress, title, style, theme = 'YELLOW', isDisabled }: ButtonPropsType) {
	return (
		<TouchableOpacity
			disabled={isDisabled}
			activeOpacity={0.9}
			onPress={(e) => {
				if (isDisabled) return
				onPress && onPress(e)
				notificationAsync(NotificationFeedbackType.Error)
			}}
			style={[styles.button, style, !isDisabled && styles[theme], isDisabled && styles.disabledButton]}
		>
			{isLoading ? (
				<Lottie style={{ width: 30 }} autoPlay loop source={theme === 'BLACK' ? loaderYellow : loaderBlack} />
			) : (
				<Text style={styles.text}>{title}</Text>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	text: {
		fontFamily: TextConst.montserratBold,
		color: colors.primary
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 100,
		borderRadius: 6,
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	disabledButton: {
		opacity: 0.5,
		backgroundColor: colors.quaternary,
		color: colors.quinary
	},
	YELLOW: {
		backgroundColor: colors.secondary
	},
	BLACK: {
		backgroundColor: colors.primary,
		color: colors.secondary
	}
})
