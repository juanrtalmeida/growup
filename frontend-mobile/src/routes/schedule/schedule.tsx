import { AntDesign } from '@expo/vector-icons'
import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
export function ScheduleScreen() {
	return (
		<View style={{ flex: 1, backgroundColor: colors.primary, padding: 15 }}>
			<Text style={{ color: colors.secondary, fontFamily: text.poppinsBold, fontSize: 20 }}>Agenda</Text>
			<View style={{ borderColor: colors.quaternary, borderRadius: 5, flexDirection: 'row', marginBottom: 10 }}>
				<View
					style={{
						...styles.leftSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.rightSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
			</View>
			<View style={{ borderColor: colors.quaternary, borderRadius: 5, flexDirection: 'row', marginBottom: 10 }}>
				<View
					style={{
						...styles.leftSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.rightSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
			</View>
			<View style={{ borderColor: colors.quaternary, borderRadius: 5, flexDirection: 'row', marginBottom: 10 }}>
				<View
					style={{
						...styles.leftSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.rightSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
			</View>
			<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
				<AntDesign name="caretup" size={24} color={colors.green} style={{ paddingHorizontal: 5 }} />
				<Text style={{ fontSize: 16, fontFamily: text.poppinsMedium }}>Reps</Text>
			</View>
			<View style={{ borderColor: colors.quaternary, borderRadius: 5, flexDirection: 'row', marginBottom: 10 }}>
				<View
					style={{
						...styles.leftSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.centerSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
				<View
					style={{
						...styles.rightSpace,
						...styles.space
					}}
				>
					<Text style={{ fontFamily: text.poppinsBold, fontSize: 20 }}>12/10</Text>
				</View>
			</View>
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
