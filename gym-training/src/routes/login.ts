/* eslint-disable @typescript-eslint/ban-types */
import { repo } from '@src/repo/repo'
import { stringValidator } from '@src/validators/stringValidator'
import express, { Request } from 'express'
import { compareSync } from 'bcrypt'
import { errorGenerator } from '@src/errors/errorGenerator'
import jwt from 'jsonwebtoken'
import { HTTP_CODES } from '@src/helpers/httpCodes'

const router = express.Router()

router.post('/login', async (req: Request<{}, {}, { email: string; password: string }>, res) => {
	const { email, password } = req.body
	stringValidator({ email }, { password })

	const user = await repo().user.findUnique({ where: { email } })
	if (!user) {
		errorGenerator('Este usuario nao existe', 'NOT_FOUND')
	}

	if (!compareSync(password, user.password)) {
		errorGenerator('Senha incorreta', 'BAD_REQUEST')
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
	res
		.setHeader('Acess-Token', token)
		.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
		.status(HTTP_CODES.OK)
		.send()
})

export default router
