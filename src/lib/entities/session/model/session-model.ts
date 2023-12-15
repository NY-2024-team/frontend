import type { User } from '$lib/shared/api/authorization'
import {writable} from 'svelte/store'

export const sessionModel = writable<User | null>(null);