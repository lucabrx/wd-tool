"use client"
import { CodingToolType } from '@/db/tables/CodingTool';
import { DesignerToolType } from '@/db/tables/DesignerTool';
import { useState, type FC } from 'react';
import Button from './ui/Button';
import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Field from './ui/Field';
import ShouldRender from './helpers/ShouldRender';
import { useForm } from 'react-hook-form';
import { UpdateCodingToolSchema, UpdateCodingToolType } from '@/schema/coding-tool.schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface ToolActionProps {
  tool: CodingToolType | DesignerToolType
}



const CodeToolAction: FC<ToolActionProps> = ({tool}) => {
const [loading,setLoading] = useState(false)
const [openEdit, setOpenEdit] = useState(false)
const queryClient = useQueryClient()
const router = useRouter()

  const {mutate: removeTool} = useMutation({
    mutationFn: () => ( axios.delete(`/api/coding-tool/edit/${tool.id}`)),
    onSuccess: () => {
      toast.success("Tool deleted successfully")
    },
    onError: () => {
      toast.error("Something went wrong")
    },
    onSettled: () => {
      router.push("/admin/dev-tools")
      queryClient.invalidateQueries(["codingtools"])
    }
  })

  const {register,handleSubmit,formState:{errors},reset} = useForm<UpdateCodingToolType>({
    resolver: zodResolver(UpdateCodingToolSchema),
    defaultValues: {
      name: tool.name,
      path: tool.path,
      description: tool.description,
      category: tool.category,
    }
})
  const {mutate: editTool} = useMutation({
    mutationFn: (data: UpdateCodingToolType) => ( axios.post(`/api/coding-tool/edit/${tool.id}`, data)),
    onSuccess: () => {
      toast.success("Tool updated successfully")
    },
    onError: () => {
      toast.error("Something went wrong")
    },
    onSettled: () => {
      reset()
      setOpenEdit(false)
      queryClient.invalidateQueries(["codingtools"])
      setLoading(false)
    }
  })

 function onSubmit(data: UpdateCodingToolType) {
  setLoading(true)
  editTool(data)
 }

  return (
<>
<div className='flex justify-center items-center gap-4 pt-4'> 
<Button 
onClick={() => removeTool()}
variant="danger" size="cta" className='gap-2 px-4 py-2'>
<Trash2 color="#f5f5f5" className='-mt-1' />
<span>Delete Tool</span>
</Button>
<Button 
onClick={() => setOpenEdit(!openEdit)}
variant="cta" size="cta" className='px-4 py-2'>
{openEdit ? "Close" : "Edit"}
</Button>



</div>

<ShouldRender if={openEdit}>
  
  <form 
  onSubmit={handleSubmit(onSubmit)}
  className='pt-2 w-full'
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
  
  
  
  <div className='flex w-full justify-end'>
  <Button
  className='mt-4 w-[180px]'
  variant="cta"
  size="cta"
  isLoading={loading}
  >Create a Tool</Button>
  </div>
  </form>
  </ShouldRender>
  </>
)
}

export default CodeToolAction