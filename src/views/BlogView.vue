<template>
    <main>
        <div class="content ">
            <div class="h-full z-50">
                <BlogNavigation />
            </div>

            <div class="w-full mt-24">
                <div>
                    <div class="container max-w-2xl mx-auto">
                        <div id="article-body">
                            <vue-markdown :source="markdown" :options="options" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import BlogNavigation from '@/components/BlogNavigation.vue';
import VueMarkdown from 'vue-markdown-render'

export default {
    name: 'BlogView',
    components: {
        BlogNavigation,
        VueMarkdown
    },
    data() {
        return {
            markdown: '',
            options: {
                html: true,
                linkify: true,
            }
        }
    },
    mounted() {
        this.fetchMarkdown();
    },
    methods: {
        async fetchMarkdown() {
            const path = this.$route.path;
            const markdownContent = await fetch(`${path}.md`);
            this.markdown = await markdownContent.text();
        },
    }

}
</script>