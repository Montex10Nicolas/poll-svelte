import { db } from "$lib/server/db";
import { poll } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const latestPoll = await db
    .select()
    .from(poll)
    .orderBy(sql`${poll.createdAt} desc`);
  return {
    latestPoll: latestPoll,
  };
};

export const actions = {
  createPoll: async ({ request }) => {
    const data = await request.formData();
    const question = data.get("question") as string;

    await db.insert(poll).values({ message: question });
  },
} satisfies Actions;
