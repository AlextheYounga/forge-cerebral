<template>
    <!-- Navbar -->
    <header class="fixed top-0 w-full z-50 navbar body-font">
        <div class="border-b border-slate-800 mx-auto flex flex-wrap py-4 flex-col md:flex-row items-center px-4">
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
                        <span class="ml-3 text-xl">The Tenth Man</span>
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
                        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                            <div class="flex h-16 shrink-0 items-center">
                                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
                            </div>
                            <nav class="flex flex-1 flex-col">
                                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" class="-mx-2 space-y-1">
                                            <li v-for="item in navigation" :key="item.name">
                                                <a :href="item.href" :class="[item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                    <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                                                    {{ item.name }}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div class="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
                                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                                            <li v-for="team in teams" :key="team.name">
                                                <a :href="team.href" :class="[team.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ team.initial }}</span>
                                                    <span class="truncate">{{ team.name }}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="mt-auto">
                                        <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                                            <Cog6ToothIcon class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" aria-hidden="true" />
                                            Settings
                                        </a>
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
    <div class="sidebar hidden lg:fixed lg:flex top-[4rem] w-1/5 h-full grow flex-col gap-y-5 overflow-y-auto border-r border-slate-800 px-6">
        <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in directory" :key="item.name">
                            <a v-if="!item.children" :href="item.href" :class="[item.current ? 'bg-gold' : 'hover:bg-slate-800', 'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-300']">{{ item.name }}</a>
                            <Disclosure as="div" defaultOpen v-else v-slot="{ open }">
                                <DisclosureButton :class="[item.current ? 'bg-gold' : 'hover:bg-slate-800', 'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-300']">
                                    <ChevronRightIcon :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
                                    {{ item.name }}
                                </DisclosureButton>
                                <DisclosurePanel as="ul" class="mt-1 px-2">
                        <li v-for="subItem in item.children" :key="subItem.name">
                            <DisclosureButton as="a" :href="subItem.href" :class="[subItem.current ? 'bg-gold' : 'hover:bg-slate-800', 'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-400']">{{ subItem.name }}</DisclosureButton>
                        </li>
                        </DisclosurePanel>
                        </Disclosure>
                </li>
            </ul>
            </li>
            </ul>
        </nav>
    </div>
</template>
  
<script setup>
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Cog6ToothIcon,
    XMarkIcon,
    Bars3Icon,
} from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import articleDirectory from '../data/articles.json'
import { ref } from 'vue';

const directory = articleDirectory
const sidebarOpen = ref(false)
</script>

<style scoped>
#sidebar {
    height: 100%;
}
</style>