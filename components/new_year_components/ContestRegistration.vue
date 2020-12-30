<template lang="pug">
    .registration_container
        h2.title.title-feedback {{statusSuccess ? 'ПОЗДРАВЛЯЕМ!' : 'РОЗЫГРЫШ'}}
        h3.title(v-html="statusSuccess && emailStatus ? emailStatus : formDesc")
        h3.title.title-phrase(v-html="statusSuccess && emailStatus ? phrases[activePhraseID].phrase: ''")
        Gift
        form(v-if="!statusSuccess" v-on:submit.prevent="submitForm()")
            .input
                input(type="text" :class="{error: !name && errorName}" v-model="name" placeholder="ФИО")
            .input
                input(type="text" :class="{error: !phone && errorPhone}" v-model="phone" placeholder="Номер телефона")
            .input
                input(type="text" :class="{error: !insta && errorInsta}" v-model="insta" placeholder="Инстаграмм (@melky_forsage)")

            .error_text(v-if="(!name && errorName) || (!phone && errorPhone) || (!insta && errorInsta)") Заполните обязательные поля
                div
            Button(name="ЗАРЕГИСТРИРОВАТЬСЯ" type="small")
            .lds-dual-ring(v-if="preload")
            .message(v-if="emailStatus") {{ emailStatus }}
            .message.err(v-if="emailStatusErr") {{ emailStatusErr }}

        h3.title.title-phrase Подробности розыгрыша в нашем инстаграме!

</template>

<script>
import Button from '@/components/commons/Button.vue'
import * as emailjs from 'emailjs-com/dist/email'
import Gift from 'assets/img/gift.svg'
import Contacts from 'assets/staticData/contacts.json'

const phrases = [
    { id: 1, phrase: 'Forsage Dance School - крутая школа ...' },
    { id: 2, phrase: 'Хип-хоп, брейк данс и даже вог ...' },
    { id: 3, phrase: 'Школа танцев наша класс ...' },
    { id: 4, phrase: 'Чемпионаты и соревы ...' },
    { id: 5, phrase: 'Кто танцевал - тот всё поймёт ...' },
    { id: 6, phrase: 'Победы ради можем мы ...' },
    { id: 7, phrase: 'Танцуй всегда, танцуй везде ...' },
    { id: 8, phrase: 'Тренироваться - это кайф ...' },
    { id: 9, phrase: 'Фраза 9' },
    { id: 10, phrase: 'Фраза 10' }
];

export default {
    data() {
        return {
            name: '',
            phone: '',
            insta: '',
            errorName: false,
            errorPhone: false,
            errorInsta: false,
            phrases: phrases,
            activePhraseID: 0,
            formDesc: 'Регистрация для участия в розыгрыше! Обязательно заполните все поля.',
            emailStatus: '',
            emailStatusErr: '',
            phoneNumber: Contacts.Contacts.Phone,
            preload: false,
            statusSuccess: false,
        }
    },
    components: {
        Button,
        Gift,
    },
    methods: {
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        submitForm() {
            this.emailStatus = ''
            this.emailStatusErr = ''

            const data = {
                service_id: 'forsage_service',
                template_id: 'template_5nppjkg',
                user_id: 'user_JaUNu8x9vuWUpoOfjGNgp',
                template_params: {
                    'name': this.name,
                    'phone': this.phone,
                    'insta': this.insta
                }
            };

            if (!this.name) {
                this.errorName = true
            }

            if (!this.phone) {
                this.errorPhone = true
            }

            if (!this.insta) {
                this.errorInsta = true
            }

            if (this.phone && this.name && this.insta) {
                this.errorName = false
                this.errorPhone = false
                this.errorInsta = false

                this.preload = true
                emailjs.send(data.service_id, data.template_id, data.template_params, data.user_id)
                    .then((res) => {
                        this.emailStatus = 'Первый этап розыгрыша по EASY&nbsp;WAY завершен.<br/><br/>Для выполнения HARD&nbsp;WAY придумайте рифму&nbsp;к&nbsp;фразе:'
                        this.name = ''
                        this.phone = ''
                        this.insta = ''
                        this.preload = false
                        this.statusSuccess = true
                    }, (error) => {
                        this.emailStatusErr = `Что-то пошло не так, попробуйте позже или свяжитесь с нами по телефону ${phoneNumber}`
                        this.preload = false
                        this.statusSuccess = false
                    });
            }
        }
    },
    computed: {

    },
    async created() {

    },
    mounted() {
        this.statusSuccess = false;
        this.activePhraseID = this.getRandomInt(0, 7);
    },
    destroyed() {
        this.statusSuccess = false;
        this.activePhraseID = 0;
    }
}

</script>

<style lang="stylus">
.registration_container
    text-align center

    h2.title-feedback
        color #000
        margin-bottom 20px

    h3.title
        color orangeMain
    h3.title-phrase
        color #000
        margin 20px

    svg
        width 70px
        height  70px
        path
            stroke orangeMain !important


    form
        display flex
        align-items center
        flex-direction column
        position relative

        .error_text
            position absolute
            bottom 55px
            color #e62117

        input
            color #000
            border 1px solid #c0c0c0
            outline none
            font-size 18px
            border-radius 30px
            width 65%
            max-width 500px
            padding 10px 20px 11px
            cursor pointer
            &.error
                border-color #e62117
                color #e62117
                &::placeholder
                    color #e62117
            &:focus
            &:hover
                border 1px solid orangeMain

        .input
            width 100%
            margin-bottom 20px

            &:nth-child(3)
                margin-bottom 50px
        .message
            position relative
            top 10px
            color green
            &.err
                color #ff0000

.lds-dual-ring {
    display: inline-block;
    width: 25px;
    height: 25px;
    position relative
    top 10px
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 25px;
    height: 25px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid orangeMain;
    border-color: orangeMain transparent orangeMain transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@media only screen and (max-width 767px)
    .registration_container
        padding $PaddingContainersMobile

@media only screen and (max-width 500px)
    .registration_container
        padding $PaddingContainersMobile
        form
            input
                width 100%
</style>

