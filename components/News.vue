<template lang="pug">
    .news_container
        .news_inner-container
            h2.title Последние новости
            a.news-vk_link(:href="vkLink" target="_blank")
                VkLogo
                span Посмотреть все события
            .swiper-container
                .swiper-wrapper
                    a.swiper-slide(v-for="item in news", :href="item.PostLink", target="_blank")
                        img.photo(:src="getImg(item.ImageLink)", :alt="item.Name")
                        .text
                            h3.title.head(v-html="item.Name")
                            .date(v-html="item.Date")
                            .description.text_default(v-html="item.Description")
                .swiper-pagination

</template>

<script>
    import Swiper from 'swiper/bundle';
    import 'swiper/swiper-bundle.min.css'

    import Data from '~/assets/staticData/news.json'
    import DataContacts from '~/assets/staticData/contacts.json'
    import VkLogo from '~/assets/img/social/vk-logo.svg'

    export default {
        data() {
            return {
                news: Data.News,
                vkLink: DataContacts.Contacts.Vk
            }
        },
        components: {
            VkLogo
        },
        methods: {
            getImg(url) {
                if (url.indexOf('http') === -1) {
                    const imageUrl = require('~/assets/' + `${url}`)
                    return url ? `${imageUrl}` : ''
                }
                return url
            },
        },
        computed: {

        },
        created() {

        },
        mounted() {
            const swiper = new Swiper('.swiper-container', {
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
    .news_container
        display flex
        justify-content center

    .news_inner-container
        width $ContainersWidth
        background whiteInnerBackground
        padding $PaddingContainers

    a
        text-decoration none

    .news-vk_link
        display flex
        align-items center
        justify-content center
        text-align center
        margin 15px auto
        color #000
        cursor pointer
        width 170px

        svg
            fill #7f7f7f

        &:hover
            span
                opacity 1
                color orangeMain

            svg
                fill orangeMain

        span
            margin-left 5px
            opacity 0.5
            font-family $LucidaGrandeFont
            font-size 11px
            font-weight bold
            font-style normal
            font-stretch normal
            line-height normal
            letter-spacing normal

    .swiper-container
        width 100%
        padding 5px

        .swiper-wrapper
            a
                display block

            .swiper-slide
                position relative
                max-width 280px
                background grayBackground
                margin 15px
                height 390px
                width 280px
                cursor pointer

                &:hover
                    box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.4);

                .photo
                    min-height 150px
                    max-height 150px
                    min-width 100%

                .text
                    padding 24px

                    .head
                        margin-bottom 7px

                    .date
                        font-family $LucidaGrandeFont
                        font-size 13px
                        font-weight bold
                        color #000
                        margin-bottom 20px
                        opacity 0.5

        .swiper-pagination
            bottom 0 !important

    @media only screen and (max-width 767px)
        .news_inner-container
            width $ContainersWidthMobile
            padding $PaddingContainersMobile

</style>
