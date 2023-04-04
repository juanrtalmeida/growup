import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator'
import { colors } from '../../assets/styles/colors'
import { useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Button } from '../../components/Button/button'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
export function ClockScreen() {
	const [time, setTime] = useState(0)
	const clickRef = useRef<ProgressRef>(null)
	console.log(time)
	return (
		<View style={{ backgroundColor: colors.primary, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<CircularProgress
				ref={clickRef}
				value={time}
				maxValue={time}
				radius={120}
				initialValue={0}
				progressValueColor={colors.secondary}
				activeStrokeColor={colors.secondary}
				activeStrokeWidth={15}
				inActiveStrokeWidth={15}
				duration={1000 * time}
				startInPausedState
			/>
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: colors.secondary,
					borderRadius: 5,
					padding: 10,
					justifyContent: 'space-around',
					width: '50%'
				}}
			>
				<TouchableOpacity
					onPress={() => {
						clickRef.current?.play()
						impactAsync(ImpactFeedbackStyle.Light)
					}}
				>
					<Entypo name="controller-play" size={24} color={colors.primary} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						clickRef.current?.pause()
						impactAsync(ImpactFeedbackStyle.Light)
					}}
				>
					<AntDesign name="pause" size={24} color={colors.primary} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						clickRef.current?.reAnimate()
						impactAsync(ImpactFeedbackStyle.Light)
					}}
				>
					<MaterialCommunityIcons name="restart" size={24} color={colors.primary} />
				</TouchableOpacity>
			</View>
			<View style={{ margin: 5 }}>
				<Button title="Add 1 min" onPress={() => setTime(time + 60)} />
			</View>
			<View style={{ margin: 5 }}>
				<Button title="Add 10 segundos" onPress={() => setTime(time + 10)} />
			</View>
			<View style={{ margin: 5 }}>
				<Button title="Add 30 segunods" onPress={() => setTime(time + 30)} />
			</View>
		</View>
	)
}
