<template>
    <main>
        <div class="content">
            <div class="z-50">
                <BlogNavigation />
            </div>
            <div class="w-2/3 lg:float-right lg:mr-12 mx-auto">
                <div class="mx-auto">
                    <section class="body-font overflow-hidden">
                        <div class="container px-5 py-24 mx-auto">
                            <div v-for="article in articles" :key="article.href" class="-my-8 divide-y-2 divide-gray-100">
                                <div class="py-8">
                                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span class="font-semibold title-font">{{ startCase(article.category) }}</span>
                                        <span v-if=article.date class="mt-1 text-sm">{{ article.date }}</span>
                                    </div>
                                    <div class="md:flex-grow">
                                        <a :href="article.href">
                                            <h2 class="text-2xl font-medium title-font mb-2">
                                                {{ article.title }}
                                            </h2>
                                        </a>
                                        <p class="leading-relaxed">{{ article.description }}</p>
                                        <a :href="article.href" class="inline-flex items-center mt-4">Read
                                            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import BlogNavigation from '@/components/BlogNavigation.vue';
import articles from '@/meta/articles.json'
import startCase from 'lodash/startCase'
import { ref } from 'vue'
import { useHead } from '@vueuse/head';

const post = ref({
    title: 'Forge Cerebral',
    description: 'Expanding consciousness through carefully crafted thought.',
    type: 'blog',
    image: './images/story_of_man.jpeg',
    canonical: 'https://forgecerebral.com'
})

useHead({
    title: post.value.title,
    meta: [
        { name: 'description', content: post.value.description },
        { property: 'og:title', content: post.value.title },
        { property: 'og:description', content: post.value.description },
        { property: 'og:type', content: post.value.type },
        { property: 'og:image', content: post.value.image },
        { property: 'og:url', content: post.value.canonical },
        { property: 'twitter:title', content: post.value.title },
        { property: 'twitter:description', content: post.value.description },
        { property: 'twitter:image', content: post.value.image },
        { property: 'twitter:url', content: post.value.canonical },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:image:alt', content: post.value.title },
        { property: 'twitter:image:src', content: post.value.image },
        { property: 'twitter:image:width', content: '1200' },
        { property: 'twitter:image:height', content: '630' },
        { property: 'twitter:label1', content: 'Written by' },
        { property: 'twitter:data1', content: 'Alex Younger' },
        { property: 'twitter:data2', content: post.value.type },
    ]
});
</script>