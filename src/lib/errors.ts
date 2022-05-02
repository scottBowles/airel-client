export class LockFailedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'LockFailedError';
	}
}
