<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left :link-back="true"></f7-nav-left>
            <f7-nav-center>商品名称</f7-nav-center>
        </f7-navbar>
        <!-- <f7-swiper class="g-banner banner" pagination :init="false">
            <f7-swiper-slide><a href="#"><img
                    src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp"></a>
            </f7-swiper-slide>
            <f7-swiper-slide><a href="#"><img
                    src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp"></a>
            </f7-swiper-slide>
            <f7-swiper-slide><a href="#"><img
                    src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp"></a>
            </f7-swiper-slide>
        </f7-swiper>-->
        <section class="calendar">
            <header>房价日历</header>
            <div class="calendar-header">
                <div class="left" @click="preMonth">&lt;</div>
                <div class="center">{{currentYear}}-{{currentMonth}}</div>
                <div class="right" @click="nextMonth">&gt;</div>
            </div>
            <div id="calendar-container"></div>

        </section>
        <section>
            <div>title</div>
            <div>
                <div>xiangqing</div>
                <div>价格：<span class='price'>¥500起</span>/晚</div>
            </div>
        </section>
        <section class='modes'>
            <div>
                <i class="icon"></i>
                <p>wifi</p>
            </div>
            <div>
                <i class="icon"></i>
                <p>2人</p>
            </div>
        </section>
        <section class="facilities">
            <header>房间设施</header>
            <div>
                <div>
                    <i class="icon"></i>
                    <p>吃的</p>
                </div>
                <div>
                    <i class="icon"></i>
                    <p>玩的</p>
                </div>
            </div>
            <footer>查看全部xx项设施</footer>
        </section>
        <section class='other'>
            <header>入住须知</header>
            <div>
                <div>xxx:</div>
                <div>明白</div>
            </div>
        </section>
        <section class='rules'>
            <header>退订政策</header>
            <div>ruxxxxx</div>
        </section>

        <div slot="fixed" class="m-toolbar">
            <f7-grid class="toolbar-inner">
                <f7-col width="100">
                    <f7-button active color="red" @click="toBooking">立即预订</f7-button>
                </f7-col>
            </f7-grid>
        </div>
    </f7-page>
</template>

<script>
  import Calendar from 'lib/calendar'
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import { string2Date } from 'lib/common'

  export default {
    name: 'hotelDetail',
    data () {
      return {
        currentMonth: null,
        currentYear: null,
        currentDate: null,
        nextDate: null,
        calendarContainer: null,
        roomId: 123
      }
    },
    created () {
      // 通过后端拿到当前日历 》？
      let {dispatch} = this.$store
      dispatch({
        type: native.getRoomCalender,
        roomId: this.roomId
      })
      this.currentDate = new Date()
      this.currentYear = this.currentDate.getFullYear()
      this.currentMonth = this.currentDate.getMonth() + 1
      this.nextDate = new Date(this.currentDate)
      this.nextDate.setDate(this.nextDate.getDate() + 1)
    },
    methods: {
      toBooking () {
        if (this.calendarContainer.value && this.calendarContainer.value.length === 2) {
          let [cktime, ottime] = this.calendarContainer.value
          this.$store.dispatch({
            type: native.checkBook,
            cktime,
            ottime,
            roomId: this.roomId
          }).then(({data}) => {
            console.log(data, 'data')
            this.$router.loadPage('/book')
          })

        } else {
          this.$f7.alert('请选择入离日期', '友情提示')
        }

      },
      preMonth () {
        this.calendarContainer.prevMonth()
      },
      nextMonth () {
        this.calendarContainer.nextMonth()
      }
    },
    mounted () {
      this.$nextTick(() => {
        const hBanner = this.$f7.swiper('.g-banner', {
          pagination: '.swiper-pagination',
          speed: 400,
        })
      })
      let monthNames = []
      for (let i = 1; i <= 12; i++) {
        monthNames.push(`${i}月`)
      }
      let dayNames = ['日', '一', '二', '三', '四', '五', '六']
      this.calendarContainer = new Calendar(this.$$, this.$f7, {
        container: '#calendar-container',
        dateFormat: 'yyyy-mm-dd',
        // 查询已经被修改value 不可用
        /* value: [this.currentDate],*/
        weekHeader: true,
        toolbar: false,
        dayNamesShort: dayNames,
        firstDay: 0,
        rangePicker: true,
        roomCalendar: this.roomCalender,
        onOpen: function (p) {
        },
        onMonthYearChangeStart: (p) => {
          this.currentYear = p.currentYear
          this.currentMonth = p.currentMonth + 1
        },
        disabled: (date) => {
          // console.log('分析date', date),得出date从1月的当前日开始
          let [startDateInfo, endDateInfo] = [this.roomCalender[0], this.roomCalender[this.roomCalender.length - 1]]
          let startDate = string2Date(startDateInfo.date)
          let endDate = string2Date(endDateInfo.date)
          let fotmatdateByDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
          let fotmatdateByStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
          let fotmatdateByEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
          if (fotmatdateByDate.getTime() >= fotmatdateByStart.getTime() && fotmatdateByDate <= fotmatdateByEnd) {
            // console.log('分析date', date) 当前日
            // 查询date 在roomCalender中的位置信息。 分析 date是一个递增date，roomcalender同样也是递增date的封装。那么
            // 此处可采用二分法定位第一个date与roomcalender匹配的元素，然后采用递增的方式查询下一个匹配的元素，诺不相同采用插值查询
            // 返回匹配元素的信息,var matchDate = matchDate(date,roomCalender) 解构方法 (roomCalender) =>(date)
            return false
          } else {
            return true
          }
        },
        onDayClick: (p, dayContainer, year, month, day) => {
        }
      })
    },
    computed: {
      ...mapState({
        roomCalender ({hotel}) {
          return hotel.roomCalender[this.roomId]
        }
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>