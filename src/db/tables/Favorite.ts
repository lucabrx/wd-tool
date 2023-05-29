import { InferModel } from 'drizzle-orm';
import {  mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const Favorite = mysqlTable(
   "Favorite",
   {
     id: varchar("id", { length: 191 }).primaryKey().notNull(),
     userId: varchar("userId", { length: 191 }).notNull(),
     toolId: varchar("productId", { length: 191 }),
     created_at: timestamp("created_at").notNull().defaultNow(),
     updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
   });

 export type FavoriteType = InferModel<typeof Favorite, "select">;