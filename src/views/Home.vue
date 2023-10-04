<script setup>
    import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <NavBar />
    <main class="max-w-7xl container mx-auto">
        <section class="body-font w-full">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                    <h2 class="text-xs text-gold tracking-widest font-medium title-font mb-1">Alex Younger's</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-100">Forge Cerebral</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400">When nine men arrive at the same conclusion, it is the duty of Forge Cerebral to disagree, and strive to disprove the others, despite his own intuition.</p>
                </div>
                <div class="flex flex-wrap">
                    <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800 border-opacity-60">
                        <h2 class="text-lg sm:text-xl text-gray-200 font-medium title-font mb-2">Shooting Stars</h2>
                        <p class="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                        <a class="text-gold inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <a href="blog" class="w-32 justify-center flex mx-auto mt-16 text-gray-800 bg-gold border-0 py-2 focus:outline-none hover:bg-yellow-300 rounded text-lg">Read</a>
            </div>
        </section>
    </main>
</template>

