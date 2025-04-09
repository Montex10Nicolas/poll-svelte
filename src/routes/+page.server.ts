import { db } from "$lib/server/db";
import { poll } from "$lib/server/db/schema";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async() => {
	return {
		serverMessage: "Hello I'm server"
	}
}

export const actions = {
	createPoll: async({request}) => {
		const data = await request.formData();
		const question = data.get("question") as string;

		await db.insert(poll).values({message: question});
	}
} satisfies Actions;

