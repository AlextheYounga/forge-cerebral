import matter from 'gray-matter';

const DEFAULTMETA = {
    'type': 'article',
    'site_name': 'Forge Cerebral',
    'url': 'https://forgecerebral.com',
}

function parseMetaFromArticle(content, path) {
    const frontMatter = matter(content)

    const metaData = {
        href: path,
    }
    const useHeadData = {
        title: frontMatter.data.title,
        href: path,
        meta: []
    }

    // URL
    DEFAULTMETA['canonical'] = `${DEFAULTMETA['url']}${path}`

    for (const key in frontMatter.data) {
        const value = frontMatter.data[key]
        // Add to meta data object
        metaData[key] = value

        // Open Graph meta tags
        const metaNames = [
            key, `og:${key}`
        ]

        for (const name of metaNames) {
            useHeadData.meta.push({
                name: name,
                content: value
            })
        }

        // Twitter meta tags
        if (['title', 'description', 'image', 'url'].includes(key)) {
            useHeadData.meta.push({
                name: `twitter:${key}`,
                content: value
            })
        }
    }

    for (const key in DEFAULTMETA) {
        const value = DEFAULTMETA[key]
        // Open Graph meta tags
        const metaNames = [
            key, `og:${key}`
        ]

        for (const name of metaNames) {
            useHeadData.meta.push({
                name: name,
                content: value
            })
        }
    }

    return { useHeadData, metaData }
}

export default parseMetaFromArticle