/* eslint-disable @typescript-eslint/ban-types */
import express, { Request } from 'express'
import { repo } from '@src/repo/repo'
import { genSaltSync, hashSync } from 'bcrypt'
import { emailValidator, lenghtValidator, stringValidator } from '@src/validators/stringValidator'
import { HTTP_CODES } from '@src/helpers/httpCodes'

const router = express.Router()

router.post(
	'/register',
	async (req: Request<{}, { message: string }, { name: string; password: string; email: string }>, res) => {
		const { name, password, email } = req.body

		stringValidator({ name }, { password }, { email })
		emailValidator(email)
		lenghtValidator(name, 3, Infinity)
		lenghtValidator(password, 6, Infinity)

		await repo().user.create({ data: { name, password: hashSync(password, genSaltSync(10)), email } })
		res.status(HTTP_CODES.CREATED).json({ message: `Usuario ${name} criado` })
	}
)

export default router
