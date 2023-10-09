<template>
    <ul class="toc hidden lg:flex border-l border-stone-700 pl-2 grow flex-col gap-y-3 py-4">
        <li class="text-sm" v-for="header of headers" :key="header.id" :ref="header.id">
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
            const html = document.createElement( 'html' );
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
                threshold: 0.7  // Adjust this value to determine how much of the section should be visible before it's considered "active"
            });

            headerElements.forEach(header => observer.observe(header));
        }
    }
}
</script>
