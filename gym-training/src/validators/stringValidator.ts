/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
import { errorGenerator } from '@src/errors/errorGenerator'

const illegalChars = /[\'\"\;\-\-]/

export function stringValidator(...strings: { [key: string]: string }[]) {
	strings.forEach((object) => {
		Object.values(object).forEach((string, stringIndex) => {
			if (typeof string !== 'string') {
				errorGenerator(`${Object.keys(object)[stringIndex]} deve ser uma string`, 'BAD_REQUEST')
			}
			if (illegalChars.test(string)) {
				errorGenerator(
					`${Object.keys(object)[stringIndex]} não pode conter os caracteres (' , " , ; , -)`,
					'BAD_REQUEST'
				)
			}
		})
	})
}

export function emailValidator(email: string) {
	const re = /\S+@\S+\.\S+/
	if (!re.test(email)) {
		errorGenerator(` ${email} não é um email válido`, 'BAD_REQUEST')
	}
}

export function lenghtValidator(string: string, min: number, max: number) {
	if (string.length < min || string.length > max) {
		errorGenerator(`${string} deve ter entre ${min} e ${max} caracteres`, 'BAD_REQUEST')
	}
}
