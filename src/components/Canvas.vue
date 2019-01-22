<template>
    
</template>
<script lang="ts">
import Vue from 'vue'
import * as PIXI from 'pixi.js'
import { setInterval, clearInterval, setTimeout } from 'timers';

export default Vue.extend({
    name: 'Canvas',
    components: {
    },

    props: {
        circleMaxSpeed: {
            type: Number,
            default: 15,
        },

        circleSize: {
            type: Number,
            default: 50,
        },

        amountOfCircles: {
            type: Number,
            default: 20,
        },
    },

    data() {
        return {
            circles: [] as PIXI.Sprite[],
            directions: [] as number[],
            speeds: [] as number[],
            intervalTimer: null as null | number,
            mouseSpeed: 0 as number,
            mouseAngle: 0 as number,
        }
    },

    computed: {
        app(): PIXI.Application {
            return new PIXI.Application({
                autoResize: true,
                resolution: devicePixelRatio,
                backgroundColor: 0xff3d3d
            });
        },
     },

    methods: {
        createCircles(amount: number, containerW: number, containerH: number, elemSize: number): void {
            for (let i = 0; i < amount; i++) {
                const circleGraph = new PIXI.Graphics();
                circleGraph.beginFill(0xffffff, 0.7);
                circleGraph.drawCircle(0, 0, elemSize);
                circleGraph.endFill();

                const circleSprite = new PIXI.Sprite(circleGraph.generateCanvasTexture());
                circleSprite.hitArea = circleSprite.getBounds();
                circleSprite.position.set(
                    Math.floor(Math.random() * (containerW - 2 * elemSize - 70) + elemSize), 
                    Math.floor(Math.random() * (containerH - 2 * elemSize - 70) + elemSize)
                );
                circleSprite.buttonMode = true;
                circleSprite.interactive = true;

                this.circles.push(circleSprite);
                this.app.stage.addChild(circleSprite);
            }
        },

        resizeCanvas(): void {
            const parent: HTMLElement = <HTMLElement>this.app.view.parentNode;
            this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
        },

        moveCircles(): void {
            for (let i = 0; i < this.app.stage.children.length; i++) {
                let circle = this.app.stage.children[i];
                let containingZone = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);
                let sign = Math.sign(this.directions[i]);

                if (this.contain(circle, this.circleSize, containingZone) === 'top') {
                    if (Math.sin(this.directions[i]) < 0)
                        this.directions[i] *= -1;
                    this.speedDecreese(this.speeds, i);
                }

                if (this.contain(circle, this.circleSize, containingZone) === 'right') {
                    if (Math.abs(this.directions[i]) > 2 * Math.PI) {
                        this.directions[i] -= sign * 2 * Math.PI;
                    } 
                    
                    if (Math.cos(this.directions[i]) > 0)
                        this.directions[i] = Math.PI - this.directions[i];
                    this.speedDecreese(this.speeds, i);
                }

                if (this.contain(circle, this.circleSize, containingZone) === 'bottom') {
                    if (Math.sin(this.directions[i]) > 0)
                        this.directions[i] *= -1;
                    this.speedDecreese(this.speeds, i);
                }

                if (this.contain(circle, this.circleSize, containingZone) === 'left') {
                    if (Math.abs(this.directions[i]) > 2 * Math.PI) {
                        this.directions[i] -= sign * 2 * Math.PI;
                    }

                    if (Math.cos(this.directions[i]) < 0)
                        this.directions[i] = Math.PI - this.directions[i];
                    this.speedDecreese(this.speeds, i);
                }

                circle.x += Math.cos(this.directions[i]) * this.speeds[i];
                circle.y += Math.sin(this.directions[i]) * this.speeds[i];
            }
        },

        setRandomDirections(): void {
            for (let i = 0; i < this.amountOfCircles; i += 1) {
                this.directions.push(Math.random() * 2 * Math.PI);
            }
        },

        setRandomSpeeds(): void {
            for (let i = 0; i < this.amountOfCircles; i += 1) {
                this.speeds.push(Math.random() * this.circleMaxSpeed);
            }
        },

        calcMouseMove() {
            let prevPosX = 0;
            let prevPosY = 0;
            let currentPosX = this.app.renderer.plugins.interaction.mouse.global.x;
            let currentPosY = this.app.renderer.plugins.interaction.mouse.global.y;

            this.intervalTimer = <any>setInterval(async () => {
                prevPosX = this.app.renderer.plugins.interaction.mouse.global.x;
                prevPosY = this.app.renderer.plugins.interaction.mouse.global.y;
                await setTimeout(()=>{
                    currentPosX = this.app.renderer.plugins.interaction.mouse.global.x;
                    currentPosY = this.app.renderer.plugins.interaction.mouse.global.y;
                }, 50);
                
                let gapX = prevPosX - currentPosX;
                let gapY = prevPosY - currentPosY;
                let gap: number = Math.max(Math.abs(gapX), Math.abs(gapY));
                let angle: number = Math.atan2(gapY, gapX);
                this.mouseSpeed = gap > 15 ? 15 : gap;
                this.mouseAngle = angle;
            }, 100);
        },

        speedDecreese(arr: number[], index: number) {
            let timer = <any>setInterval(() => {
                    arr[index] = arr[index] > 0 ? arr[index] - 0.05 : 0;
                }, 100);

            setTimeout(() => {
                clearInterval(timer);
            }, 1000);
        },

        setMouseHandlers(arr: PIXI.Sprite[]) {
            arr.forEach((circle, i) => {
                circle.on('pointerover', () => {
                    let mouseX = this.app.renderer.plugins.interaction.mouse.global.x;
                    let mouseY = this.app.renderer.plugins.interaction.mouse.global.y;

                    if (this.mouseSpeed > 0) {
                        this.directions[i] = this.mouseAngle;
                        this.speeds[i] = this.mouseSpeed;
                    } else {
                         if (Math.abs(mouseX - circle.x - this.circleSize) < Math.abs(mouseY - circle.y - this.circleSize)) {
                            this.directions[i] *= -1;
                        } 
                        
                        if (Math.abs(mouseX - circle.x - this.circleSize) > Math.abs(mouseY - circle.y - this.circleSize)) {
                            this.directions[i] = Math.PI - this.directions[i];
                        }
                    }
                });
            });
        },

        //experimental!!!
        /*hitCheck(c1: PIXI.Sprite, c2: PIXI.Sprite) {
            const dist: number = Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
            if (dist < 2 * this.circleSize) {
                this.directions[0] *= -1;
                this.directions[1] *= -1;
            }
        },*/

        contain(elem: PIXI.DisplayObject, elemSize: number, container: PIXI.Rectangle): string | undefined {
            if (elem.x < container.x) return 'left';
            if (elem.y < container.y) return 'top';
            if (elem.x + 2 * elemSize > container.width) return 'right';
            if (elem.y + 2 * elemSize > container.height) return 'bottom';
        },
    },

    mounted() {
        (<HTMLElement>document.querySelector('.blog-header')).appendChild(this.app.view);

        this.resizeCanvas();
        this.setRandomDirections();
        this.setRandomSpeeds();
        this.createCircles(this.amountOfCircles, this.app.screen.width, this.app.screen.height, this.circleSize);
        this.setMouseHandlers(this.circles);

        this.app.ticker
            .add(() => this.moveCircles());
            //.add(() => this.hitCheck(this.circles[0], this.circles[1]));

        window.addEventListener('resize', this.resizeCanvas, false);
        this.calcMouseMove();
    }
})
</script>
<style>

</style>
