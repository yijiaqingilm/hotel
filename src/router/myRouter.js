import AddressList from 'pages/my/address/AddressList'
import AddressAdd from 'pages/my/address/AddressAdd'
import Province from 'pages/my/address/Province'
import City from 'pages/my/address/City'
import Profile from 'pages/my/profile/Profile'

import Avatar from 'pages/my/profile/Avatar'
import MyCity from 'pages/my/profile/City'
import Mobile from 'pages/my/profile/Mobile'
import NickName from 'pages/my/profile/NickName'
import Sex from 'pages/my/profile/Sex'

import More from 'pages/my/more/More'
import About from 'pages/my/more/About'
import Qa from 'pages/my/more/Qa'
import License from 'pages/my/more/License'

import Order from 'pages/my/order/Order'
import Finish from 'pages/my/order/Finish'

let myRouter = [
  {path: '/my/address/list', component: AddressList},
  {path: '/my/address/add', component: AddressAdd},
  {path: '/my/address/province', component: Province},
  {path: '/my/address/city', component: City},
  {path: '/my/profile', component: Profile},
  {path: '/my/profile/avatar', component: Avatar},
  {path: '/my/profile/city', component: MyCity},
  {path: '/my/profile/mobile', component: Mobile},
  {path: '/my/profile/nickName', component: NickName},
  {path: '/my/profile/sex', component: Sex},

  {path: '/my/more', component: More},
  {path: '/my/more/about', component: About},
  {path: '/my/more/license', component: License},
  {path: '/my/more/qa', component: Qa},

  {path: '/my/order', component: Order},
  {path: '/my/order/finish', component: Finish}
]
export default myRouter
