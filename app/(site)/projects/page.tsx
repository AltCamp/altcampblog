import Card from "@/components/Card";
import { genPageMetadata } from "../seo";
import { getProjects } from "@/sanity/sanity-utils";

export const metadata = genPageMetadata({ title: "Projects" });

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Check out the wonderful projects by AltCampers for AltSchoolers
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projects.map((d) => (
              <Card
                key={d._id}
                title={d.title}
                summary={d.summary}
                projectImage={d.projectImage}
                slug={d.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
