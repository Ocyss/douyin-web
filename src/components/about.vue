<template>
    <div class="card-client">
        <div class="user-picture">
        </div>
        <p class="name-client"> Ocyss
            <span>Fullstack dev
            </span>
        </p>
        <div class="social-media">
            <a href="mailto:me@ocyss.icu">
                <svg t="1690966318569" class="mail" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="8665">
                    <path
                        d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9c-1.8-1.4-2.8-3.5-2.8-5.7 0-4 3.2-7.2 7.2-7.2h648.8c2.2 0 4.3 1 5.7 2.8 2.4 3.1 1.9 7.6-1.3 10.1z"
                        p-id="8666"></path>
                </svg>
            </a>
            <a href="https://ocyss.icu">
                <svg t="1690966337288" class="blog" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="8804">
                    <path
                        d="M946.5 505L534.6 93.4c-12.5-12.5-32.7-12.5-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-0.1-90.5z"
                        p-id="8805"></path>
                </svg>
            </a>
            <a href="https://github.com/ocyss">
                <svg t="1690966303651" class="github" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="8526">
                    <path
                        d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                        p-id="8527"></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
// https://uiverse.io/abrahamcalsin/grumpy-ape-40

.card-client {
    background: #06072A;
    width: 100%;
    min-height: 11rem;
    border: 3px solid #060796;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    margin-top: 8px;

    &:hover {
        .user-picture {
            width: 4rem;
            height: 4rem;
        }
    }

    .name-client {
        margin: 0;
        margin-top: 8px;
        font-weight: 600;
        font-size: 18px;

        span {
            display: block;
            font-weight: 200;
            font-size: 16px;
        }
    }

    .user-picture {

        overflow: hidden;
        object-fit: cover;
        width: 3.6rem;
        height: 3.6rem;
        border: 2px solid #fff;
        border-radius: 999px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-top: 10px;
        transition: all 0.3s ease;
        background: url("/static/photo.png");
        background-size: 100%;
    }

}

.social-media {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055);

    a {
        width: 24px;
        height: 24px;
        overflow: hidden;
        transition-duration: .3s;

        svg {
            fill: #fff;
        }

        &:hover {
            .mail {
                fill: chartreuse;
            }

            .github {
                fill: aqua;
            }

            .blog {
                fill: crimson;
            }
        }
    }
}
</style>
