import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text as TextConst } from '../../assets/styles/text'
import { useState } from 'react'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { TextInputChangeEventData } from 'react-native/Libraries/Components/TextInput/TextInput'
import { Button } from '../../components/Button/button'
import { useApi } from '../../hooks/useApi'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from './login_or_register'

export function Register() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
	const [isLoading, setIsLoading] = useState(false)
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: ''
	})

	async function handleRegister() {
		setIsLoading(true)
		try {
			const fasdf = await useApi().register({
				email: form.email,
				name: form.name,
				password: form.password
			})
			setIsLoading(false)
			navigation.navigate('Choose')
		} catch (err) {
			setIsLoading(false)
			console.log(err)
		}
	}

	const isFormValid = () => {
		return form.name.length > 3 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email) && form.password.length > 6
	}
	function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>, field: string) {
		setForm({ ...form, [field]: e.nativeEvent.text })
	}

	return (
		<View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: 'center' }}>
			<Text style={styles.welcomeText}>
				Prazer em conhece-lo, se <Text style={{ color: colors.secondary }}>registre</Text> conosco!
			</Text>
			<View style={styles.inputView}>
				<MaterialIcons name="email" size={22} color={colors.quaternary} style={{ paddingLeft: 10 }} />
				<TextInput
					onChange={(e) => handleChange(e, 'email')}
					cursorColor={colors.secondary}
					style={{ width: '90%', paddingVertical: 10, paddingLeft: 7, fontFamily: TextConst.montserratMedium }}
					autoComplete="email"
					placeholder="Seu melhor Email"
				/>
			</View>
			<View style={styles.inputView}>
				<Ionicons name="person" size={20} color={colors.quaternary} style={{ paddingLeft: 10 }} />
				<TextInput
					onChange={(e) => handleChange(e, 'name')}
					cursorColor={colors.secondary}
					style={{ width: '90%', paddingVertical: 10, paddingLeft: 7, fontFamily: TextConst.montserratMedium }}
					autoComplete="name"
					placeholder="Seu nome"
				/>
			</View>
			<View
				style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
			></View>
			<View style={styles.inputView}>
				<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
				<TextInput
					onChange={(e) => handleChange(e, 'password')}
					cursorColor={colors.secondary}
					style={{ width: '90%', paddingVertical: 10, paddingLeft: 7, fontFamily: TextConst.montserratMedium }}
					autoComplete="password"
					placeholder="Senha"
					secureTextEntry
				/>
			</View>
			<Button
				onPress={() => handleRegister()}
				isLoading={isLoading}
				isDisabled={!isFormValid()}
				style={{ marginVertical: 15, paddingVertical: 15 }}
				title="Cadastrar"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	welcomeText: {
		fontFamily: TextConst.montserratBold,
		fontSize: 30,
		color: colors.quinary,
		paddingVertical: 30
	},
	inputViewHalf: {
		width: '48%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 10,
		minWidth: 100,
		borderRadius: 10,
		backgroundColor: colors.quinary
	},
	inputView: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 10,
		minWidth: 100,
		borderRadius: 10,
		backgroundColor: colors.quinary
	},
	pickerItem: {
		backgroundColor: colors.quinary
	}
})
