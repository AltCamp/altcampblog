import { NewsletterAPI } from '@/node_modules/pliny/newsletter'
import siteMetadata from '@/components/siteMetadata'

const handler = NewsletterAPI({
  // @ts-ignore
  provider: siteMetadata.newsletter.provider,
})

export { handler as GET, handler as POST }
