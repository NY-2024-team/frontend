import { fail, type Actions } from '@sveltejs/kit';
import { backendService } from '$lib/shared/api/backend-service';

export const actions = {
    login: async ({request, cookies}) => {
        const formData = await request.formData()
        const username = formData.get('username')
        const password = formData.get('password')
        if(!username || !password) return fail(400, {error: 'Missed required fields'})

        const authResponse = await backendService.authorization.login(username.toString(), password.toString())
        const token = authResponse.data?.token
        if(token) {
            cookies.set('auth', token)
        }
        return authResponse.data
    }
} satisfies Actions