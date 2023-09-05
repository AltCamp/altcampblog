import Image from './Image'
import Link from './Link'

type ProjectCardProps = {
  title: string;
  summary: string;
  projectImage: string | null;
  slug: string;
}

const Card = ({ title, summary, projectImage, slug }: ProjectCardProps) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        projectImage && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {projectImage &&
        (slug ? (
          <Link href={`/blog/${slug}`} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={projectImage}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={projectImage}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {slug ? (
            <Link href={`/blog/${slug}`} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{summary}</p>
        {slug && (
          <Link
            href={`/blog/${slug}`}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
