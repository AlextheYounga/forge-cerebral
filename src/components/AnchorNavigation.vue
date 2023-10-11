<template>
    <div class="fixed right-5 top-[6rem] block w-1/6">
        <ul class="toc hidden lg:flex border-l border-stone-700 pl-2 grow flex-col gap-y-3 py-4">
            <li class="text-sm" v-for="header of headers" :key="header.id" :ref="header.id">
                <a :href="`#${header.id}`">{{ header.text }}</a>
            </li>
        </ul>
    </div>

    <div v-if="!tocOpen" class="mobile-toc fixed lg:hidden bottom-0 w-full z-50 body-font bg-stone-900/80">
        <div class="border-b border-stone-700 mx-auto flex flex-wrap py-4 flex-col md:flex-row items-center px-4">
            <div class="flex relative w-full items-center">
                <!-- Mobile TOC button -->
                <div class="toc-button border-gray-200 flex items-center shadow-sm z-50 absolute right-0">
                    <button type="button" class="lg:hidden" @click="tocOpen = true">
                        <span class="sr-only">Open panel</span>
                        <Bars4Icon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="tocOpen">
        <Dialog as="div" class="relative z-10" @close="tocOpen = false">
            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-stone-900/80 pt-16 shadow-xl">
                                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                        <div class="mobile-sidebar flex grow flex-col gap-y-5 overflow-y-auto px-6 py-4">
                                            <nav class="flex flex-1 flex-col">
                                                <p class="accent">Table of Contents</p>
                                                <ul class="toc-mobile pl-2 grow flex-col gap-y-3 py-4">
                                                    <li class="text-lg" v-for="header of headers" :key="header.id" :ref="header.id" @click="tocOpen = false">
                                                        <a :href="`#${header.id}`"><span class="accent">#</span> {{ header.text }}</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div class="absolute -bottom-1 right-4">
                                        <button type="button" class="relative rounded-md accent focus:outline-none" @click="tocOpen = false">
                                            <span class="sr-only">Close panel</span>
                                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>



<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars4Icon, XMarkIcon } from '@heroicons/vue/24/outline'

export default {
    name: 'ContentsNavigation',
    components: {
        Dialog,
        DialogPanel,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        Bars4Icon,
        XMarkIcon
    },
    data() {
        return {
            headers: [],
            tocOpen: false,
        }
    },
    props: {
        markdownHtml: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.parseContentForHeaders();
        this.scrollHighlight();
    },
    methods: {
        getHeaderElements(html) {
            if (html) {
                return html.querySelectorAll('h2, h3, h4');
            }
            return document.querySelectorAll('h2, h3, h4');
        },
        async parseContentForHeaders() {
            const html = document.createElement('html');
            html.innerHTML = this.markdownHtml;
            const headerElements = this.getHeaderElements(html);

            headerElements.forEach((header) => {
                if (header.tagName !== 'H1') {
                    this.$data.headers.push({
                        id: header.id,
                        text: header.innerText,
                        type: header.tagName,
                        level: Number(header.tagName[1]),
                        active: false,
                    })
                }
            })
        },
        scrollHighlight() {
            const headerElements = this.getHeaderElements();
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove active class from all links
                        for (const [_key, value] of Object.entries(this.$refs)) {
                            value[0].classList.remove("active-anchor");
                        }

                        // Add active class to the current link
                        const id = entry.target.getAttribute("id");
                        if (this.$refs[id]?.[0]) {
                            this.$refs[id][0].classList.add("active-anchor");
                        }
                    }
                });
            }, {
                threshold: 0.5  // Adjust this value to determine how much of the section should be visible before it's considered "active"
            });

            headerElements.forEach(header => observer.observe(header));
        }
    }
}
</script>
