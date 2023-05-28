import { InferModel } from 'drizzle-orm';
import {  mysqlTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'

export const User = mysqlTable(
   "User",
   {
     id: varchar("id", { length: 191 }).primaryKey().notNull(),
     name: varchar("name", { length: 191 }),
     email: varchar("email", { length: 191 }).notNull(),
     emailVerified: timestamp("emailVerified"),
     image: varchar("image", { length: 191 }).default("/avatar-placeholder.jpeg"),
     role: varchar("role", { length: 191 }).notNull().default("user"),
     created_at: timestamp("created_at").notNull().defaultNow(),
     updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
   },
   (user) => ({
     emailIndex: uniqueIndex("users__email__idx").on(user.email),
   }),
 );

 export type UserType = InferModel<typeof User, "select">;
