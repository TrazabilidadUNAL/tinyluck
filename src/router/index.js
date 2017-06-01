import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.container.vue'
import AboutUs from '@/components/aboutus/Aboutus.container.vue'
import SignUp from '@/components/signup/SignUp.container.vue'
import Places from '@/components/places/Places.container.vue'
import MyData from '@/components/mydata/MyData.container.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/aboutus', name: 'AboutUs', component: AboutUs},
    {path: '/signup', name: 'SignUp', component: SignUp},
    {path: '/places', name: 'Places', component: Places},
    {path: '/my-data', name: 'MyData', component: MyData}
  ]
})
