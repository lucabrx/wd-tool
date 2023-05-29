"use client"
import { useState, type FC, useEffect } from 'react';
import Field from '../ui/Field';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCodingToolSchema, CreateCodingToolType } from '@/schema/coding-tool.schema';
import {useMutation} from "@tanstack/react-query"
import ImageUpload from '../ImageUpload';
import Button from '../ui/Button';
import axios from "axios"
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';

const DevToolHome: FC = () => {
    const [loading,setLoading] = useState(false)

    const {register,handleSubmit,formState:{errors},setValue,reset,watch} = useForm<CreateCodingToolType>({
        resolver: zodResolver(CreateCodingToolSchema),
       
    })

    const imageSrc = watch("imageSrc")




    const {mutate: createDevTool} = useMutation({
        mutationFn: (data: CreateCodingToolType) => ( axios.post("/api/coding-tool/create", data)),
        onSuccess: () => {
            reset()
            toast.success("Successfully created new tool")
            //TODO revalidate useQueryFetch
        },
        onError: () => {
            toast.error("Something went wrong.")
        },
        onSettled: () => {
            setLoading(false)
            //TODO redirect to the profile
        }
    })

    useEffect(() => {
        setValue("id", nanoid())
      }, [createDevTool,setValue,reset])

    function onSubmit(data: CreateCodingToolType) {
        setLoading(true)
        createDevTool(data)
    }


return (
<div className='pt-2'> 
<form 
onSubmit={handleSubmit(onSubmit)}
className='pt-2'
>
<Field error={errors.name}>
    <label 
    className='text-text font-semibold text-lg'>
    Name
    </label>
    <input 
    {...register("name")}
    type="text"
    placeholder='Name of the Tool...'
    className={`'w-full rounded-md  bg-zinc-700/30 py-2 px-4 outline-none focus:ring-1 focus:ring-cta1 shadow-sm
    ${errors.name ? "border border-rose-500" : ""}
    `} />
</Field>
<Field error={errors.path}>
    <label 
    className='text-text font-semibold text-lg'>
    Path
    </label>
    <input 
    {...register("path")}
    type="text"
    placeholder='Link of the Tool...'
    className={`'w-full rounded-md  bg-zinc-700/30 py-2 px-4 outline-none focus:ring-1 focus:ring-cta1 shadow-sm
    ${errors.path ? "border border-rose-500" : ""}
    `} />
</Field>
<Field error={errors.description}>
    <label 
    className='text-text font-semibold text-lg'>
    Description
    </label>
    <textarea 
    {...register("description")}
    placeholder='Description of the Tool...'
    className={`'w-full rounded-md  bg-zinc-700/30 py-2 px-4 outline-none focus:ring-1 focus:ring-cta1 shadow-sm resize-none max-h-20 overflow-y-scroll
    ${errors.description ? "border border-rose-500" : ""}
    `} />
</Field>
<Field error={errors.category}>
    <label 
    className='text-text font-semibold text-lg'>
    Category
    </label>
    <select 
    {...register("category")}
    className={`'w-full rounded-md  bg-zinc-700/30 py-2 px-4 outline-none focus:ring-1 focus:ring-cta1 shadow-sm resize-none max-h-20 overflow-y-scroll
    ${errors.category ? "border border-rose-500" : ""}
    `}>
        <option value="AI">AI</option>
        <option value="Testing">Testing</option>
        <option value="Framworks">Frameworks</option>
        <option value="State">State</option>
        <option value="Context">Context</option>
        <option value="Animation">Animation</option>
        <option value="Books">Books</option>
        <option value="UI Libs.">UI Libs.</option>
        <option value="Unstyled Libs.">Unstayled Libs.</option>
        <option value="Database">Database</option>
        <option value="Auth">Auth</option>
        <option value="Backend">Backend</option>
        <option value="Tutorials">Tutorials</option>
        <option value="Hosting">Hosting</option>
    </select>
</Field>

<ImageUpload
value={imageSrc!}
onChange={(value) => setValue("imageSrc", value)}
/>

<div className='flex w-full justify-end'>
<Button
className='mt-4 w-[180px]'
variant="cta"
size="cta"
isLoading={loading}
>Create a Tool</Button>
</div>
</form>
</div>
)
}

export default DevToolHome