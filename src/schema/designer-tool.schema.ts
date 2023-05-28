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