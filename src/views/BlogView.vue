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
    created() {
        const route = this.$route.path
        const articleMeta = metadata[route]

        useHead(articleMeta)

        const path = route.split('/blog/')[1]
        const filePath = `/src/blog/${path}.md`
        this.markdownFilePath = filePath
    }
}
</script>