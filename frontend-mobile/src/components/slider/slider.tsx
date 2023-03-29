import { useRef } from 'react'
import { Animated, FlatList, View, Text } from 'react-native'
import image from '../../assets/images/first_time_1.png'
import firstImage from '../../assets/images/samuel.png'
import { Dots } from './dots'
import { SlideItem } from './slide_item'
export function Slider() {
	const data = [
		{
			id: 1,
			image: firstImage,
			subtitle: 'Aqui voce pode acompanhar seu treino',
			title: <Text>Bem vindo</Text>
		},
		{
			id: 2,
			image: image,
			subtitle: 'Acompanhe as noticias, itens disponiveis na loja e mais!',
			title: 'Seu companheiro de treino'
		},
		{
			id: 3,
			image: image,
			isLast: true,
			subtitle: 'e comece a ter seu treino na palma da sua mao!',
			title: 'Crie sua conta'
		}
	]
	const scrollX = useRef(new Animated.Value(0)).current
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<SlideItem image={item.image} title={item.title} subtitle={item.subtitle} isLast={item.isLast || false} />
				)}
				horizontal
				pagingEnabled
				snapToAlignment="center"
				decelerationRate={0.8}
				showsHorizontalScrollIndicator={false}
				onScroll={(event) => {
					Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })(event)
				}}
			/>
			<Dots items={data} scrollX={scrollX} />
		</View>
	)
}
