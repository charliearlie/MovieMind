import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	const intent = data.get('intent');

	return json({ intent });
};
