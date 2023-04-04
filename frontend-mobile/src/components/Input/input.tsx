import { Ionicons } from '@expo/vector-icons'
import { TextInput, View } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
export function Input({
	iconed,
	placeholder,
	value,
	onChange
}: {
	iconed?: boolean
	placeholder: string
	value?: string
	onChange: (value: string) => void
}) {
	return (
		<View
			style={{
				backgroundColor: colors.primary,
				borderRadius: 10,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'row'
			}}
		>
			{iconed ? <Ionicons name="ios-search" size={24} color={colors.secondary} /> : null}
			<TextInput
				value={value}
				onChangeText={onChange}
				cursorColor={colors.secondary}
				selectionColor={colors.secondary}
				autoCorrect={false}
				style={{
					width: '100%',
					paddingVertical: 10,
					paddingLeft: 10,
					fontFamily: text.montserratMedium,
					color: colors.quinary
				}}
				placeholder={placeholder}
				placeholderTextColor={colors.quaternary}
			/>
		</View>
	)
}
