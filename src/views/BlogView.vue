<template>
    <main>
        <div class="content">
            <div class="z-50">
                <BlogNavigation />
            </div>


            <div class="h-full container w-2/3 mx-auto max-w-xl xl:max-w-2xl">
                <div class="mx-auto">
                    <div id="article-body" class="mt-24 block">
                        <div v-html="markdownHtml"></div>
                    </div>
                </div>
            </div>

            <div v-if="markdownHtml" class="fixed right-5 top-[6rem] block w-1/6">
                <AnchorNavigation />
            </div>
        </div>
    </main>
</template>

<script>
import BlogNavigation from '@/components/BlogNavigation.vue';
import AnchorNavigation from '@/components/AnchorNavigation.vue';
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import bionicifyMarkdown from "bionic-markdown";

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
            markdownHtml: null,
            markdownContent: null,
            bionicMarkdown: null,
            options: {
                html: true,
                linkify: true,
            },
            plugins: [MarkdownItAnchor]
        }
    },
    created() {
        this.setupMarkdown();
    },
    methods: {
        async setupMarkdown() {
            const path = this.$route.path;
            const markdownFileContent = await fetch(`${path}.md`);
            const markdownContent = await markdownFileContent.text();

            this.markdownContent = markdownContent;

            return this.processMarkdownContent()
        },

        markdownToBionic() {
            return bionicifyMarkdown(this.markdownContent, {useAsterick: true});
        },

        markdownToHtml(markdownContent) {
            return new MarkdownIt(this.options ?? {})
                .use(MarkdownItAnchor)
                .render(markdownContent);
        },

        async processMarkdownContent() {
            if (!this.markdownContent) return

            if (this.bionicReading) {
                if (!this.bionicMarkdown) {
                    this.bionicMarkdown = this.markdownToBionic();
                }
                
                this.markdownHtml = this.markdownToHtml(this.bionicMarkdown);
                return
            }

            this.markdownHtml = this.markdownToHtml(this.markdownContent);
        }
    },
    computed: {
        bionicReading() {
            return this.$store.state.bionicReading
        }
    },
    watch: {
        bionicReading(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.processMarkdownContent();
            }
        }
    },
}
</script>