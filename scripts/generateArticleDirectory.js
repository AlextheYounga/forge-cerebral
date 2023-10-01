// node scripts/generateArticleDirectory.js
const fs = require('fs')
const _ = require('lodash')

const blogFolder = 'src/articles'
const blogTopics = fs.readdirSync(blogFolder)

const blogDirectory = []
for (const topic of blogTopics) {
    if (['.DS_Store', 'README.md'].includes(topic)) continue

    const displayTitle = _.startCase(topic)
    const topicDirectory = {
        name: displayTitle, // Name of the collapsible group
        current: false,
        children: []
    }

    const topicFolder = `${blogFolder}/${topic}`
    const topicPosts = fs.readdirSync(topicFolder)

    for (const post of topicPosts) {
        if (['.DS_Store', 'README.md'].includes(post)) continue

        const postTitle = post.replace('.md', '')
        const postPath = `${topic}/${postTitle}`
        topicDirectory.children.push({
            name: _.startCase(postTitle),
            href: `/blog/${postPath}`
        })
    }

    blogDirectory.push(topicDirectory)
}

fs.writeFileSync('src/data/articles.json', JSON.stringify(blogDirectory, null, 4))
console.log('Article directory generated!')

