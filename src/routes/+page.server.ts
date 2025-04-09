import { db } from "$lib/server/db";
import { poll } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async() => {
	const lastFiveEntries = await db.select().from(poll).limit(5).orderBy(sql`${poll.createdAt} desc`);
	return {
		lastFiveEntries
	}
}

export const actions = {
	createPoll: async({request}) => {
		const data = await request.formData();
		const question = data.get("question") as string;

		await db.insert(poll).values({message: question});
	}
} satisfies Actions;

