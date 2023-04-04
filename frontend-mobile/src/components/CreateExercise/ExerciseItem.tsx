import { Dimensions, Text, View } from 'react-native'
import { text } from '../../assets/styles/text'
import { Input } from '../Input/input'
export function ExerciseItem() {
	const { width } = Dimensions.get('screen')
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', width: width }}>
			<View
				style={{
					width: '95%',
					backgroundColor: '#fff',
					borderRadius: 5,
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2
					},
					shadowOpacity: 0.2,
					shadowRadius: 2,
					elevation: 2,
					paddingHorizontal: 10,
					paddingVertical: 15
				}}
			>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flexBasis: 1, flexGrow: 2 }}>
						<Text style={{ fontFamily: text.poppinsMedium, fontSize: 14 }}>Nome do exercicio</Text>
						<Input onChange={console.log} placeholder="Ex: 12" />
					</View>
					<View style={{ flexBasis: 1, flexGrow: 1.1, marginHorizontal: 5 }}>
						<Text style={{ fontFamily: text.poppinsMedium, fontSize: 14 }}>Repetições</Text>
						<Input onChange={console.log} placeholder="Ex: 12" />
					</View>
					<View style={{ flexBasis: 1, flexGrow: 1.1 }}>
						<Text style={{ fontFamily: text.poppinsMedium, fontSize: 14 }}>Carga</Text>
						<Input onChange={console.log} placeholder="Ex: 2" />
					</View>
				</View>
				<Text style={{ alignSelf: 'flex-start', fontFamily: text.poppinsMedium, marginVertical: 5 }}>Observacao</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						width: '100%'
					}}
				>
					<Input onChange={console.log} placeholder="Obs" />
				</View>
			</View>
		</View>
	)
}
