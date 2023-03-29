/* eslint-disable @typescript-eslint/ban-types */
import { handleTrainCreation, TrainCreationInput } from '@src/controllers/trainCreation'
import { errorGenerator } from '@src/errors/errorGenerator'
import { repo } from '@src/repo/repo'
import { stringValidator } from '@src/validators/stringValidator'
import express, { Request } from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

type TokenDecoded = {
	id: string
	iat: number
	exp: number
}

interface CookiedRequest<P, Res, Req> extends Request<P, Res, Req> {
	cookies: {
		token: string
	}
}

router.post('/train', async (req: CookiedRequest<{}, { message: string }, TrainCreationInput>, res) => {
	const { exercises, startingReps, startingsSets, weeks, trainName } = req.body
	const { token } = req.cookies

	if (!token) {
		errorGenerator('Voce nao esta logado', 'UNAUTHORIZED')
	}

	stringValidator({ trainName })
	exercises.forEach((exercise) => {
		stringValidator({ name: exercise.name, description: exercise.description, id: exercise.id ? exercise.id : '' })
	})

	const tokenInfos = jwt.decode(token) as TokenDecoded
	await handleTrainCreation({ exercises, startingReps, startingsSets, weeks, trainName, token: tokenInfos.id })
	res.json({ message: 'ok' })
})

router.get('/train', async (req: CookiedRequest<{}, any, {}>, res) => {
	const tokenInfos = jwt.decode(req.cookies.token) as TokenDecoded
	const train = await repo().train.findFirst({
		where: { end: null, userid: tokenInfos.id },
		orderBy: { start: 'desc' },
		select: {
			days: true,
			exercises: {
				select: {
					name: true,
					description: true,
					id: true,
					exerciseDetails: { select: { reps: true, series: true, weight: true } }
				}
			},
			start: true,
			end: true,
			id: true,
			name: true,
			trainWeeks: {
				select: {
					weekChange: { select: { changeType: true, changeValue: true } },
					end: true,
					start: true,
					id: true,
					days: true
				}
			}
		}
	})
	res.json({ train })
})

router.put('/train/checkin', async (req: CookiedRequest<{}, { message: string }, { weekId: string }>, res) => {
	const tokenInfos = jwt.decode(req.cookies.token) as TokenDecoded
	const { weekId } = req.body
	const train = await repo().train.findFirst({
		orderBy: { start: 'desc' },
		where: { end: null, userid: tokenInfos.id },
		select: { trainWeeks: true, id: true }
	})

	const actualWeek = train.trainWeeks.find((week) => week.id === weekId)
	await repo().train.update({
		where: { id: train.id },
		data: {
			days: { increment: 1 },
			trainWeeks: {
				update: {
					where: { id: weekId },
					data: {
						start: actualWeek.start ? actualWeek.start : new Date(),
						days: { increment: 1 },
						end: actualWeek.days === 4 ? new Date() : null
					}
				}
			}
		}
	})
	res.json({ message: 'ok' })
})

router.get('/train/all', async (req: CookiedRequest<{}, any, {}>, res) => {
	const tokenInfos = jwt.decode(req.cookies.token) as TokenDecoded
	const train = await repo().train.findMany({
		where: { userid: tokenInfos.id },
		orderBy: { start: 'desc' },
		select: {
			days: true,
			exercises: {
				select: {
					name: true,
					description: true,
					id: true,
					exerciseDetails: { select: { reps: true, series: true, weight: true } }
				}
			},
			start: true,
			end: true,
			id: true,
			name: true,
			trainWeeks: {
				select: {
					weekChange: { select: { changeType: true, changeValue: true } },
					end: true,
					start: true,
					id: true,
					days: true
				}
			}
		}
	})

	res.json({ train })
})

export default router
