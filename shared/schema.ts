import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const iceBreakingQuestions = pgTable("ice_breaking_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertIceBreakingQuestionSchema = createInsertSchema(iceBreakingQuestions).omit({
  id: true,
  createdAt: true,
});

export type InsertIceBreakingQuestion = z.infer<typeof insertIceBreakingQuestionSchema>;
export type IceBreakingQuestion = typeof iceBreakingQuestions.$inferSelect;
