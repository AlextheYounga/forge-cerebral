// node scripts/generateArticleDirectory.js
import fs from 'fs'
import { startCase } from 'lodash'
import collectMetadata from './functions/collectMetadata'
import { color} from 'console-log-colors';

function generateArticleMetadata() {
    const blogFolder = 'src/blog'
    const blogTopics = fs.readdirSync(blogFolder)

    const blogDirectory = []
    const blogHead = {}
    const blogList = []

    // Loop through categories
    for (const topic of blogTopics) {
        if (['.DS_Store', 'README.md'].includes(topic)) continue

        const topicDisplayTitle = startCase(topic)
        const topicDirectory = {
            name: topicDisplayTitle, // Name of the collapsible group
            current: false,
            children: []
        }

        const topicFolder = `${blogFolder}/${topic}`
        const topicPosts = fs.readdirSync(topicFolder)

        // Loop through individual posts
        for (const post of topicPosts) {
            if (['.DS_Store', 'README.md'].includes(post)) continue

            const postFullpath = `${topicFolder}/${post}`
            const postSlug = post.replace('.md', '')
            const postContent = fs.readFileSync(postFullpath, 'utf-8')
            const postPath = `/blog/${topic}/${postSlug}`

            // Parse head meta content
            const { useHeadData, metaData } = collectMetadata(postContent, postPath)

            // Add to blog list
            blogList.push(metaData)

            // Add to useHead list
            if (!blogHead[postPath]) blogHead[postPath] = []
            blogHead[postPath] = useHeadData

            // Add to directory
            topicDirectory.children.push(metaData)
        }

        blogDirectory.push(topicDirectory)
    }

    // Writing meta files
    fs.writeFileSync('src/meta/articles.json', JSON.stringify(blogList, null, 4))
    fs.writeFileSync('src/meta/metadata.json', JSON.stringify(blogHead, null, 4))
    fs.writeFileSync('src/meta/directory.json', JSON.stringify(blogDirectory, null, 4))

    console.log(color.green('Article directory generated!'))
}

export default generateArticleMetadata