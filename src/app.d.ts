import { Me$result } from '$houdini';
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
		interface PageData {
			me?: Me$result['me'];
		}
		// interface Platform {}

		// Houdini's Session type
		interface Session {
			user?: string;
			token?: string;
			refresh_token?: string;
		}
	}

	type SelectOption = {
		value: string;
		label: string;
	};
}

export {};
