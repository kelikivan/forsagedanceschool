<template lang="pug">
    .schedule_container
        .schedule_inner-container
            h2.title Расписание занятий
            .shedule-table
                .halls-switch
                    .hall(
                        v-for="(hall, index) in shedule.Halls",
                        :class="{active: index === activeHall}",
                        @click="selectHall(index)"
                    ) {{hall.HallName}}
                .halls-schedule
                    .schedule
                        .days
                            .days-slider_mobile
                                .item(v-for="(hall, indexDay) in shedule.Halls[activeHall].HallSchedule"
                                    @click="selectDay(indexDay)"
                                    :class="{active: indexDay === activeDay, current: indexDay === activeDayDesktop}") {{dayShort[indexDay]}}
                            .day.empty
                                .cell.day_head
                                .day_schedule(v-for="(time, index) in scheduleTimes")
                                    .cell.time {{time.time}}

                            .day(v-if="scheduleHallByDay.length"
                                v-for="(hall, indexDay) in shedule.Halls[activeHall].HallSchedule"
                                :class="['day-'+indexDay, { visible: indexDay === activeDay}]")

                                .cell.day_head(:class="{active: indexDay === activeDayDesktop}") {{hall.WeekDay}}
                                .day_schedule(v-for="(daySchedule, index) in scheduleHallByDay[activeHall][indexDay].fullShedule")
                                    .cell.cell_schedule
                                        div(v-if="daySchedule.lesson"
                                            :style="{ height: calcHeight(daySchedule.lesson.diff), top: daySchedule.lesson.offset }")
                                            span.name(v-html="daySchedule.lesson.Name")
                                            span.teacher(v-html="daySchedule.lesson.Teacher")
                                            span.start(v-html="daySchedule.lesson.LessonStart + '-' + daySchedule.lesson.LessonEnd")
                    Button(name="ЗАПИСАТЬСЯ" type="small", :clickAction="() => {$emit('open', 'feedback')}")

</template>

<script>
    import Button from '@/components/commons/Button.vue'
    import Shedule from '~/assets/staticData/schedule.json'

    const scheduleTimes = [
        { id: 1, time: '09:00', },
        { id: 2, time: '10:00', },
        { id: 3, time: '11:00', },
        { id: 4, time: '12:00', },
        { id: 5, time: '13:00', },
        { id: 6, time: '14:00', },
        { id: 7, time: '15:00', },
        { id: 8, time: '16:00', },
        { id: 9, time: '17:00', },
        { id: 10, time: '18:00', },
        { id: 11, time: '19:00', },
        { id: 12, time: '20:00', },
        { id: 13, time: '21:00', },
        { id: 14, time: '22:00', }
    ];

    const dayShort = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

    export default {
        data() {
            return {
                shedule: Shedule,
                activeHall: 0,
                activeDay: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1 ,
                activeDayDesktop: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1 ,
                scheduleTimes: scheduleTimes,
                scheduleHallByDay: [],
                dayShort: dayShort,
                elCellHeight: 80,
            }
        },
        components: {
            Button
        },
        methods: {
            // select active hall
            selectHall(index) {
                this.activeHall = index
                this.scheduleHallByDay = this.calculateScheduleTable(index)
            },
            // select active day in week
            selectDay(index) {
                this.activeDay = index
            },
            // Вычитание времени
            subtractiontime(h1, h2) {
                const rang = Number(h2.replace(':','')) -  Number(h1.replace(':',''))
                let diff = 1;
                switch (rang) {
                    case 130: diff = 1.5
                        break
                    case 170: diff = 1.5
                        break
                    case 200: diff = 2
                        break
                    case 230: diff = 2.5
                        break
                    case 270: diff = 2.5
                        break
                    case 300: diff = 3
                        break
                    default: diff = 1
                        break
                }
                return diff
            },
            calcHeight(heightCell) {
                return `${(this.elCellHeight * heightCell) - 1}px`
            },

            calculateScheduleTable(index) {
                let arr = this.shedule.Halls.map((hall) => hall.HallSchedule)

                arr[index].forEach((dayWeek, indexHall) => { // перебираем все дни в каждом зале
                    dayWeek.fullShedule = JSON.parse(JSON.stringify(scheduleTimes))
                    dayWeek.fullShedule.forEach((shed, shedIndex) => { // перебираем все полное распиание для каждого дня
                        dayWeek.Groups.forEach((lesson, lessonIndex) => { // перебираем все расписание  для каждого дня
                            if (lesson.LessonStart.slice(0,2) === shed.time.slice(0,2)) {
                                if (lesson.LessonStart.slice(3,5) === '30') {
                                    lesson.offset = `${this.elCellHeight/2}px`
                                }

                                lesson.diff = this.subtractiontime(lesson.LessonStart, lesson.LessonEnd)

                                shed.lesson = lesson
                            }
                        })
                    })
                })
                return arr
            },

            visible: (el1, el2) => {
                const targetPositionEl1 = {
                    top: window.pageYOffset + el1.getBoundingClientRect().top,
                    bottom: window.pageYOffset + el1.getBoundingClientRect().bottom,
                }

                const targetPositionEl2 = {
                    top: window.pageYOffset + el2.getBoundingClientRect().top,
                    bottom: window.pageYOffset + el2.getBoundingClientRect().bottom,
                }

                const windowPosition = {
                    top: window.pageYOffset,
                    bottom: window.pageYOffset + document.documentElement.clientHeight,
                };

                if (targetPositionEl1.bottom < targetPositionEl2.top || targetPositionEl1.bottom >= targetPositionEl2.bottom) {
                    el1.style.position = 'absolute'
                    el1.style.top = `-${el1.offsetHeight}px`
                } else if (windowPosition.top > targetPositionEl1.top
                    && targetPositionEl1.bottom <= targetPositionEl2.bottom
                    && windowPosition.top < targetPositionEl2.bottom - el1.offsetHeight) {
                    el1.style.position = 'fixed'
                    el1.style.top = `${-el1.offsetHeight + el1.offsetHeight}px`

                }

            },
            listener() {
                this.scheduleHallByDay = this.calculateScheduleTable(this.activeHall)
            }
        },
        mounted() {
            window.addEventListener('resize', this.listener);

            this.elCellHeight = document.getElementsByClassName('day_schedule')[0].offsetHeight
            this.scheduleHallByDay = this.calculateScheduleTable(this.activeHall)

            const elHead = document.getElementsByClassName('days-slider_mobile')[0]
            const elTable = document.getElementsByClassName('schedule')[0]
            // Запускаем функцию при прокрутке страницы
            document.addEventListener('scroll', () => {
                this.visible(elHead, elTable);
            });
            this.visible(elHead, elTable);
        },
        destroyed() {
            window.removeEventListener('resize', this.listener);
        }
    }

