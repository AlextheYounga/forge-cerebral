// node scripts/generateArticleDirectory.js
const fs = require('fs')
const _ = require('lodash')
const articles = require('../src/data/articles.json')
const jsdom = require("jsdom");

const blogFolder = 'src/blog'
const blogTopics = fs.readdirSync(blogFolder)

const blogDirectory = []
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
        const postPath = `${topic}/${postSlug}`

        // Parse head meta content
        const doc = new jsdom.JSDOM(postContent).window;
        const head = doc.document.getElementsByTagName('head')[0]
        const postTitle = head.getElementsByTagName('title')[0].textContent
        const postSubtitle = head.querySelector('meta[name="subtitle"]')?.getAttribute('content')
        const description = head.querySelector('meta[name="description"]')?.getAttribute('content')
        const postDate = head.querySelector('meta[name="date"]')?.getAttribute('content')
        const postImg = head.querySelector('meta[name="og:image"]')?.getAttribute('content')

        let blogItem = {
            name: _.startCase(postTitle),
            category: topicDisplayTitle,
            href: `/blog/${postPath}`,
            subtitle: postSubtitle ?? '',
            description: description ?? '',
            date: postDate ?? '',
            img: postImg ?? '',
        }

        // Add to list
        blogList.push(blogItem)

        // Add to directory
        topicDirectory.children.push(blogItem)
    }

    blogDirectory.push(topicDirectory)
}
fs.writeFileSync('src/data/articles.json', JSON.stringify(blogList, null, 4))
fs.writeFileSync('src/data/directory.json', JSON.stringify(blogDirectory, null, 4))
console.log('Article directory generated!')

