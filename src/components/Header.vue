<template>
    <header class="blog-header">
        <blog-canvas
            :canvas-width="widthForCanvas"
            :canvas-height="heightForCanvas"
        ></blog-canvas>
    </header>
</template>
<script lang="ts">
import Vue from 'vue'
import Canvas from './Canvas.vue';

export default Vue.extend({
    name: 'Header',
    components: {
        'blog-canvas': Canvas,
    },

    data() {
        return {
            heightForCanvas: 800,
            widthForCanvas: 600,
        }
    },

    methods: {
        getHeaderSizes(): { width: number, height: number } {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        }
    },

    mounted() {
        this.widthForCanvas = this.getHeaderSizes().width;
        this.heightForCanvas = this.getHeaderSizes().height;
    }
    
})
</script>
<style>
    .blog-header {
        height: 100vh;
        width: 100vw;
    }
</style>
