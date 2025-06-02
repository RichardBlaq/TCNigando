import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'

const app = express()
const PORT = 5000

app.use(cors())

app.get('/api/sermons', async (req, res) => {
  try {
    const rssUrl =
      'https://www.insightsforliving.org/podcasts/ItunesFeedCCC.xml'
    const response = await fetch(rssUrl)
    const xmlData = await response.text()

    // Ensure xml2js handles namespaces properly
    const parsedData = await parseStringPromise(xmlData, {
      explicitArray: false,
      tagNameProcessors: [(name) => name.replace('itunes:', '')], // Removes 'itunes:' prefix
    })

    const items = parsedData.rss.channel.item || []

    const sermons = items.map((item) => ({
      title: item.title || 'No title',
      author: item.author || 'Unknown author', // Now correctly extracting <itunes:author>
      pubDate: item.pubDate || 'No date',
      description: item.summary || 'No description available', // Now correctly extracting <itunes:summary>
      duration: item.duration || 'Unknown duration', // Now correctly extracting <itunes:duration>
      audio: item.enclosure?.$.url || null,
    }))

    res.json({ sermons })
  } catch (error) {
    console.error('Error fetching sermons:', error)
    res.status(500).json({ error: 'Failed to fetch sermons' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
