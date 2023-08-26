import Link from 'next/link'


const Tag = ({ tag }: {tag: string}) => {
  return (
    <Link
      href={`/tags/${tag}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {tag}
    </Link>
  )
}

export default Tag
