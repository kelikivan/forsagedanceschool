<template lang="pug">
    .instagram_container
        .instagram_inner-container
            h2.title Наш инстаграм
            a.instagram_link(:href="instaLink" target="_blank")
                InstaLogo
                span Подписаться
            .posts-list(v-if="posts.length")
                a.photo(v-for="post in posts" :href="post.permalink" target="_blank" :key="post.id")
                    .blur
                    img.photo_img(:src="post.media_url", :alt="post.caption")

</template>

<script>
    import axios from 'axios'
    import jsonp from 'jsonp'

    import InstaLogo from '~/assets/img/social/instagram-logo.svg'
    import Data from '~/assets/staticData/contacts.json'

    export default {
        data() {
            return {
                posts: [],
                error: null,
                instaLink: Data.Contacts.Instagram
            }
        },
        components: {
            InstaLogo
        },
        methods: {
            async getPosts(USER_ID, TOKEN) {
                const request = `https://graph.instagram.com/${USER_ID}/media?access_token=${TOKEN}&fields=caption,media_type,permalink,media_url`
                console.log(request)
                await jsonp(request, null, (err, res) => {
                    if (err) {
                        console.error("Возникла ошибка", err.message);
                    } else {
                        console.log(res)
                        // оставляем только последние 6 фотографий профиля
                        this.posts = res.data.splice(0, 6)
                        // res.data && res.data.forEach(item => {
                        //     if (item.caption && item.caption.toLowerCase().match(/#forsagedanceschoolweb/gi))
                        //         this.posts.push(item)
                        // })
                    }
                });
            }
        },
        computed: {

        },
        mounted() {
            // https://www.instagram.com/oauth/authorize/?client_id=715405059086391&redirect_uri=https://forsagedanceschool.ru/&scope=user_profile,user_media&response_type=code
            // токен для доступа к api, при смене пароля менять токен тут https://www.instagram.com/developer/clients/manage/
            // такой ответ после редиректа, нужно взять код и применить его в следующем запросе
            // https://forsagedanceschool.ru/?code=AQAsnwWO_fi6q1ifH6IK3qHyeYAGV0pKQffdSDqP2Fy8uPiE6qq1UVVPbpnP1cCC2I9ceq9L8bRltkVgflYraSya8j5zQVxmndDYe0ovWc7x6jZGsYOzJx6JkSLH9vOKUma5qZkkr6mfMqEAfp5NOMGELMTBeEJh0WdtTL3lXlSeiAVl4ZetElQiUmytQtwEz_KvUBC8mFTCsc_eUwbNNCLOUfHfE_IefqgFmaFl3jCoog#_

            // берём только этот code
            // code AQAsnwWO_fi6q1ifH6IK3qHyeYAGV0pKQffdSDqP2Fy8uPiE6qq1UVVPbpnP1cCC2I9ceq9L8bRltkVgflYraSya8j5zQVxmndDYe0ovWc7x6jZGsYOzJx6JkSLH9vOKUma5qZkkr6mfMqEAfp5NOMGELMTBeEJh0WdtTL3lXlSeiAVl4ZetElQiUmytQtwEz_KvUBC8mFTCsc_eUwbNNCLOUfHfE_IefqgFmaFl3jCoog

            // запрос для краткосрочного маркера (в командной строке):
            /*
            curl -X POST https://api.instagram.com/oauth/access_token -F client_id=715405059086391 -F client_secret=0add86623063b835d859bb2486a0b170 -F grant_type=authorization_code -F redirect_uri=https://forsagedanceschool.ru/ -F code=AQAsnwWO_fi6q1ifH6IK3qHyeYAGV0pKQffdSDqP2Fy8uPiE6qq1UVVPbpnP1cCC2I9ceq9L8bRltkVgflYraSya8j5zQVxmndDYe0ovWc7x6jZGsYOzJx6JkSLH9vOKUma5qZkkr6mfMqEAfp5NOMGELMTBeEJh0WdtTL3lXlSeiAVl4ZetElQiUmytQtwEz_KvUBC8mFTCsc_eUwbNNCLOUfHfE_IefqgFmaFl3jCoog
            */
            // Ответ:
            // {"access_token": "IGQVJYU1VXTzNWQ3k1SS11cXVHZAEdjejF5OWlpVzBMUElaTk1xaFpkb2ZABNjlhNVpHd1RWdm5zQ3RSdFlCamVEeExMT0hOLWlWX0MyRHA1X0ZACdVM4MlJzd09sblBUSEhCUzNHdXNJbUtmYWRHbk5Sa2JfQ25JTGhWQU1n", "user_id": 17841405582621976}

            // далее нужно получить токен с большим временем действия (2 мес)
            // запрос для получения длинного аксесс токена (2 мес) - (в командной строке):
            /*
            curl -i -X GET 'https://graph.instagram.com/access_token ?grant_type=ig_exchange_token &client_secret=0add86623063b835d859bb2486a0b170 &access_token=IGQVJYU1VXTzNWQ3k1SS11cXVHZAEdjejF5OWlpVzBMUElaTk1xaFpkb2ZABNjlhNVpHd1RWdm5zQ3RSdFlCamVEeExMT0hOLWlWX0MyRHA1X0ZACdVM4MlJzd09sblBUSEhCUzNHdXNJbUtmYWRHbk5Sa2JfQ25JTGhWQU1n'
            */
            // Ответ:
            // {"access_token":"IGQVJWRzNrZAEJKT2hZAeExkUDRkRnVwUUhjV2FOR0FaUU9Od3ZAhV2w0YUI5NmtDLWtsWGVfZA2U5UFZAuZAEtCNHVtTXhiREszeFRXamwyX2FUSkJPRUVQRnZAnOXZAFSHlmcmdPdmdmd1p3","token_type":"bearer","expires_in":5184000}%

            const TOKEN = 'IGQVJWS01LaWVlOE0xRjFPbDJCR0lCenF3NkZAucDhUTmNSNDd1c3ZAlWERRQXF2VklPaUJTSjdPMWZARd1UzUXFIbExCRHJZAYl9VVlVFVlpFZAU5TX3RhX2NSZA3JXd3Vrb0JQMVk3eHJLdzhaZAEhyQ1NBawZDZD'
            const USER_ID = '17841405582621976' // id пользователя
            // new https://graph.instagram.com/${USER_ID}/media?access_token=${TOKEN}
            // old https://api.instagram.com/v1/users/${USER_ID}/media/recent/?access_token=${TOKEN}
            this.getPosts(USER_ID, TOKEN);
        },
    }

