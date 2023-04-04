import { useRef } from 'react'
import { Animated, Dimensions, FlatList, Text, View } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import { Dots } from '../slider/dots'
import { ExerciseItem } from './ExerciseItem'
export function CreateExerciseList({ list }: { list: any }) {
	const scrollX = useRef(new Animated.Value(0)).current
	const flatRef = useRef<FlatList>(null)

	function scrollTo(index: number) {
		flatRef.current?.scrollToIndex({ index, animated: true })
	}
	return (
		<View>
			<FlatList
				style={{ width: '100%' }}
				data={[...list, { key: 'add' }]}
				renderItem={({ index, item }) => (index === list.length ? <AddExercise /> : <ExerciseItem item={item} />)}
				horizontal
				pagingEnabled
				snapToAlignment="center"
				showsHorizontalScrollIndicator={false}
				onScroll={(event) => {
					Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })(event)
				}}
				ref={flatRef}
			/>
			<Dots scrollTo={scrollTo} items={list} scrollX={scrollX} />
		</View>
	)
}

export function AddExercise() {
	return (
		<View
			style={{
				width: Dimensions.get('screen').width,
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<View
				style={{
					flex: 1,
					width: '95%',
					borderRadius: 5,
					borderWidth: 3,
					borderColor: colors.secondary,
					alignItems: 'center',
					justifyContent: 'center',
					borderStyle: 'dashed'
				}}
			>
				<Text style={{ color: colors.secondary, fontSize: 20, fontFamily: text.poppinsBoldItalic }}>
					Adicionar exercicio
				</Text>
			</View>
		</View>
	)
}