</script>

<style lang="stylus">
    $borderCell = 1px solid #d9d9d9

    .schedule_container
        display flex
        justify-content center

    .schedule_inner-container
        width $ContainersWidth
        background whiteInnerBackground
        padding $PaddingContainers
        padding-bottom 0

        h2.title
            margin-bottom 28px

    .halls-switch
        display flex
        justify-content center
        z-index 1
        .hall
            font-size $FontSize16
            font-family $FuturaFont
            font-weight bold
            letter-spacing 0.3px
            color #c0c0c0
            border-bottom 2px solid #c0c0c0
            padding 5px 9px
            text-align center
            cursor pointer
            &.active
                color orangeMain
                border-color orangeMain

    .halls-schedule
        text-align center
        margin-top 25px
        display flex
        flex-direction column
        align-items center

        button
            margin-top 30px
            margin-bottom 30px

        .schedule
            display inline-flex
            border-top $borderCell
            border-right $borderCell

            .days
                display inline-flex
                font-size 12px
                position relative
                box-shadow 0 1px 10px 0 rgba(0, 0, 0, 0.4)

                .days-slider_mobile
                    display none

                .cell
                    border-bottom $borderCell
                    border-left $borderCell
                    height 80px

                    &.cell_schedule
                        height 80px

                        div
                            position relative
                            height 100%
                            background #f5f4f4
                            outline $borderCell
                            display flex
                            flex-wrap wrap
                            flex-direction column
                            justify-content space-between
                            padding 10px 5px

                            .name
                                font-size 12px
                                font-weight bold

                            .teacher
                                opacity 0.5
                                font-family $LucidaGrandeFont
                                font-size 10px
                                font-weight bold

                            .start
                            .finish
                                font-size 11px
                                font-family $LucidaGrandeFont
                                font-weight bold

                            span
                                width 100%

                .day
                    text-align center
                    width 106px

                    .cell.time
                        display flex
                        align-items center
                        justify-content center
                        font-family $ProximaNovaFont
                        font-size 16px
                        letter-spacing 0.4px

                    .day_head
                        font-family $FuturaFont
                        font-size 11px
                        font-weight bold
                        letter-spacing 0.2px
                        color #b0b0b0
                        display flex
                        align-items center
                        justify-content center
                        height 47px
                        &.active
                            color orangeMain


    @media only screen and (max-width 1200px)
        .halls-schedule
            margin-top 50px
            .schedule
                width 100%
                .days
                    width 100%
                    .days-slider_mobile
                        position absolute
                        left 0
                        right 0
                        top -45px
                        background-color whiteMain
                        display flex
                        justify-content space-evenly
                        align-items center
                        height 45px
                        border-bottom 1px solid #d9d9d9
                        border-top 1px solid #d9d9d9
                        z-index 1

                        .item
                            display flex
                            align-items center
                            justify-content center
                            width 30px
                            height 30px
                            color #d9d9d9
                            border 1px solid #d9d9d9
                            border-radius 50%
                            cursor pointer
                            font-family $FuturaFont
                            &.current
                                color green
                                border-color green
                            &.active
                                color orangeMain
                                border-color orangeMain
                    .cell.day_head
                        display none

                    for index in 0..6
                        .day-{index}
                            min-width 300px
                            width 100%
                            display none
                    .visible
                        display block

    @media only screen and (max-width 767px)
        .schedule_inner-container
            width $ContainersWidthMobile
            padding 0
            padding-top $PaddingContainersMobile

        .halls-schedule
            .schedule
                .days
                    box-shadow none

                    .cell
                        border-bottom $borderCell
                        border-left $borderCell
                        height 50px

                        &.cell_schedule
                            height 50px

                            div
                                flex-direction row
                                justify-content space-around
                                align-items center

                                .name
                                    order 2

                                .teacher
                                    order 3

                                .start
                                .finish
                                    order 1
                                span
                                    width auto

    @media only screen and (max-width 480px)
        .halls-schedule
            .schedule
                .days
                    for index in 0..6
                        .day-{index}
                            min-width 240px

    @media only screen and (max-width 380px)
        .halls-schedule
            .schedule
                .days
                    for index in 0..6
                        .day-{index}
                            min-width 200px
                    .day.empty
                        min-width 60px

</style>
