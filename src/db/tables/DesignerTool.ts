import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { InferModel } from 'drizzle-orm';



export const DesignerTool = mysqlTable("DesignerTool", {
    id: varchar("id", {length: 191}).primaryKey().notNull(),
    name: varchar("name", {length: 191}).notNull(),
    category: varchar("category", {length: 191}).notNull(),
    description: varchar("description", {length: 191}).notNull(),
    path: varchar("path", {length: 191}).notNull(),
    imageSrc: varchar("image", {length: 191}).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
})

export type DesignerToolType = InferModel<typeof DesignerTool, "select">;
