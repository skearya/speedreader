import { writable } from 'svelte/store'

const stored = localStorage.wpm

export const wpm = writable(stored || 400)

wpm.subscribe((value) => localStorage.wpm = value)

