import { useMemo } from 'react'
import Head from 'next/head'
import path from 'path'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { PlayButton } from '@/components/player/PlayButton'
import matter from 'gray-matter'
import { readdirSync, readFileSync, statSync } from 'fs'
import markdownToHTML from '@/lib/markdownToHTML'
import { BackToAllEpisodes } from '../components/player/BackToAllEpisodes'
import Favicons from '../components/player/Favicons'

const defaultFallBackShowNotes = '<h2>Notes not provided for this episode!</h2>'

export default function Episode({ metadata, content, slug }) {
  const date = new Date(metadata.pubDate)

  const audioPlayerData = useMemo(
    () => ({
      title: metadata.title,
      audio: {
        src: `https://media.githubusercontent.com/media/mediocreminds/podcast/main/episodes/${slug}/${metadata.audioUrl}`,
        type: metadata.audioType,
      },
      link: `/${slug}`,
    }),
    [metadata, content, slug]
  )
  const player = useAudioPlayer(audioPlayerData)

  return (
    <>
      <Head>
        <title>{`${metadata.title} - Mediocre Minds`}</title>
        <meta name="description" content={metadata.description} />
        <Favicons />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <BackToAllEpisodes />
        </Container>
        <hr className="mb-4" />
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {metadata.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
            <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
              {metadata.description}
            </p>
          </header>
          <hr className="my-12 border-gray-200" />
          <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </article>
    </>
  )
}

export async function getStaticProps({ params: { episodeSlug } }) {
  if (episodeSlug === 'favicon.ico') {
    return {
      notFound: true,
    }
  }

  const episodeDir = path.resolve(
    `${process.cwd()}/episodes/${episodeSlug}`
  )
  if (!statSync(episodeDir).isDirectory()) {
    return {
      notFound: true,
    }
  }

  const markdown = readFileSync(`${episodeDir}/index.md`)
  const { data: metadata, content } = matter(markdown)
  const htmlContent =
    (await markdownToHTML(content)) || defaultFallBackShowNotes

  return {
    props: {
      metadata,
      content: htmlContent,
      slug: episodeSlug,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const episodesDir = path.resolve(`${process.cwd()}/episodes`)
  const episodes = statSync(episodesDir).isDirectory()
    ? readdirSync(episodesDir)
    : []

  return {
    paths: episodes.map((slug) => ({
      params: {
        episodeSlug: slug,
      },
    })),
    fallback: 'blocking',
  }
}
