import { HTTP_CODES } from '@src/helpers/httpCodes'

class ErrorGenerator extends Error {
	code: number

	constructor(message: string, status: number) {
		super(message)
		this.code = status
	}
}

type ERROR_CODES = keyof typeof HTTP_CODES

export function errorGenerator(message: string, code: ERROR_CODES) {
	throw new ErrorGenerator(message, HTTP_CODES[code])
}
