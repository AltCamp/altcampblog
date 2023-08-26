import Main from './Main'
import { getPosts } from '@/sanity/sanity-utils'

export default async function Page() {
  const posts = await getPosts()
  return (
    <>
      <Main posts={posts} />
    </>
  )
}
