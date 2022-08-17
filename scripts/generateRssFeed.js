const fs = require('fs')
const matter = require('gray-matter')
const path = require('path')

;(async () => {
  const episodesDir = path.join(__dirname, '..', 'episodes')
  // check if at least one episode exists
  const episodeSlugs = fs
    .readdirSync(episodesDir)
    .filter((slug) => !slug.endsWith('.md'))
  if (episodeSlugs.length === 0) {
    throw new Error('No episodes found. RSS not generated.')
  }
  // check if episodes/base.md exists
  const baseEpisodePath = path.join(episodesDir, 'base.md')
  if (!fs.existsSync(baseEpisodePath)) {
    throw new Error('base.md not found. RSS not generated.')
  }

  // read base.md
  const baseMarkdown = fs.readFileSync(baseEpisodePath, 'utf8')
  const { data: baseMatter } = matter(baseMarkdown)
  // read all episodes
  const episodes = episodeSlugs.map((slug) => {
    const episodeMdPath = path.join(episodesDir, slug, 'index.md')
    if (!fs.existsSync(episodeMdPath)) {
      throw new Error(`${slug}/index.md not found. RSS not generated.`)
    }
    const markdown = fs.readFileSync(episodeMdPath, 'utf8')
    const { data } = matter(markdown)
    return { ...data, slug }
  })

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"
     xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:media="http://video.search.yahoo.com/mrss"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dcterms="https://purl.org/dc/terms"
     xmlns:spotify="https://www.spotify.com/ns/rss"
     xmlns:psc="https://podlove.org/simple-chapters/">
    <channel>

      <title>${baseMatter.title}</title>
      <itunes:title>${baseMatter.title}</itunes:title>
      <itunes:subtitle>${baseMatter.subtitle}</itunes:subtitle>
  
      <googleplay:author>${baseMatter.author}</googleplay:author>
      <itunes:author>${baseMatter.author}</itunes:author>
      <author>${baseMatter.author}</author>
  
      <googleplay:email>${baseMatter.email}</googleplay:email>
      <itunes:owner>
        <itunes:email>${baseMatter.email}</itunes:email>
        <itunes:name>${baseMatter.author}</itunes:name>
      </itunes:owner>
      <managingEditor>${baseMatter.email}</managingEditor>
  
      <googleplay:image href="${baseMatter.link}/images/${baseMatter.image}"/>
      <itunes:image href="${baseMatter.link}/images/${baseMatter.image}"/>
      <image href="${baseMatter.link}/images/${baseMatter.image}"/>
  
      <googleplay:description>${baseMatter.description}</googleplay:description>
      <itunes:summary>${baseMatter.description}</itunes:summary>
      <description>${baseMatter.description}</description>
  
      <language>${baseMatter.language}</language>
  
      <link>${baseMatter.link}</link>
  
      <googleplay:explicit>No</googleplay:explicit>
      <itunes:explicit>no</itunes:explicit>
  
      ${baseMatter.categories
        .split(',')
        .map(
          (category) =>
            `<category>${category}</category>\n\t<googleplay:category text="${category}"/>\n\t<itunes:category text="${category}"/>\n`
        )
        .join('\n')}
      
      <itunes:type>episodic</itunes:type>
  
      <copyright>${baseMatter.copyright}</copyright>
  
      <webMaster>${baseMatter.email}</webMaster>
  
      <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
  
      <generator>Mediocre Minds Podcast RSS Generator v1.0</generator>
  
      <ttl>60</ttl>
  
      <itunes:complete>no</itunes:complete>
  
      <spotify:limit recentCount="10" />
  
      <spotify:countryOfOrigin>${baseMatter.country}</spotify:countryOfOrigin>
  
      ${episodes
        .map(
          (episode) => `\t\t<item>
        <title>${episode.title}</title>
        <itunes:title>${episode.title}</itunes:title>
        <media:title>${episode.title}</media:title>
  
        <itunes:subtitle>${episode.subtitle}</itunes:subtitle>
  
        <googleplay:author>${episode.author}</googleplay:author>
        <itunes:author>${episode.author}</itunes:author>
        <author>${episode.author}</author>
  
        <content:encoded><![CDATA[<i>${episode.content}</i>]]></content:encoded>
  
        <enclosure url="https://media.githubusercontent.com/media/mediocreminds/podcast/main/episodes/${episode.slug}/${
            episode.audioUrl
          }" length="${
            fs.statSync(`${episodesDir}/${episode.slug}/episode.mp3`).size
          }" type="${episode.audioType}"/>
        <media:content type="${episode.audioType}" url="https://media.githubusercontent.com/media/mediocreminds/podcast/main/episodes/${episode.slug}/${episode.audioUrl}"/>
  
        <itunes:duration>${episode.duration}</itunes:duration>
  
        <googleplay:image href="${encodeURI(`${baseMatter.link}/api/episodeCover?data={"title":"${episode.title}","episode":"${episode.episode}","authors":"${episode.author}"}`)}"/>
        <itunes:image href="${encodeURI(`${baseMatter.link}/api/episodeCover?data={"title":"${episode.title}","episode":"${episode.episode}","authors":"${episode.author}"}`)}"/>
        <image href="${encodeURI(`${baseMatter.link}/api/episodeCover?data={"title":"${episode.title}","episode":"${episode.episode}","authors":"${episode.author}"}`)}"/>
  
        <googleplay:description>${episode.description}</googleplay:description>
        <itunes:summary>${episode.description}</itunes:summary>
        <media:description>${episode.description}</media:description>
        <description>${episode.description}</description>
  
        <guid isPermaLink="true">https://media.githubusercontent.com/media/mediocreminds/podcast/main/episodes/${episode.slug}/${
            episode.audioUrl
          }</guid>
  
        <link>${baseMatter.link}/${episode.slug}</link>
  
        <pubDate>${episode.pubDate}</pubDate>
  
        <googleplay:explicit>No</googleplay:explicit>
        <itunes:explicit>no</itunes:explicit>
  
        <itunes:order>${episode.order}</itunes:order>
        <itunes:episode>${episode.episode}</itunes:episode>
        <itunes:season>${episode.season}</itunes:season>
  
        <googleplay:block>no</googleplay:block>
        <itunes:block>no</itunes:block>
  
        <comments>${baseMatter.link}</comments>
  
        <source url="${baseMatter.link}/rss/feed.xml">${
            baseMatter.title
          }</source>
        ${
          episode.restriction
            ? `<media:restriction type="country" relationship="allow">${episode.restriction}</media:restriction>`
            : ''
        }
        <itunes:keywords>${episode.keywords}</itunes:keywords>
        <itunes:episodeType>${episode.episodeType}</itunes:episodeType>
      </item>`
        )
        .join('\n')}
    </channel>
  </rss>`

  // check if ${__dirname}/../out exists
  if (!fs.existsSync(`${__dirname}/../public/rss/`)) {
    fs.mkdirSync(`${__dirname}/../public/rss/`)
  }
  fs.writeFileSync(`${__dirname}/../public/rss/feed.xml`, rssFeed)
  console.log(`RSS feed generated at ${__dirname}/../public/rss/feed.xml`)
})()
