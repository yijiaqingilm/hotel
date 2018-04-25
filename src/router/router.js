import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import Home from 'src/pages/Home'
import Detail from 'src/pages/hotelDetail'
import Book from 'src/pages/Book'

const router = [
  {path: '/jump', component: Jump},
  {path: '/error', component: Err},
  {path: '/home', component: Home},
  {path: '/hotel/:id', component: Detail},
  {path: '/book', component: Book}
]
export default [].concat(router)
