// api/sermons.js
import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const rssUrl =
      'https://www.insightsforliving.org/podcasts/ItunesFeedCCC.xml'
    const response = await fetch(rssUrl)
    const xmlData = await response.text()

    const parsedData = await parseStringPromise(xmlData, {
      explicitArray: false,
      tagNameProcessors: [(name) => name.replace('itunes:', '')],
    })

    const items = parsedData.rss.channel.item || []
    const sermons = items.map((item) => ({
      id: item.guid,
      title: item.title || 'No title',
      author: item.author || 'Unknown author',
      pubDate: item.pubDate || 'No date',
      description: item.summary || 'No description available',
      duration: item.duration || 'Unknown duration',
      audio: item.enclosure?.$.url || null,
      image:
        item.image?.$.href ||
        'https://www.covenantchristiancentre.org/podcasts/images/itunesalbumart.jpg',
    }))

    res.status(200).json(sermons) // Return array directly
  } catch (error) {
    console.error('Error fetching sermons:', error)
    res.status(500).json({ error: 'Failed to fetch sermons' })
  }
}
