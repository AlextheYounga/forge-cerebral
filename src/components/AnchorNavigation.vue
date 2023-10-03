<template>
    <ul class="table-of-contents hidden lg:flex border-l border-stone-700 pl-2 grow flex-col gap-y-3 py-4">
        <li class="text-sm" v-for="header of headers">
            <a :href="`#${header.id}`">{{ header.text }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ContentsNavigation',
    data() {
        return {
            headers: []
        }
    },
    mounted() {
        this.parseContentForHeaders();
    },
    methods: {
        async parseContentForHeaders() {
            const headerElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
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
        }
    }
}
</script>
