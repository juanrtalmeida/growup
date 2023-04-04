import { ReactNode } from 'react'
import { ImageSourcePropType, TouchableWithoutFeedback, View } from 'react-native'
import { Dimensions, Animated } from 'react-native'
import { colors } from '../../assets/styles/colors'

export function Dots({
	items,
	scrollX,
	scrollTo
}: {
	items: { id: number; image?: ImageSourcePropType; title: ReactNode }[]
	scrollX: Animated.Value
	scrollTo?: (index: number) => void
}) {
	const { width } = Dimensions.get('screen')
	return (
		<View
			style={{
				alignItems: 'center',
				flexDirection: 'row',
				justifyContent: 'center',
				width: '100%',
				margin: 10
			}}
		>
			{items.map((item, index) => {
				const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
				const dotWidth = scrollX.interpolate({ extrapolate: 'clamp', inputRange, outputRange: [15, 30, 15] })
				const background = scrollX.interpolate({
					extrapolate: 'clamp',
					inputRange,
					outputRange: ['#ffff', colors.secondary, '#ffff']
				})
				return (
					<TouchableWithoutFeedback key={item.key} onPress={() => (scrollTo ? scrollTo(index) : '')}>
						<Animated.View
							style={{
								backgroundColor: background,
								borderRadius: 6,
								height: 12,
								marginHorizontal: 5,
								width: dotWidth
							}}
						/>
					</TouchableWithoutFeedback>
				)
			})}
		</View>
	)
}
