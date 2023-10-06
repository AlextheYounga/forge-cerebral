<script setup>
    import NavBar from '@/components/NavBar.vue';
    import articles from '@/data/articles.json'
    import { shuffle, range, take } from 'lodash'
    import heroImg from '@/assets/images/story_of_man.jpeg'

    const randomIndexes = take(shuffle(range(articles.length)), 4)
    const randomArticles = randomIndexes.map(i => articles[i])
</script>

<template>
    <NavBar />
    <main class="max-w-7xl container mx-auto">
        <section class="body-font w-full">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-6">
                    <img class="w-72 mx-auto pb-1" :src="heroImg"/>
                    <!-- <h2 class="text-xs tracking-widest font-medium title-font mb-1">Alex Younger's</h2> -->
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">Forge Cerebral</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
                    <a href="blog" class="button w-32 justify-center flex mx-auto mt-4 border-0 py-2 focus:outline-none rounded text-lg">Read</a>
                </div>
                <div class="flex flex-wrap">
                    <div v-for="article in randomArticles" :key="article.title" class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800 border-opacity-60">
                        <h2 class="text-lg sm:text-xl font-medium title-font mb-2"><a :href="article.href">{{ article.name }}</a></h2>
                        <p class="leading-relaxed text-base mb-4">{{ article.description || article.subtitle }}</p>
                        <a :href="article.href" class="inline-flex items-center">Learn More
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

