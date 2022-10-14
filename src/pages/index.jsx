import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

import siteConfig from '@/site-config'
import Favicons from '@/components/player/Favicons'

function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
        />
      ) : (
        <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  )
}

function EpisodeEntry({ episode: { metadata, slug, hasNotes } }) {
  if (Object.keys(metadata).length === 0) {
    return null
  }
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
    [metadata, slug]
  )
  const player = useAudioPlayer(audioPlayerData)

  return (
    <article
      aria-labelledby={`episode-${slug}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${slug}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${slug}`}>{metadata.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700">
            {metadata.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => player.toggle()}
              className="flex items-center text-sm font-bold leading-6 text-cyan-500 hover:text-cyan-700 active:text-cyan-900"
              aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
                metadata.title
              }`}
            >
              <PlayPauseIcon
                playing={player.playing}
                className="h-2.5 w-2.5 fill-current"
              />
              <span className="ml-3" aria-hidden="true">
                Listen
              </span>
            </button>
            {hasNotes && (
              <>
                <span
                  aria-hidden="true"
                  className="text-sm font-bold text-slate-400"
                >
                  /
                </span>
                <Link
                  href={`/${slug}`}
                  className="flex items-center text-sm font-bold leading-6 text-cyan-500 hover:text-cyan-700 active:text-cyan-900"
                  aria-label={`Show notes for episode ${metadata.title}`}
                >
                  Show notes
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </article>
  )
}

function EpisodeSearchBar({
  query,
  setQuery,
  showSearchBar,
  setShowSearchBar,
}) {
  return showSearchBar ? (
    <input
      id="search-bar"
      className="focus:shadow-outline-blue ml-auto block w-auto appearance-none rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-slate-900 placeholder-slate-500 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:placeholder-slate-400 focus:outline-none sm:text-sm sm:leading-5"
      placeholder="Search for Episodes"
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        if (e.target.value.length < 3) {
          history.pushState(null, null, '/')
        }
      }}
      ref={(input) => input && input.focus()}
    />
  ) : (
    <button
      id="search-button"
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        setShowSearchBar(true)
      }}
      className="focus:shadow-outline-blue ml-auto block w-auto appearance-none rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-slate-900 placeholder-slate-500 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:placeholder-slate-400 focus:outline-none sm:text-sm sm:leading-5"
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </button>
  )
}

function filterEpisodes(episodes, query) {
  if (!query || query.length < 3) {
    return episodes
  }
  const result = []
  const tokens = query.trim().split(/\s/)

  for (const episode of episodes) {
    if (
      tokens.some(
        (token) =>
          new RegExp(token, 'i').test(episode.metadata.title) ||
          new RegExp(token, 'i').test(episode.metadata.subtitle) ||
          new RegExp(token, 'i').test(episode.metadata.content) ||
          new RegExp(token, 'i').test(episode.metadata.description)
      )
    ) {
      result.push(episode)
      continue
    }

    if (
      tokens.some(
        (token) =>
          episode.metadata.keywords &&
          episode.metadata.keywords
            .split(/,\s?/)
            .some((keyword) => new RegExp(token, 'i').test(keyword))
      )
    ) {
      result.push(episode)
      continue
    }

    if (
      tokens.some(
        (token) =>
          episode.metadata.author &&
          episode.metadata.author
            .split(/,\s?/)
            .some((author) => new RegExp(token, 'i').test(author))
      )
    ) {
      result.push(episode)
      continue
    }
  }

  history.replaceState(null, null, `?q=${encodeURIComponent(query)}`)

  return result.sort(
    ({ metadata: { pubDate: a } }, { metadata: { pubDate: b } }) =>
      new Date(b) - new Date(a)
  )
}

export default function Home({ episodes }) {
  const [query, setQuery] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)

  const {
    query: { q = '' },
  } = useRouter()

  useEffect(() => {
    if (q) {
      setQuery(q)
      setShowSearchBar(true)
    }
  }, [q])

  const filteredEpisodes = useMemo(
    () => filterEpisodes(episodes, query),
    [episodes, query]
  )

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <Favicons />
      </Head>
      <div
        className="pt-16 pb-12 sm:pb-4 lg:pt-12"
        onClick={(e) => {
          if (e.target.id !== 'search-bar' && e.target.id !== 'search-button') {
            setShowSearchBar(false)
          }
        }}
      >
        <Container>
          <div className="flex-column flex items-center">
            <h1 className="text-2xl font-bold leading-7 text-slate-900">
              Episodes
            </h1>
            <EpisodeSearchBar
              query={query}
              setQuery={setQuery}
              showSearchBar={showSearchBar}
              setShowSearchBar={setShowSearchBar}
            />
          </div>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {filteredEpisodes.map((episode) => (
            <EpisodeEntry key={episode.slug} episode={episode} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const episodeSlugs = fs.readdirSync(`${process.cwd()}/episodes`)
  const episodes = []
  for (const slug of episodeSlugs) {
    if (slug === 'base.md') {
      continue
    }

    const markdown = fs.readFileSync(
      `${process.cwd()}/episodes/${slug}/index.md`,
      'utf8'
    )
    const { data: metadata, content } = matter(markdown)
    episodes.push({ metadata, slug, hasNotes: !!content })
  }

  return {
    props: {
      episodes: episodes.sort(
        ({ metadata: { pubDate: a } }, { metadata: { pubDate: b } }) =>
          new Date(b) - new Date(a)
      ),
    },
    revalidate: 10,
  }
}
