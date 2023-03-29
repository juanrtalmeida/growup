import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import { colors } from '../../assets/styles/colors'
import { RootStackParamList } from './login_or_register'
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from '../../components/Button/button'
import { text as TextConst } from '../../assets/styles/text'
import { useApi } from '../../hooks/useApi'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useContext, useState } from 'react'
import { TokenContext } from '../../contexts/token'

export function Choose() {
	const [form, setForm] = useState({ email: '', password: '' })
	const [isLoading, setIsLoading] = useState(false)
	const { setHasToken } = useContext(TokenContext)

	async function handleLogin() {
		setIsLoading(true)
		try {
			const { headers } = await useApi().login(form.email, form.password)
			const token = headers['acess-token']
			await AsyncStorage.setItem('token', token)
			setHasToken(true)
		} catch (err) {
			setIsLoading(false)
		}
	}

	const isValidForm = () => {
		return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email) && form.password.length > 6
	}

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
	return (
		<View
			style={{
				backgroundColor: colors.primary,
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<View style={{ width: '80%', alignItems: 'center' }}>
				<Text style={styles.welcomeText}>Seja bem vindo de volta</Text>
				<View style={styles.inputView}>
					<MaterialCommunityIcons
						name="email-outline"
						size={24}
						color={colors.quaternary}
						style={{ paddingLeft: 10 }}
					/>
					<TextInput
						onChange={(e) => setForm({ ...form, email: e.nativeEvent.text })}
						cursorColor={colors.secondary}
						selectionColor={colors.secondary}
						autoCorrect={false}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
						autoComplete="email"
						placeholder="Email"
					/>
				</View>
				<View style={styles.inputView}>
					<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						onChange={(e) => setForm({ ...form, password: e.nativeEvent.text })}
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
						autoComplete="password"
						placeholder="Senha"
						secureTextEntry
					/>
				</View>
				<Button
					isDisabled={!isValidForm()}
					isLoading={isLoading}
					onPress={handleLogin}
					style={{ marginVertical: 30, backgroundColor: colors.secondary }}
					title="Login"
				/>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontFamily: TextConst.montserratMedium, color: 'white' }}>Ainda nao tem cadastro? </Text>
					<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>
						<Text style={{ fontFamily: TextConst.montserratBold, color: colors.secondary }}>Crie sua conta</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	welcomeText: {
		fontFamily: TextConst.montserratBold,
		fontSize: 30,
		color: colors.secondary
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
	}
})
