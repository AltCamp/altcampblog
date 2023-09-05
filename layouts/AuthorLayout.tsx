import { ReactNode } from 'react'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import siteMetadata from "@/components/siteMetadata";
import avatar from "/public/static/images/aboutavatar.png"


export default function AuthorLayout() {

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full shadow-md"
            />
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">AltCamp</h3>
            <div className="text-gray-500 dark:text-gray-400">e-Learning</div>
            {/* <div className="text-gray-500 dark:text-gray-400">{company}</div> */}
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              {/* <SocialIcon kind="linkedin" href={linkedin} /> */}
              {/* <SocialIcon kind="twitter" href={twitter} /> */}
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
          AltCamp is an integrated E-Learning Platform for students learning in a virtual environment who need help navigating their courses and communicating with their peers and instructors; unlike other e-learning platforms where students learn in isolation, AltCamp is a one-stop solution for peer-to-peer interactive learning.
          </div>
        </div>
      </div>
    </>
  )
}
