<template lang="pug">
    .container
        //Падение снежинок
        //let-it-snow(v-bind="snowConf" :show="show")

        section#header
            Header(@open="openPopup")
        section#description
            Description(@open="openPopup")
        section#teachers
            Teachers
        section#styles
            Styles
        section#news
            News
        section#teams
            Teams
        section#schedule
            Schedule(@open="openPopup")
        section#projects
            Projects
        //section#instagram
            Instagram
        //section#newyear
            NewYear(@open="openPopup")
        section#contacts
            Contacts(@open="openPopup")
        section#partners
            Partners
        section#popup
            Popup(:isOpenPopup="isOpenPopup", @close="closePopup", :component="component")
        .button_top(@click="scrollToHead()")
            Top

</template>

<script>
    import zenscroll from 'zenscroll'

    import Header from '~/components/Header.vue'
    import Description from '~/components/Description.vue'
    import Teachers from '~/components/Teachers.vue'
    import Styles from '~/components/Styles.vue'
    import News from '~/components/News.vue'
    import Instagram from '~/components/Instagram.vue'
    import Partners from '~/components/Partners.vue'
    import Contacts from '~/components/Contacts.vue'
    import Schedule from '~/components/Schedule.vue'
    import Popup from '@/components/commons/Popup.vue'
    import Teams from '~/components/Teams.vue'
    import Projects from '~/components/Projects.vue'
    import NewYear from '@/components/new_year_components/NewYear.vue'

    import Top from '~/assets/img/arrow.svg'

    export default {
        data() {
          return {
              isOpenPopup: false,
              component: '',
              snowConf: {
                  windPower : 1,
                  speed : 2,
                  count : 12,
                  size : 10,
                  opacity : 1,
                  images: ['https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png',
                      //'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png',
                      //'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png'
                  ]
              },
              show: false
          }
        },
        methods: {
            closePopup() {
                this.isOpenPopup = false
                const elem = document.getElementsByTagName('body')[0].style
                elem.overflow = 'inherit'
                setTimeout(() => { this.component = '' }, 500)
            },
            openPopup(component = '') {
                this.component = component
                this.isOpenPopup = true
                const elem = document.getElementsByTagName('body')[0].style
                elem.overflow = 'hidden'
            },
            scrollToHead() {
                zenscroll.to(document.getElementById('header'))
            },
        },
        components: {
            Header,
            Description,
            Teachers,
            Styles,
            News,
            Instagram,
            Partners,
            Contacts,
            Schedule,
            Popup,
            Top,
            Teams,
            Projects,
            NewYear
        },
        mounted() {
            this.show = true;
            const headerHeight = document.getElementsByClassName('header_container')[0].offsetHeight
            const topButton = document.getElementsByClassName('button_top')[0]
            window.addEventListener('scroll', () => {
                if (window.scrollY > headerHeight) {
                    topButton.style.display = 'flex'
                } else {
                    topButton.style.display = 'none'
                }
            });
        },
    }
</script>

<style lang="stylus">
    .container
        background-color grayBackground
        margin 0 auto
        position relative
    .button_top
        position fixed
        bottom 30px
        right 20px
        width 45px
        height 45px
        border-radius 30px
        display none
        justify-content center
        align-items center
        cursor pointer
        border 1px solid orangeMain
        background orangeMain
        z-index 10
        &:hover
            background whiteMain
            svg
                stroke-width 10px
                fill orangeMain
        svg
            transform rotate(180deg) scale(.8)
            fill whiteMain

</style>
