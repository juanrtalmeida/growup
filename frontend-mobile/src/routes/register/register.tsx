import { Text, View } from 'react-native'
import { useState } from 'react'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import DropDownPicker from 'react-native-dropdown-picker'
export function RegisterScreen() {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(null)
	return (
		<View style={{ flex: 1, backgroundColor: colors.primary, padding: 15 }}>
			<Text style={{ fontSize: 20, color: colors.quaternary, fontFamily: text.poppinsBold }}>
				Cadastrar novo treino
			</Text>
			<DropDownPicker
				value={value}
				setValue={setValue}
				items={[
					{ label: 'item1', value: 'item1' },
					{ label: 'item2', value: 'item2' }
				]}
				open={open}
				setOpen={setOpen}
			/>
		</View>
	)
}
