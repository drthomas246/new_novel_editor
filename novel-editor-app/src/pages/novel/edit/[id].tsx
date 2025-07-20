import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const NovelEditor: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit Novel {id}</h1>
      <p className="mt-2">Tiptap editor will be implemented here.</p>
    </div>
  )
}

export default NovelEditor
