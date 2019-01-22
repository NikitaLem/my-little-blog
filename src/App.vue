<template>
    <div>
        <blog-header>

        </blog-header>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Header from './components/Header.vue';

export default Vue.extend({
    name: 'my-blog',
    components: {
        'blog-header': Header,
    },

    
});
</script>
<style>
    * {
        box-sizing: border-box;
    }

    :root {
        --main-font-size: 1.6rem;
        --main-back-color: #ff3d3d;
        --secondary-color: rgba(255, 255, 255, 0.7);
    }

    html {
        font-size: 62.5%;
        font-family: Arial, Helvetica, sans-serif;
    }

    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
</style>
