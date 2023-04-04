import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import { Entypo } from '@expo/vector-icons'
import { CreateExerciseList } from '../../components/CreateExercise/CreateExercise'
import { Button } from '../../components/Button/button'
import React from 'react'
export function RegisterScreen() {
	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1, backgroundColor: colors.primary }} showsVerticalScrollIndicator={false}>
				<View style={{ padding: 15 }}>
					<Text style={{ fontSize: 20, color: colors.quaternary, fontFamily: text.poppinsBold }}>
						Cadastrar novo treino
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							paddingVertical: 8,
							backgroundColor: colors.secondary,
							borderRadius: 5,
							marginVertical: 5
						}}
					>
						<Text style={{ fontFamily: text.poppinsBold, fontSize: 15, color: colors.primary }}>
							Adicionar Conjunto de Exercicio
						</Text>
						<Entypo name="plus" size={15} color={colors.primary} style={{ marginHorizontal: 5 }} />
					</View>
				</View>
				<Text style={{ fontFamily: text.poppinsBold, fontSize: 18, marginBottom: 5, marginLeft: 15 }}>Treino A</Text>
				<CreateExerciseList list={[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }]} />
				<Text style={{ fontFamily: text.poppinsBold, fontSize: 18, marginVertical: 5, marginLeft: 15 }}>Treino B</Text>
				<CreateExerciseList list={[{ key: 7 }, { key: 8 }, { key: 9 }, { key: 14 }, { key: 15 }]} />
				<Text style={{ fontFamily: text.poppinsBold, fontSize: 18, marginVertical: 5, marginLeft: 15 }}>Treino C</Text>
				<CreateExerciseList list={[{ key: 7123 }, { key: 3128 }, { key: 419 }, { key: 11234 }, { key: 112455 }]} />
				<Button title="Criar novo treino" />
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
