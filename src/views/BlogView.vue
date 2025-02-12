<template>
    <main>
        <div class="blog-view">
            <div class="z-50">
                <BlogNavigation />
            </div>

            <div class="content">
                <ArticleContent :markdownFilePath="this.markdownFilePath" />
            </div>

        </div>
    </main>
</template>

<script>
import BlogNavigation from '@/components/BlogNavigation.vue';
import ArticleContent from '@/components/ArticleContent.vue';
import { useHead } from '@vueuse/head'

export default {
    name: 'BlogView',
    components: {
        BlogNavigation,
        ArticleContent
    },
    props: {
        markdownFilePath: {
            type: String,
            required: true
        },
        metadata: {
            type: Object,
            required: true
        }
    },
    mounted() {
        useHead({
            title: this.$props.metadata.title,
            meta: this.$props.metadata.meta
        })
    },
}
</script>