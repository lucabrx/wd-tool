import {z, TypeOf} from 'zod';

export const CreateCodingToolSchema = z.object({
id: z.string(),
name : z.string(),
description : z.string(),
category: z.string(),
imageSrc: z.string(),
path: z.string(),
});
export type CreateCodingToolType = TypeOf<typeof CreateCodingToolSchema>;

export const UpdateCodingToolSchema = z.object({
    name : z.string().min(2).optional(),
    description : z.string().min(2).optional(),
    category: z.string().min(2).optional(),
    path: z.string().min(2).optional(),
    });
    export type UpdateCodingToolType = TypeOf<typeof UpdateCodingToolSchema>;