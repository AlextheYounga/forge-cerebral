<script setup>
import { ref } from 'vue'
import { useHead } from 'unhead'
import NavBar from '@/components/NavBar.vue';
import articles from '@/meta/articles.json'
import { shuffle, range, take } from 'lodash'
import heroImg from '@/assets/images/story_of_man.jpeg'

const randomIndexes = take(shuffle(range(articles.length)), 4)
const randomArticles = randomIndexes.map(i => articles[i])

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

<template>
    <NavBar />
    <main class="home max-w-7xl container mx-auto">
        <section class="body-font w-full">
            <div class="container px-5 py-12 mx-auto">
                <div class="flex flex-col text-center w-full mb-6">
                    <img class="w-72 mx-auto pb-1" :src="heroImg" />
                    <!-- <h2 class="text-xs tracking-widest font-medium title-font mb-1">Alex Younger's</h2> -->
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">Forge Cerebral</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
                    <a href="blog" class="button w-32 justify-center flex mx-auto mt-4 border-0 py-2 focus:outline-none rounded text-lg">Read</a>
                </div>
                <div class="flex flex-wrap">
                    <div v-for="article in randomArticles" :key="article.title" class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800 border-opacity-60">
                        <h2 class="text-lg sm:text-xl font-medium title-font mb-2"><a :href="article.href">{{ article.title }}</a></h2>
                        <p class="leading-relaxed text-base mb-4">{{ article.description || article.subtitle }}</p>
                        <a :href="article.href" class="accent inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
