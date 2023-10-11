<template>
    <main>
        <div class="blog-view">
            <div class="z-50">
                <BlogNavigation />
            </div>

            <div v-if="markdownFilePath" class="content">
                <ArticleContent :markdownFilePath="markdownFilePath" />
            </div>

        </div>
    </main>
</template>

<script>
import BlogNavigation from '@/components/BlogNavigation.vue';
import ArticleContent from '@/components/ArticleContent.vue';
import { useHead } from 'unhead';
import metadata from '@/meta/metadata.json'

export default {
    name: 'BlogView',
    components: {
        BlogNavigation,
        ArticleContent
    },

    setup() {
        return {
            markdownFilePath: null,
        }
    },
    methods: {
        checkDraftRoute(route) {
            if (process.env.NODE_ENV == 'production') return false
            if (process.env.NODE_ENV && route.includes('/draft/')) {
                return true
            }
            return false
        }
    },
    created() {
        const route = this.$route.path
        const articleMeta = metadata[route]

        if (articleMeta) {
            const draftRoute = route.includes('/draft/')
            const allowDraftRoute = process.env.NODE_ENV == 'development'

            if (draftRoute && !allowDraftRoute) {
                this.$router.push({ path: '/blog' })
            }

            useHead(articleMeta)

            const filePath = `${route}.md`
            
            this.markdownFilePath = filePath
        } else {
            this.$router.push({ path: '/blog' })
        }
    }
}
</script>