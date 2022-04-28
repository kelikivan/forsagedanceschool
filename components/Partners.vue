<template lang="pug">
    .partners_container
        h2.title.title-partners Партнеры
        .swiper-container.partners
            .swiper-wrapper
                a.swiper-slide(v-for="partner in partners" :href="partner.Link ? partner.Link : null" target="_blank")
                    img(:src="getImg(partner.ImagePath)" v-if="partner.ImagePath")
                    .text(v-if="partner.Name" v-html="partner.Name")
            .swiper-pagination.partners
        .company
            | FORSAGE DANCE SCHOOL
            br
            | все права защищены

</template>

<script>
    import Swiper from 'swiper/bundle';
    import 'swiper/swiper-bundle.min.css'

    import InstaLogo from '~/assets/img/social/instagram-logo.svg'
    import Data from '~/assets/staticData/partners.json'

    export default {
        data() {
            return {
                partners: Data.Partners
            }
        },
        components: {
            InstaLogo
        },
        methods: {
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },
        },
        computed: {

        },
        async created() {

        },
        mounted() {
            const sw = new Swiper('.swiper-container.partners', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 20,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: '.swiper-pagination.partners',
                    dynamicBullets: true
                },
                loop: true
            });
        },
    }

</script>

<style lang="stylus">
    .partners_container
        padding $PaddingContainersMobile
        text-align center
        background-image linear-gradient(237deg, #0c1135, #080634)

        h2.title-partners
            color whiteMain

        .swiper-container.partners
            width 1150px

            .swiper-wrapper
                a
                    display block

                .swiper-slide
                    display flex
                    justify-content center
                    align-items center
                    background unset !important
                    margin 15px
                    height unset !important
                    width 280px !important
                    border none

                    .text
                        color whiteMain

                    .swiper-slide-shadow-left
                        background-image unset !important
                    .swiper-slide-shadow-right
                        background-image unset !important

            .swiper-pagination.partners
                bottom 5px !important

                .swiper-pagination-bullet
                    background white
                .swiper-pagination-bullet-active
                    background #e56b2e !important


    .company
            opacity 0.5
            font-family $LucidaGrandeFont
            font-size 11px
            font-weight bold
            color whiteMain
            margin 5px

            svg
                bottom -3px
                position relative

            span
                margin-right 5px
            a
                display inline-flex
                align-items flex-end
                text-decoration underline
                color whiteMain
                &:hover
                    text-decoration none

    @media only screen and (max-width 1220px)
        .partners_container
            .swiper-container.partners
                width 100%
                padding 5px

    @media only screen and (max-width 1110px)
        .partners_container
            .swiper-container.partners
                width 700px

    @media only screen and (max-width 767px)
        .partners_container
            padding $PaddingContainersMobile
            .swiper-container.partners
                width 250px
                .swiper-wrapper
                    .swiper-slide
                        margin 5px 5px

    @media only screen and (max-width 400px)
        .partners_container
            .swiper-container.partners
                width 100%
                padding 5px

</style>
