<template lang="pug">
    .partners_container
        h2.title.title-partners Партнеры
        .swiper-container
            .swiper-wrapper
                a.swiper-slide(v-for="partner in partners" :href="partner.Link ? partner.Link : null" target="_blank")
                    img(:src="getImg(partner.ImagePath)" v-if="partner.ImagePath")
                    .text(v-if="partner.Name" v-html="partner.Name")
            .swiper-pagination
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
            const sw = new Swiper('.swiper-container', {
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
                    el: '.swiper-pagination'
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

        .swiper-container
            width 100%
            padding 5px

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

            .swiper-pagination
                bottom 5px !important

    .company
            opacity 0.5
            font-family $LucidaGrandeFont
            font-size 11px
            font-weight bold
            color whiteMain
            margin-bottom 5px

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

    @media only screen and (max-width 767px)
        .partners_container
            padding $PaddingContainersMobile
            //.swiper-slide
            //    display flex
            //    align-items center
            //    justify-content center
            //    margin 5px 5px
            //    img
            //        width 60px

</style>
