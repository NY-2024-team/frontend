import { backendService } from '$lib/shared/api/backend-service';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authCookie = event.cookies.get('auth');
    try {
        const user = await backendService.authorization.check(authCookie);
        event.locals.user = user.data ?? null;
    }
    catch (error) {
        console.error(error)
    }

    const response = await resolve(event);
    return response;
};