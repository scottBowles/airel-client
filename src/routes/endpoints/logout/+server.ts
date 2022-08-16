export async function POST() {
	const headers = { 'set-cookie': 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT' };
	const body = { ok: true };
	return new Response(JSON.stringify(body), {
		status: 200,
		headers
	});
}
