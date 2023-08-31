import Link from 'next/link'
import { Tag } from '@/types/Tag'

const Tag = ({ tag }: {tag: Tag}) => {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {tag.title}
    </Link>
  )
}

export default Tag
