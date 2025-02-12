<template>
    <main>
        <div class="blog-view">
            <div class="z-50">
                <BlogNavigation />
            </div>

            <div v-if="props.markdownFilePath" class="content">
                <ArticleContent :markdownFilePath="props.markdownFilePath" />
            </div>

        </div>
    </main>
</template>

<script setup>
import BlogNavigation from '@/components/BlogNavigation.vue';
import ArticleContent from '@/components/ArticleContent.vue';
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