<template>
    <main>
        <div class="content ">
            <div class="h-full z-50">
                <BlogNavigation />
            </div>

            <div class="container w-2/3 mx-auto max-w-2xl">
                <div class="mx-auto">
                    <div id="article-body" class="mt-24 block">
                        <div v-html="markdown"></div>
                    </div>
                </div>
            </div>

            <div v-if="markdown" class="fixed right-5 top-[6rem] block w-1/6">
                <AnchorNavigation />
            </div>
        </div>
    </main>
</template>

<script>
import BlogNavigation from '@/components/BlogNavigation.vue';
import AnchorNavigation from '../components/AnchorNavigation.vue';
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'

export default {
    name: 'BlogView',
    components: {
        BlogNavigation,
        AnchorNavigation,
        MarkdownIt,
        MarkdownItAnchor
    },
    data() {
        return {
            markdown: null,
            options: {
                html: true,
                linkify: true,
            },
            plugins: [MarkdownItAnchor]
        }
    },
    created() {
        this.fetchMarkdown();
    },
    methods: {
        async fetchMarkdown() {
            const path = this.$route.path;
            const markdownContent = await fetch(`${path}.md`);
            const markdownText = await markdownContent.text();

            this.markdown = new MarkdownIt(this.options ?? {})
                .use(MarkdownItAnchor)
                .render(markdownText);
        },
    }
}
</script>