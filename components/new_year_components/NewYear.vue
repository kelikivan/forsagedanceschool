<template lang="pug">
    .new_year_container
        .new_year_inner-container
            .new_year-top
                h1.title.title-text New Year Online
                    .line
            .new_year_video
                div
                    iframe(:src="videoUrl"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen)
            //.new_year_button
                //Button(name="РОЗЫГРЫШ" type="small" :clickAction="() => {$emit('open', 'new-year')}")
</template>

<script>
import Button from '@/components/commons/Button.vue'

export default {
    data() {
        return {
            videoUrl: 'https://www.youtube.com/embed/F3Zn2xhpYLw?rel=0'
        }
    },
    props: ['open'],
    components: {
        Button
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
}

</script>

<style lang="stylus">
.new_year_inner-container
    background-color #000
    background-image url('~assets/img/backgrounds/new-year.png')
    background-position 50%
    background-repeat no-repeat
    background-size cover
    padding $PaddingContainers
    padding-bottom 30px

    .new_year-top
        margin-bottom 10px
        .title-text
            max-width 600px
            padding-top 35px
            padding-bottom 20px
            position relative
            margin 0 auto

            .line
                width 118px
                height 5px
                position absolute
                background orangeMain
                top 30px
                right 0

    .new_year_video
        div
            position relative
            margin 0 auto
            width 60%
            padding-bottom 30%
            padding-top 20px
            height 0

            iframe
                position absolute
                top 0
                left 0
                width 100%
                height 100%

    //.new_year_button
    //    text-align center
    //    button
    //        border 1px solid orangeMain
    //        margin-top 30px

@media only screen and (max-width 1500px)
    .new_year_inner-container
        background-image url('~assets/img/backgrounds/new-year.png')
@media only screen and (max-width 1000px)
    .new_year_inner-container
        background-image url('~assets/img/backgrounds/new-year.png')
@media only screen and (max-width 767px)
    .new_year_inner-container
        width $ContainersWidthMobile
        padding $PaddingContainersMobile
@media only screen and (max-width 450px)
    .new_year_inner-container
        background-image url('~assets/img/backgrounds/new-year.png')
        .new_year-top
            .title-text
                padding-top 0
                max-width 450px

                .line
                    top 0

    .new_year_video
        div
            width 100%
            padding-bottom 48%

</style>
