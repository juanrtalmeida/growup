import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SafeAreaView, StyleSheet, View, Platform, StatusBar } from 'react-native'
import { colors } from './src/assets/styles/colors'
import { Slider } from './src/components/slider/slider'
import { FirstTimeUserContext } from './src/contexts/first_time'
import { TokenContext } from './src/contexts/token'
import { LoginOrRegisterRoute } from './src/routes/login/login_or_register'
import Lottie from 'lottie-react-native'

import { TabRouter } from './src/routes/router'

export default function App() {
	const [isFirstTime, setIsFirstTime] = useState(true)
	const [hasToken, setHasToken] = useState(false)
	const [isLoadingApp, setIsLoadingApp] = useState(true)
	const lottieRef = useRef<Lottie>(null)
	useEffect(() => {
		async function loadStorageData() {
			try {
				const isFirstTimeLocal = await AsyncStorage.getItem('firstTime')
				const token = await AsyncStorage.getItem('token')
				if (token) {
					setHasToken(true)
				}
				if (isFirstTimeLocal === 'false') {
					setIsFirstTime(false)
				}
			} catch (err) {
				/* empty */
			}
		}
		loadStorageData()
	}, [])

	const [fontsLoaded] = useFonts({
		'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
		'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
		'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
		'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
		'Poppins-BoldItalic': require('./src/assets/fonts/Poppins-BoldItalic.ttf')
	})

	if (isLoadingApp) {
		return (
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<Lottie
					ref={lottieRef}
					onAnimationFinish={() => {
						if (fontsLoaded) {
							setIsLoadingApp(false)
						} else {
							lottieRef.current?.play()
						}
					}}
					source={require('./src/assets/animations/85699-loading-15.json')}
					autoPlay
					loop={false}
				/>
			</View>
		)
	}

	if (isFirstTime) {
		return (
			<FirstTimeUserContext.Provider value={{ isFirstTime, setIsFirstTime }}>
				<SafeAreaView
					style={{
						backgroundColor: colors.primary,
						flex: 1,
						paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
					}}
				>
					<Slider />
				</SafeAreaView>
			</FirstTimeUserContext.Provider>
		)
	}

	if (!hasToken) {
		return (
			<TokenContext.Provider value={{ hasToken, setHasToken }}>
				<View style={styles.container}>
					<NavigationContainer
						theme={{
							colors: {
								background: colors.primary,
								border: '',
								card: '',
								notification: '',
								primary: '',
								text: ''
							},
							dark: true
						}}
					>
						<LoginOrRegisterRoute />
					</NavigationContainer>
				</View>
			</TokenContext.Provider>
		)
	}
	return (
		<TokenContext.Provider value={{ hasToken, setHasToken }}>
			<View style={styles.container}>
				<NavigationContainer>
					<TabRouter />
				</NavigationContainer>
			</View>
		</TokenContext.Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: colors.primary
	}
})
