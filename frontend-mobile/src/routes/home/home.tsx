import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { Train } from '../../hooks/types/train_infos'
import { PageLoader } from '../../components/PageLoader/page_loader'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from '../../components/Button/button'
export function Home() {
	const { getTrains } = useApi()
	const [loading, setLoading] = useState(true)
	const [trains, setTrains] = useState<Train>()
	const [trainCounter, setTrainConter] = useState<number[]>([])

	async function init() {
		const result = await getTrains()
		setTrains(result.train)
		setLoading(false)
	}
	useEffect(() => {
		init()
	}, [])

	if (loading || !trains) {
		return (
			<View style={{ flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
				<PageLoader />
			</View>
		)
	}

	const auxArray = trains.exercises.map((_, index) => index)
	return (
		<View style={{ flex: 1, backgroundColor: colors.primary, padding: 15 }}>
			<Text style={{ fontFamily: text.poppins, fontSize: 26 }}>
				Bom dia, <Text style={{ color: colors.secondary, fontFamily: text.poppinsBoldItalic, fontSize: 26 }}>Juan</Text>
			</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text style={{ fontFamily: text.poppins, fontSize: 14, color: colors.quaternary }}>Seu treino de hoje:</Text>
				<Text style={{ fontFamily: text.poppinsBold, fontSize: 14, color: colors.quaternary }}>Pernas</Text>
			</View>
			<View style={{ flex: 1 }}>
				{trains.exercises.map((exercise, index) => (
					<View
						style={{
							backgroundColor: '#ffff',
							marginVertical: 5,
							borderRadius: 5,
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 1
							},
							shadowOpacity: 0.2,
							shadowRadius: 1.41,

							elevation: 2
						}}
						key={exercise.id}
					>
						<View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<View>
								<Text style={{ fontSize: 16, fontFamily: text.poppinsBoldItalic }}>{exercise.name}</Text>
								<View>
									<View>
										<Text style={{ marginRight: 10, fontFamily: text.poppins, fontSize: 13 }}>
											Repetições: {exercise.exerciseDetails.reps}
										</Text>
										<Text style={{ fontFamily: text.poppins, fontSize: 13 }}>
											Sets: {exercise.exerciseDetails.series}
										</Text>
									</View>
								</View>
							</View>
							<TouchableOpacity
								activeOpacity={0.5}
								style={{ padding: 10 }}
								onPress={() => {
									if (trainCounter.includes(index)) {
										setTrainConter(trainCounter.filter((item) => item !== index))
										return
									}
									setTrainConter([...trainCounter, index])
								}}
							>
								<View
									style={{
										borderRadius: 5,
										borderWidth: 3,
										borderColor: colors.secondary,
										width: 20,
										height: 20,
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									{trainCounter.includes(index) && <FontAwesome name="check" size={14} color={colors.secondary} />}
								</View>
							</TouchableOpacity>
						</View>
					</View>
				))}
				<Button
					isDisabled={
						!auxArray.every((item) => {
							return trainCounter.includes(item)
						})
					}
					title="Treino concluido"
					theme="YELLOW"
					style={{ marginTop: 10 }}
				/>
			</View>
		</View>
	)
}
