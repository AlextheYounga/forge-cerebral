<template>
    <main>
        <div class="content">
            <div class="z-50">
                <BlogNavigation />
            </div>


            <div class="h-full container w-2/3 mx-auto max-w-xl xl:max-w-2xl">
                <div class="mx-auto">
                    <div id="article-body" class="mt-24 block">
                        <div v-html="renderHtml"></div>
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
import { textVide } from "text-vide";

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
            bionicHtml: null,
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

            this.markdownHtml = this.markdownToHtml(markdownContent);
            return this.processHtml()
        },

        markdownToHtml(markdownContent) {
            return new MarkdownIt(this.options ?? {})
                .use(MarkdownItAnchor)
                .render(markdownContent);
        },

        htmlToBionic() {
            return textVide(this.markdownHtml);
        },

        async processHtml() {
            if (!this.markdownHtml) return

            if (this.bionicReading) {
                if (!this.bionicHtml) {
                    this.bionicHtml = this.htmlToBionic();
                }
                return
            }
        }
    },
    computed: {
        bionicReading() {
            return this.$store.state.bionicReading
        },
        renderHtml() {
            return this.bionicReading ? this.bionicHtml : this.markdownHtml
        }
    },
    watch: {
        bionicReading(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.processHtml();
            }
        }
    },
}
</script>