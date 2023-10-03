// node scripts/generateArticleDirectory.js
const fs = require('fs')
const _ = require('lodash')

const blogFolder = 'public/blog'
const blogTopics = fs.readdirSync(blogFolder)

function getPostTitle(path) {
    const postContent = fs.readFileSync(path, 'utf-8')
    const postTitle = postContent.split('\n')[0].replace('# ', '')
    return postTitle
}

const blogDirectory = []
const blogList = []

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
        const postFullpath = `${topicFolder}/${post}`

        const postSlug = post.replace('.md', '')
        const postTitle = getPostTitle(postFullpath)

        const postPath = `${topic}/${postSlug}`
        const blogItem = {
            name: _.startCase(postTitle),
            href: `/blog/${postPath}`
        }

        topicDirectory.children.push(blogItem)
        blogList.push(blogItem)
    }

    blogDirectory.push(topicDirectory)
}
fs.writeFileSync('src/data/articles.json', JSON.stringify(blogList, null, 4))
fs.writeFileSync('src/data/directory.json', JSON.stringify(blogDirectory, null, 4))
console.log('Article directory generated!')