</script>

<style lang="stylus">
    .instagram_container
        display flex
        justify-content center

    .instagram_inner-container
        width $ContainersWidth
        background whiteInnerBackground
        padding $PaddingContainers
        padding-right 32px // жосткий костыль из за выравнивания флекс-контейнера =(
        .title
            padding-right 32px

        .instagram_link
            display flex
            align-items center
            justify-content center
            text-align center
            margin 15px auto
            color #000
            cursor pointer
            width 170px
            padding-right 32px

            svg
                fill #7F7F7F

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

        .posts-list
            display flex
            justify-content center
            flex-wrap wrap
            max-width 1000px
            margin 0 auto

            .photo
                height 300px
                position relative
                box-sizing border-box
                margin 0 28px 28px 0

                &_img
                    max-width 300px
                    min-width 300px
                    min-height 300px
                    max-height 300px

                .blur
                    position absolute
                    top 0
                    bottom 0
                    left 0
                    right 0
                    display flex
                    justify-content center
                    align-items center
                    &:hover
                        background-color rgba(0,0,0, 0.3)
                        .info
                            display inline-flex

    @media only screen and (max-width 767px)
        .instagram_inner-container
            width $ContainersWidthMobile
            padding $PaddingContainersMobile

            .title
                padding 0

        .instagram_link
            padding-right 0

        .posts-list
            flex-direction column
            align-items center
            .photo
                margin 0 0 28px 0
            .photo:nth-child(n+4)
                display none

</style>
