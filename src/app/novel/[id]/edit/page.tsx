'use client'

import EditorLayout from '@/components/novels/EditorLayout'
import Head from 'next/head'

export default function NovelEditPage() {
  return (
    <>
      <Head>
        <title>ノベルエディタ</title>
      </Head>
      <EditorLayout />
    </>
  )
}
