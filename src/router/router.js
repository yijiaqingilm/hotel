import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import Home from 'src/pages/Home'
import Detail from 'src/pages/GoodsDetail'

const router = [
  {path: '/jump', component: Jump},
  {path: '/error', component: Err},
  {path: '/home', component: Home},
  {path: '/hotel/:id', component: Detail}
]
export default [].concat(router)
