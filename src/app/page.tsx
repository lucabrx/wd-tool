import ItemCard from '@/components/ItemCard'
import Button from '@/components/ui/Button'
import { getLatestCoding } from '@/utils/getLatestCoding'
import { getLatestDesign } from '@/utils/getLatestDesign'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const latestCoding = await getLatestCoding()
  const latestDesign = await getLatestDesign()

  return (
    <div className='min-h-[calc(100vh-84px)] w-full bg-cover md:bg-contain bg-center bg-no-repeat ' style={{backgroundImage: 'url(./background.svg)'}}>

    <div className='flex flex-col justify-center items-center pt-8 gap-4 md:flex-row lg:pt-[120px] md:pt-[48px]'>

     <div className='flex flex-col justify-center items-start gap-2 md:w-[50%]'>
     <h2 className='text-4xl font-bold text-text md:text-6xl'>Simplify Your Design Process</h2>
    <p className='text-smText text-lg md:text-xl'>We are here to make your life easier,
        on our website u can find all tools to
        make your development and design life easier.
    </p>

    <div className='flex gap-3 justify-start items-center w-full md:pt-2'>
     <Button variant="cta" size="cta">
      <Link href='/design'>Coding Tools</Link>
     </Button>
     <Button variant="ghost-cta" size="cta">
      <Link href='/design'>Design Tools</Link>
     </Button>
    </div>
     </div>
    <div className='md:-top-32 relative w-full max-w-[360px]'>
      <Image className='absolute top-4 right-6 z-20' src="/hero/svelte.png" alt="hero" width={85} height={85} />
      <Image className='absolute top-14 left-6 z-20' src="/hero/dribbble.png" alt="hero" width={85} height={85} />
      <Image className='absolute top-32 right-16 z-20' src="/hero/figma.png" alt="hero" width={85} height={85} />
      <Image className='absolute top-12 right-32 z-20' src="/hero/freepiiik.png" alt="hero" width={85} height={75} />
      <Image className='absolute top-40 left-16 z-20' src="/hero/react.png" alt="hero" width={85} height={85} />
      <Image className='absolute top-0 left-4 rotate-12 opacity-70' src="/pattern/hero3.svg" alt="hero" width={135} height={135} />
      <Image className='absolute -top-2 right-2 rotate-12 opacity-10' src="/pattern/hero9.svg" alt="hero" width={135} height={135} />
    </div>
    </div>

    <div className='w-full pt-[250px] md:pt-[24px] lg:pt-[44px] flex flex-col justify-center items-center'>
    <h2 className='text-text text-2xl md:text-3xl text-center md:text-left font-medium w-full lg:ml-32 xl:ml-56'>Latest Coding Tools</h2>
    <div className="flex flex-wrap  gap-4 justify-center items-center w-full pt-4">
    {latestCoding?.map((tool) => (
    <ItemCard tool={tool} key={tool.id} />
    ))}

</div>
</div>

<div className='w-full pt-4 md:pt-[24px] lg:pt-[44px] flex flex-col justify-center items-center'>
    <h2 className='text-text text-2xl md:text-3xl text-center md:text-left font-medium w-full lg:ml-32 xl:ml-56'>Latest Coding Tools</h2>
    <div className="flex flex-wrap  gap-4 justify-center items-center w-full pt-4">
    {latestDesign?.map((tool) => (
    <ItemCard tool={tool} key={tool.id} />
    ))}

</div>
</div>

    </div>
  )
}