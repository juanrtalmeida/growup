import { ErrorRequestHandler } from 'express'

interface ServerError extends Error {
	code?: number
	message: string
}

export const errorHandler: ErrorRequestHandler = (error: ServerError, request, response, _next) => {
	if (error) {
		const status = error.code || 401
		response.status(status).json({ message: error.message })
	}
}
