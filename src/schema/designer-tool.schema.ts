import {z, TypeOf} from 'zod';

export const CreateDesignerToolSchema = z.object({
id: z.string(),
name : z.string(),
description : z.string(),
category: z.string(),
imageSrc: z.string(),
path: z.string(),
});
export type CreateDesignerToolType = TypeOf<typeof CreateDesignerToolSchema>;

export const UpdateDesignerToolSchema = z.object({
    name : z.string().min(2).optional(),
    description : z.string().min(2).optional(),
    category: z.string().min(2).optional(),
    path: z.string().min(2).optional(),
    });
    export type UpdateDesignerToolType = TypeOf<typeof UpdateDesignerToolSchema>;