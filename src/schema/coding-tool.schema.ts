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