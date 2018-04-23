import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import Home from 'src/pages/Home'
import Cart from 'src/pages/Cart'
import My from 'src/pages/my/My'
import Catalog from 'src/pages/Catalog'
import CatalogList from 'src/pages/catalog/CatalogList'
import Sku from 'src/pages/catalog/Sku'
import Search from 'src/pages/Search'
import myRouter from './myRouter'

let router = [
  {path: '/jump', component: Jump},
  {path: '/error', component: Err},
  {path: '/home', component: Home},
  {path: '/cart', component: Cart},
  {path: '/my', component: My},
  {path: '/search', component: Search},
  {path: '/catalog', component: Catalog},
  {path: '/catalog/sku/:id', component: Sku},
  {path: '/catalog/list/:id', component: CatalogList}
]
export default [].concat(router).concat(myRouter)
