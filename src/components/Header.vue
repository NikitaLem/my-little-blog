<template>
    <header id="header" class="blog-header">
        <blog-canvas
            :circle-max-speed="15"
            :circle-size="50"
            :amount-of-circles="2"
        ></blog-canvas>
        <div class="header__title">
            <h1>ULTIMATE HEADER</h1>
        </div>
    </header>
</template>
<script lang="ts">
import Vue from 'vue'
import blogCanvas from './Canvas.vue';

export default Vue.extend({
    name: 'Header',
    components: {
        'blog-canvas': blogCanvas,
    },

    props: {

    },

    data() {
        return {
        }
    },

    computed: {
    },

    methods: {
        
    },

    mounted() {
    }
    
})
</script>
<style>
    .blog-header {
        height: 100vh;
        width: 100vw;
        position: relative;
    }

    .header__title {
        position: absolute;
        bottom: 15%;
        left: 25%;
        right: 25%;
        background-color: rgba(255, 255, 255, 0.7);
        text-align: center;
        pointer-events: none;
        font-size: 2.2rem;
        color: var(--main-back-color);
    }
</style>
