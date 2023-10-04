<template>
    <!-- Navbar -->
    <header class="fixed top-0 w-full z-50 navbar body-font">
        <div class="border-b border-stone-700 mx-auto flex flex-wrap py-4 flex-col md:flex-row items-center px-4">
            <div class="flex relative w-full">
                <!-- Mobile sidebar button -->
                <div class="border-gray-200 flex items-center shadow-sm z-40 absolute left-0">
                    <button type="button" class="text-gray-100 lg:hidden" @click="sidebarOpen = true">
                        <span class="sr-only">Open sidebar</span>
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <!-- Header Title -->
                <div class="mx-auto lg:mx-0">
                    <a href="/" class="flex title-font font-medium items-center text-gold md:mb-0">
                        <span class="ml-3 text-xl">Forge Cerebral</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div class="fixed inset-0 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                    <span class="sr-only">Close sidebar</span>
                                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <!-- Sidebar component, swap this element with another sidebar if you like -->
                        <div class="mobile-sidebar flex grow flex-col gap-y-5 overflow-y-auto px-6 py-4">
                            <nav class="flex flex-1 flex-col">
                                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" class="space-y-1">
                                            <li v-for="item in directory" :key="item.name">
                                                <a v-if="!item.children" :href="item.href" :class="[item.current ? 'bg-gold' : 'hover:bg-stone-800', 'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-300']">
                                                    {{ item.name }}
                                                </a>
                                                <Disclosure as="div" defaultOpen v-else v-slot="{ open }">
                                                    <DisclosureButton :class="[item.current ? 'bg-gold' : 'hover:bg-stone-800', 'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-300']">
                                                        <ChevronRightIcon :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
                                                        {{ item.name }}
                                                    </DisclosureButton>
                                                    <DisclosurePanel as="ul" class="mt-1 px-2">
                                            <li v-for="subItem in item.children" :key="subItem.name">
                                                <DisclosureButton as="a" :href="subItem.href" :class="[subItem.current ? 'bg-gold' : 'hover:bg-stone-800', 'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-400']">
                                                    {{ subItem.name }}
                                                </DisclosureButton>
                                            </li>
                                            </DisclosurePanel>
                                            </Disclosure>
                                    </li>
                                </ul>
                                </li>
                                <li class="mt-auto pb-8">
                                    <div class="flex flex-wrap gap-4">
                                        <p class="text-sm font-semibold text-gray-300">Speed Reading</p>
                                        <Switch v-model="bionicReadingEnabled"
                                            :class="[bionicReadingEnabled ? 'bg-gold' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2']">
                                            <span class="sr-only">Speed Reading</span>
                                            <span aria-hidden="true"
                                                :class="[bionicReadingEnabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                                        </Switch>
                                    </div>
                                </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Static Sidebar for desktop -->
    <div class="sidebar hidden lg:fixed lg:flex top-[3.8rem] w-1/5 float-left grow flex-col gap-y-5 overflow-y-auto border-r border-stone-700 px-6">
        <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7 overflow-scroll">
                <li>
                    <ul role="list" class="space-y-1">
                        <li v-for="item in directory" :key="item.name">
                            <a v-if="!item.children" :href="item.href" :class="[item.current ? 'bg-gold' : 'hover:bg-stone-800', 'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-300']">
                                {{ item.name }}
                            </a>
                            <Disclosure as="div" defaultOpen v-else v-slot="{ open }">
                                <DisclosureButton :class="[item.current ? 'bg-gold' : 'hover:bg-stone-800', 'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-300']">
                                    <ChevronRightIcon :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
                                    {{ item.name }}
                                </DisclosureButton>
                                <DisclosurePanel as="ul" class="mt-1 px-2">
                        <li v-for="subItem in item.children" :key="subItem.name">
                            <DisclosureButton as="a" :href="subItem.href" :class="[subItem.current ? 'bg-gold' : 'hover:bg-stone-800', 'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-400']">
                                {{ subItem.name }}
                            </DisclosureButton>
                        </li>
                        </DisclosurePanel>
                        </Disclosure>
                </li>
            </ul>
            </li>
            <li class="mt-auto pb-8">
                <div class="flex flex-wrap w-3/4 justify-between pb-3">
                    <p class="text-sm font-semibold text-gray-300">Speed Reading</p>
                    <Switch v-model="bionicReading"
                        :class="[bionicReading ? 'bg-gold' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2']">
                        <span class="sr-only">Speed Reading</span>
                        <span aria-hidden="true" :class="[bionicReading ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                    </Switch>
                </div>

                <div class="flex flex-wrap w-3/4 justify-between">
                    <p class="text-sm font-semibold text-gray-300">Dark Mode</p>
                    <Switch v-model="darkMode"
                        :class="[darkMode ? 'bg-gold' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2']">
                        <span class="sr-only">Dark Mode</span>
                        <span aria-hidden="true" :class="[darkMode ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                    </Switch>
                </div>
            </li>
            </ul>
        </nav>
    </div>
</template>
  
<script>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel, Switch } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import articleDirectory from '../data/directory.json'
import { ref } from 'vue';

export default {
    components: {
        Dialog,
        DialogPanel,
        TransitionChild,
        TransitionRoot,
        XMarkIcon,
        Bars3Icon,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Switch,
        ChevronRightIcon
    },
    data() {
        return {
            bionicReading: this.$store.state.bionicReading,
            darkMode: this.$store.state.darkMode,
            directory: articleDirectory,
            sidebarOpen: ref(false)
        }
    },
    watch: {
        bionicReading() {
            this.$store.commit('toggleBionicReading');
        },
        darkMode() {
            this.$store.commit('toggleDarkMode');
        }
    }
}
</script>

<style scoped>
.sidebar {
    height: calc(100vh - 3.8rem);
}
</style>