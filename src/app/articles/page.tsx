import Link from 'next/link'
import { allArticles } from 'contentlayer/generated'

import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/atoms/card'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { FadeInStagger, FadeIn, AnimatePresence } from '@/components/atoms/fade-in'

type SearchParamsProps = {
  searchParams: {
    tag: string
  }
}

export default function Articles({ searchParams }: SearchParamsProps) {
  const { tag } = searchParams
  let filteredArticles = tag ? allArticles.filter(articles => articles.tag.includes(tag)) : allArticles

  return (
    <FadeInStagger className='grid md:grid-cols-2 gap-5 p-5' faster>
      <AnimatePresence mode='wait'>
        {filteredArticles.map(articles => (
          <FadeIn key={articles._id}>
            <Card className='h-max hover:shadow-lg hover:shadow-secondary'>
              <CardHeader className='p-5'>
                <CardTitle>
                  <Link href={`/articles/${articles.slug.toLowerCase()}`} className='leading-normal'>
                    {articles.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='py-0 px-5 text-sm text-muted-foreground line-clamp-4'>{articles.summary}</CardContent>
              <CardFooter className='p-5'>
                <div className='flex items-center gap-x-1'>
                  <p className='text-sm text-muted-foreground'>Tags: </p>
                  <Badge>React</Badge>
                </div>
                <Button variant='outline' className='ml-auto' asChild>
                  <Link href={`/articles/${articles.slug.toLowerCase()}`} className='leading-normal'>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        ))}
      </AnimatePresence>
    </FadeInStagger>
  )
}
