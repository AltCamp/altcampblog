import Main from './Main'
import { getPosts } from '@/sanity/sanity-utils'

export default async function Page() {
  const posts = await getPosts()
  // console.log(posts[posts.length - 1].slug)
  return (
    <>
      <Main posts={posts} />
    </>
  )
}
