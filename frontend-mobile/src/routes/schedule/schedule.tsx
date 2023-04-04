import { useCallback, useMemo, useRef, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
export function ScheduleScreen() {
	const [selected, setSelected] = useState(0)
	const snapPoints = useMemo(() => ['25%', '50%'], [])
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])
	return (
		<View style={{ flex: 1, backgroundColor: colors.primary, padding: 15 }}>
			<Text style={{ color: colors.secondary, fontFamily: text.poppinsBold, fontSize: 20 }}>Agenda</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				{[...Array(4)].map((_, index) => (
					<TouchableOpacity
						activeOpacity={0.7}
						key={index}
						style={[styles.pill, index === selected && styles.selected]}
						onPress={() => setSelected(index)}
					>
						<Text style={[styles.pillText, index === selected && styles.pillTextSelected]}>1ª</Text>
						<Text style={[styles.pillText, index === selected && styles.pillTextSelected]}>S</Text>
					</TouchableOpacity>
				))}
				<View style={styles.container}>
					<Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
					<BottomSheetModal
						backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}
						enableOverDrag
						ref={bottomSheetModalRef}
						index={1}
						snapPoints={[200, 500]}
						onChange={handleSheetChanges}
					>
						<View style={styles.contentContainer}>
							<Text>Awesome 🎉</Text>
							<Button title="dismiss" onPress={() => bottomSheetModalRef.current?.close()} />
						</View>
					</BottomSheetModal>
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
		borderColor: colors.opacity,
		paddingVertical: 15,
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%',
		backgroundColor: colors.primary
	},
	pill: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginHorizontal: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 3,
			height: 3
		},
		elevation: 2,
		shadowOpacity: 0.8,
		shadowRadius: 2,
		backgroundColor: colors.primary,
		borderRadius: 20
	},
	selected: {
		backgroundColor: colors.secondary,
		color: colors.primary,
		borderRadius: 20
	},
	pillText: {
		fontFamily: text.poppinsBold,
		fontSize: 16
	},
	pillTextSelected: {
		color: colors.primary
	},
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		backgroundColor: 'grey'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	}
})
