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
                                        <span class="font-semibold title-font">{{ article.category }}</span>
                                        <span v-if=article.date class="mt-1 text-sm">{{ article.date }}</span>
                                    </div>
                                    <div class="md:flex-grow">
                                        <h2 class="text-2xl font-medium title title-font mb-2">{{ article.name }}</h2>
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
import articles from '@/data/articles.json'
</script>