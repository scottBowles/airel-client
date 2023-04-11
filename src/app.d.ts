// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: string;
			token?: string;
			refresh_token?: string;
		}
		// interface PageData {}
		// interface Platform {}

		// Houdini's Session type
		interface Session {
			token?: string;
		}
	}
}

export {};
