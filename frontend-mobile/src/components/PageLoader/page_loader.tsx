import { View } from 'react-native'
import { colors } from '../../assets/styles/colors'

import Lottie from 'lottie-react-native'
import loader from '../../assets/animations/71490-rounding-lines-2-yellow.json'

export function PageLoader() {
	return (
		<View style={{ backgroundColor: colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Lottie style={{ width: 60 }} source={loader} autoPlay loop />
		</View>
	)
}
