import { db } from "$lib/server/db";
import { poll, options } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";
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

async function increaseOrDecreseOpinion(
  url: URL,
  operation: "INCREASE" | "DECREASE",
) {
  const search = url.searchParams;
  const tempId = search.get("opinionId");
  if (tempId === null) {
    return fail(404, { message: "Something wrong" });
  }

  const opinionId = parseInt(tempId);
  if (isNaN(opinionId)) {
    return fail(404, { message: "Something wrong" });
  }

  const option = db.update(options);
  if (operation === "INCREASE") {
    await option
      .set({
        votes: sql`${options.votes} + 1`,
      })
      .where(eq(options.id, opinionId));
  } else {
    await option
      .set({
        votes: sql`${options.votes} - 1`,
      })
      .where(eq(options.id, opinionId));
  }
}

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
  increaseVote: async ({ url }) => {
    increaseOrDecreseOpinion(url, "INCREASE");
  },
  decreaseVote: async ({ url }) => {
    increaseOrDecreseOpinion(url, "DECREASE");
  },
} satisfies Actions;
