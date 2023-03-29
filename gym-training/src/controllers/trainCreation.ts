import { repo } from '@src/repo/repo'

export type TrainCreationInput = {
	exercises: [{ name?: string; startingWeight?: number; description?: string; id?: string }]
	startingReps: number
	startingsSets: number
	weeks: [{ repsAdd: number; setsAddNumber: number; shouldAddWeight: boolean }]
	trainName: string
}

interface TrainCreationFunctionInput extends TrainCreationInput {
	token: string
}

export async function handleTrainCreation({
	exercises,
	startingReps,
	startingsSets,
	trainName,
	weeks,
	token
}: TrainCreationFunctionInput) {
	await repo().train.create({
		data: {
			trainWeeks: {
				create: weeks.map((week) => ({
					weekChange: { create: { changeType: week.shouldAddWeight ? 'weight' : 'reps', changeValue: week.repsAdd } },
					end: null,
					start: undefined
				}))
			},
			exercises: {
				connectOrCreate: exercises.map((exercise) => {
					return {
						where: { id: exercise.id ? exercise.id : '' },
						create: {
							name: exercise.name,
							description: exercise.description,
							exerciseDetails: {
								create: {
									reps: startingReps,
									weight: exercise.startingWeight,
									series: startingsSets
								}
							}
						}
					}
				})
			},
			name: trainName,
			description: 'test',
			user: { connect: { id: token } }
		}
	})
}
