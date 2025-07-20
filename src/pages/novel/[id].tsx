import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const NovelDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Novel Detail {id}</h1>
      <p className="mt-2">This page will show the novel contents.</p>
    </div>
  )
}

export default NovelDetail
