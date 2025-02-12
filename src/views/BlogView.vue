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

<script setup>
import BlogNavigation from '@/components/BlogNavigation.vue';
import ArticleContent from '@/components/ArticleContent.vue';
import { defineProps } from 'vue';
import { useHead } from 'unhead'

const props = defineProps({
    metadata: {
        type: Object,
        required: true
    },
    markdownFilePath: {
        type: String,
        required: true
    }
});

useHead({
    title: props.metadata.title,
    meta: props.metadata.meta
});
</script>