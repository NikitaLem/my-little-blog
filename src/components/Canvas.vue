<template>
    <canvas :id="canvasId" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>
<script lang="ts">
import Vue from 'vue';
import * as PIXI from 'pixi.js';

export default Vue.extend({
    name: "Canvas",
    data() {
        return {

        }
    },

    props: {
        canvasId: {
            type: Number,
            default: 0,
        },

        canvasWidth: {
            type: Number,
            default: 800,
        },

        canvasHeight: {
            type: Number,
            default: 600,
        },
    },
    
})
</script>
<style>

</style>
