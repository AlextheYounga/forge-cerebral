<template>
    <div class="container max-w-5xl">
        {{ markdown }}
    </div>
</template>

<script>

export default {
    name: 'BlogView',
    data() {
        return {
            markdown: ''
        }
    },
    mounted() {
        this.fetchMarkdown();
    },
    methods: {
        async fetchMarkdown() {
            const markdown = await fetch('/blog/2021-05-01-why-i-started-this-blog.md');
            this.markdown = await markdown.text();
        }
    }
    
}
</script>