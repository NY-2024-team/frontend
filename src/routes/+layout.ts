import type { LayoutLoad } from './$types';

export const load = (async ({data}) => {
    const {user} = data
    return {user};
}) satisfies LayoutLoad;