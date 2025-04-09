import { db } from "$lib/server/db";
import { poll } from "$lib/server/db/schema";
import type { Actions } from "./$types";

export const actions = {
	createPoll: async({request}) => {
		const data = await request.formData();
		const question = data.get("question") as string;

		await db.insert(poll).values({message: question});
	}
} satisfies Actions;

