'use client'

import { useParams } from 'next/navigation'

export default function NovelDetail() {
  const params = useParams()
  const id = params?.id as string

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold'>Novel Detail {id}</h1>
      <p className='mt-2'>This page will show the novel contents.</p>
    </div>
  )
}
