import { View, Image, Text, ImageSourcePropType } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
export function News({
	image,
	title,
	description
}: {
	image: ImageSourcePropType
	title: string
	description: string
}) {
	return (
		<View style={{ paddingTop: 15 }}>
			<View
				style={{
					backgroundColor: colors.quaternary,
					height: 110,
					padding: 5,
					borderRadius: 7,
					flexDirection: 'row'
				}}
			>
				<Image source={image} style={{ width: 100, height: 100, borderRadius: 5 }} />
				<View>
					<Text
						style={{
							fontFamily: text.montserratBold,
							color: 'white',
							fontSize: 20,
							paddingLeft: 10,
							maxWidth: 200
						}}
					>
						{title.slice(0, 30)}
						{title.length > 30 ? '...' : ''}
					</Text>
					<Text style={{ fontFamily: text.montserrat, color: 'white', fontSize: 12, width: 250, paddingLeft: 10 }}>
						{description.slice(0, 130)}
						{description.length > 130 ? '...' : ''}
					</Text>
				</View>
			</View>
		</View>
	)
}
