import { db } from "$lib/server/db";
import { poll, options } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async function ({ params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return redirect(302, "/");
  }

  const result = await db.select().from(poll).where(eq(poll.id, id));
  if (!result.length) {
    return redirect(302, "/");
  }

  const pollOptions = await db
    .select()
    .from(options)
    .where(eq(options.pollId, id));

  return {
    result: result[0],
    pollOptions,
  };
};

export const actions = {
  createOptions: async ({ request, params }) => {
    if (params.id === undefined) {
      return fail(402, { message: "How did you do it" });
    }
    const pollId = parseInt(params.id);
    const data = await request.formData();
    const opi = data.get("opinion") as string;

    await db.insert(options).values({
      pollId: pollId,
      opinion: opi,
    });
  },
} satisfies Actions;
