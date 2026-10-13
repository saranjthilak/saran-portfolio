import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://saran-portfolio.lovable.app/',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://saran-portfolio.lovable.app/impressum',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://saran-portfolio.lovable.app/datenschutz',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
