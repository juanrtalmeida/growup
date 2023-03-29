import { View, Text, TouchableOpacity } from 'react-native'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../assets/styles/colors'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Home } from './home/home'
import { text } from '../assets/styles/text'
import { RegisterScreen } from './register/register'
import { ScheduleScreen } from './schedule/schedule'

export type RootStackParamList = {
	HomeScreen: undefined
	Class: { id: string }
}

function HomeScreen() {
	const stack = createStackNavigator<RootStackParamList>()
	return (
		<stack.Navigator
			screenOptions={{
				cardStyleInterpolator: ({ current, layouts }) => {
					return {
						cardStyle: {
							transform: [
								{
									translateX: current.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [layouts.screen.width, 0]
									})
								}
							]
						}
					}
				}
			}}
		>
			<stack.Screen options={{ headerShown: false }} name="HomeScreen" component={Home} />
			<stack.Screen options={{ headerShown: false }} name="Class" component={Home} />
		</stack.Navigator>
	)
}

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	return (
		<View style={{ flexDirection: 'row' }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						canPreventDefault: true,
						target: route.key,
						type: 'tabPress'
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name)
					}
				}

				const onLongPress = () => {
					navigation.emit({
						target: route.key,
						type: 'tabLongPress'
					})
				}

				return (
					<TouchableOpacity
						activeOpacity={0.8}
						key={index}
						accessibilityRole="button"
						onPress={onPress}
						onLongPress={onLongPress}
						style={{
							alignItems: 'center',
							backgroundColor: '#ffff',
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'center',
							padding: 10
						}}
					>
						{options.tabBarIcon ? options.tabBarIcon({ color: '', focused: isFocused, size: 0 }) : null}
						<Text
							style={{
								fontSize: 12,
								color: isFocused ? colors.secondary : colors.quaternary,
								fontFamily: text.poppinsMedium
							}}
						>
							{route.name}
						</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

const Tab = createBottomTabNavigator()

export function TabRouter() {
	return (
		<Tab.Navigator
			backBehavior="history"
			screenOptions={{ unmountOnBlur: true, tabBarHideOnKeyboard: true }}
			tabBar={(opts) => <MyTabBar {...opts} />}
		>
			<Tab.Screen
				options={{
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarIcon: ({ focused }) => {
						return (
							<View style={{ height: 20, width: 20 }}>
								<Ionicons name="home" size={20} color={focused ? colors.secondary : colors.quaternary} />
							</View>
						)
					}
				}}
				name="Home"
				component={HomeScreen}
			/>
			<Tab.Screen
				options={{
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarIcon: ({ focused }) => {
						return (
							<View style={{ height: 20, width: 20 }}>
								<AntDesign name="calendar" size={20} color={focused ? colors.secondary : colors.quaternary} />
							</View>
						)
					}
				}}
				name="Register"
				component={RegisterScreen}
			/>
			<Tab.Screen
				options={{
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarIcon: ({ focused }) => {
						return (
							<View style={{ height: 20, width: 20 }}>
								<Ionicons name="create-outline" size={20} color={focused ? colors.secondary : colors.quaternary} />
							</View>
						)
					}
				}}
				name="Schedule"
				component={ScheduleScreen}
			/>
		</Tab.Navigator>
	)
}
