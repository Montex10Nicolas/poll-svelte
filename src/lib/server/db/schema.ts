import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const poll = sqliteTable("question", {
  id: integer("id").primaryKey(),
  message: text("message").notNull()
})

export const options = sqliteTable("options", {
  id: integer("id").primaryKey(),
  pollId: integer("pollId").references(() => poll.id).notNull(),
  votes: integer("votes").default(0)
})
