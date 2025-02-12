import { writable } from "svelte/store";

// Estado del loader (inicialmente en false)
export const loader = writable(false);
