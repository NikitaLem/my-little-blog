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

    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
    }
</style>
