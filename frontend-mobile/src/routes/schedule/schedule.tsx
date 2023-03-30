import { AntDesign } from '@expo/vector-icons'
import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
export function ScheduleScreen() {
	const weeks = new Array(4).fill(0)
	const schedule = new Array(20).fill(0)
	return (
		<View style={{ flex: 1, backgroundColor: colors.primary, padding: 15 }}>
			<Text style={{ color: colors.secondary, fontFamily: text.poppinsBold, fontSize: 20 }}>Agenda</Text>
			{weeks.map((item, index) => (
				<>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
						<AntDesign name="up" color={colors.green} size={14} />
						<Text style={{ fontFamily: text.poppinsBold, fontSize: 14 }}>Reps</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						{schedule
							.filter((_, indexis) => {
								return indexis <= (index + 1) * 5 - 1 && indexis >= index * 5
							})
							.map((item, indexis, array) => (
								<View
									key={indexis + Math.random()}
									style={[
										styles.space,
										indexis === 0 && styles.leftSpace,
										indexis === array.length - 1 && styles.rightSpace,
										indexis !== 0 && indexis !== array.length - 1 && styles.centerSpace
									]}
								>
									<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>{item.day}</Text>
								</View>
							))}
					</View>
					<View
						key={index}
						style={{ borderColor: colors.quaternary, borderRadius: 5, marginBottom: 10, flexDirection: 'row' }}
					></View>
				</>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	leftSpace: {
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4,
		borderRightWidth: 1
	},
	centerSpace: {
		borderRightWidth: 1
	},
	rightSpace: {
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		borderRightWidth: 0
	},
	space: {
		borderColor: colors.quaternary,
		paddingVertical: 15,
		backgroundColor: colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%'
	}
})
