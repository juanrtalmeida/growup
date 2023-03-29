import { userRegister } from './types/user_register'
import { useAxios } from './useAxios'
export function useApi() {
	const { postData, getData } = useAxios('http://192.168.100.7:4005/api')

	async function login(email: string, password: string) {
		const { headers } = await postData('/login', { email, password })
		return { headers }
	}

	async function register(registerObject: userRegister) {
		try {
			const { headers } = await postData('/register', registerObject)
			return { headers }
		} catch (e) {
			throw new Error('Erro ao registrar usuário')
		}
	}

	async function getTrains() {
		try {
			const { data } = await getData('/train')
			return data
		} catch (e) {
			throw new Error('Erro ao buscar trens')
		}
	}

	return { login, register, getTrains }
}
