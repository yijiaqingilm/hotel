<template>
    <!-- App -->
    <div id="app" class="">
        <Loading></Loading>
        <!-- Statusbar -->
        <f7-statusbar></f7-statusbar>
        <!-- Main Views -->
        <f7-views>
            <f7-view id="main-view" navbar-through :toolbar-fixed="true" :dynamic-navbar="true" main :domCache="false">
                <!-- Navbar -->
                <f7-navbar title="" :back-link="false" sliding></f7-navbar>
                <!-- Pages -->
                <f7-pages>
                    <f7-page>&nbsp;</f7-page>
                </f7-pages>
                <f7-toolbar class="menus" bottom tabbar labels>
                    <f7-link icon="iconfont icon-home" tab-link :active="activeTabbarItem==='home'" text="首页"
                             @click="loadPage('/home')"></f7-link>
                    <f7-link icon="iconfont icon-similar" tab-link :active="activeTabbarItem==='catalog'" text="分类"
                             @click="loadPage('/catalog')"></f7-link>
                    <f7-link icon="iconfont icon-cart" tab-link :active="activeTabbarItem==='cart'" text="购物车"
                             @click="loadPage('/cart')"></f7-link>
                    <f7-link icon="iconfont icon-my" tab-link :active="activeTabbarItem==='my'" text="我的"
                             @click="loadPage({url:'/my'})"></f7-link>
                </f7-toolbar>

            </f7-view>
        </f7-views>
    </div>
</template>
<script>
  import Loading from 'components/loading/loading.vue'

  function reConstructBinaryTree (pre, vin) {
    if (pre.length > 1) {
      let root = pre[0]
      let rootIndex = vin.indexOf(root)
      let vinLeft = vin.slice(0, rootIndex)
      let vinRight = vin.slice(rootIndex + 1)
      pre.shift()
      let preLeft = pre.slice(0, vinLeft.length)
      let preRight = pre.slice(vinLeft.length)
      return {
        val: root,
        left: reConstructBinaryTree(preLeft, vinLeft),
        right: reConstructBinaryTree(preRight, vinRight)
      }

    } else if (pre.length === 1) {
      return {
        val: pre[0],
        left: null,
        right: null
      }
    }
  }

  // console.log(reConstructBinaryTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]))

  // 暴力查找 n次
  function minNumberInRotateArray (rotateArray) {
    // write code here
    if (rotateArray.length > 0) {
      return Math.min(...rotateArray)
    } else {
      return 0
    }
  }

  // 二分法查询 逻辑判断 该值左侧为空或递增 右侧为空或递增 那么该值为最小
  // ？二分法时， 左侧或右侧为空时 是否只有2个值或一个值？？ 诺成立 ==》 那么直接采用交换法拿值
  /* if ((mind - 1 < 0 || rotateArray[mind - 1] > rotateArray[mind]) && (mind + 1 >= high || rotateArray[mind + 1] > rotateArray[mind])) {
    return rotateArray[mind]
  } else if ((mind - 1 < 0 || rotateArray[mind - 1] < '?') && (mind + 1 >= high || rotateArray[mind + 1] < rotateArray[mind])) {
    low++
  }*/  //  2,2,1,2 非递增数列？ 2,1,2,3,2,2,2,2,2   1 2 2 1
  function minNumberInRotateArray2 (rotateArray) {
    // write code here
    if (rotateArray.length > 1) {
      let low = 0
      let len = rotateArray.length
      let high = len - 1
      let mind
      while (low <= high) {
        mind = Math.floor((low + high) / 2)
        if (high - low === 1) {
          return Math.min(rotateArray[high], rotateArray[low])
        }
        if (rotateArray[low] === rotateArray[mind] && rotateArray[high] === rotateArray[mind]) {
          return Math.min(...rotateArray.slice(low, high + 1))
        }
        if (rotateArray[mind] >= rotateArray[low]) {
          low = mind
        } else {
          high = mind
        }
      }
    } else if (rotateArray.length === 1) {
      return rotateArray[0]
    } else {
      return 0
    }

  }

  // 反例：1,4,7,8,10, 12,18,30 ==> 12,18,30,1,4,7,8,10 ==>  10,12,18,30,1
  // -------------------------------- 0  1  2  3  4  5
  let createArr = function () {
    let arr = []
    arr[0] = 0
    arr[1] = 1
    for (let i = 2; i < 30; i++) {
      arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr.slice(3)
  }
  let arr = createArr()
  let index = 10
  arr.push(...arr.splice(0, index))
  console.log(arr)
  console.log(minNumberInRotateArray2(arr), 'minNumberInrotateArray') // =>1,2,3,4,5

  function jumpFloorII (number) {
    // write code here
    let arr = []
    let map = {0: 1, 1: 3, 2: 7}
    arr[0] = 1
    arr[1] = 2
    arr[2] = 4
    for (let i = 3; i <= number; i++) {
      arr[i] = map[i - 1] + 1
      map[i] = arr[i] + map[i - 1]
    }
    return arr[number]
  }

  console.log(jumpFloorII(5))

  function NumberOf1 (n) {
    // write code here
    n.toString(2).split('0').join('').length
  }

  export default {
    data () {
      return {}
    },
    created: function () {
    },
    methods: {
      loadPage (url) {
        this.$router.loadPage(url)
      }
    },
    computed: {
      activeTabbarItem () {
        return this.$store.state.activeTabbarItem
      }
    },
    components: {Loading}
  }
</script>
<style lang="scss" type="text/css">
    @import "css/global.scss";
</style>
