// node scripts/generateArticleDirectory.js
const fs = require('fs')
const _ = require('lodash')
const jsdom = require("jsdom");

const METAMAPPING = {
    "og:site_name": "site_name",
    "original-source": 'og_source',
    "og:title": 'title',
    "og:type": 'type',
    "og:image": 'image',
    "og:description": 'description',
}

function parseMetaFromArticle(content) {
    const html = new jsdom.JSDOM(content).window;

    const head = html.document.getElementsByTagName('head')[0]
    const title = head.getElementsByTagName('title')[0].textContent

    const metaData = {}
    const useHeadData = {
        title: title,
        meta: []
    }

    const metaTags = head.getElementsByTagName('meta');

    for (const tag of metaTags) {
        const name = tag.getAttribute('name')
        const content = tag.getAttribute('content')

        const mappedName = METAMAPPING[name] ?? name
        metaData[mappedName] = content

        useHeadData.meta.push({
            name: name,
            content: content
        })
    }

    return { useHeadData, metaData }
}

const blogFolder = 'src/blog'
const blogTopics = fs.readdirSync(blogFolder)

const blogDirectory = []
const blogHead = {}
const blogList = []

// Loop through categories
for (const topic of blogTopics) {
    if (['.DS_Store', 'README.md'].includes(topic)) continue


    const topicDisplayTitle = _.startCase(topic)
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
        const { useHeadData, metaData } = parseMetaFromArticle(postContent)
        useHeadData.href = postPath
        metaData.href = postPath

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

fs.writeFileSync('src/data/articles.json', JSON.stringify(blogList, null, 4))
fs.writeFileSync('src/data/metadata.json', JSON.stringify(blogHead, null, 4))
fs.writeFileSync('src/data/directory.json', JSON.stringify(blogDirectory, null, 4))
console.log('Article directory generated!')

