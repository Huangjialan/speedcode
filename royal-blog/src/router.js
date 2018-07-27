import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

const ArticleList = r => require.ensure([], () => r(require('./router/ArticleList/ArticleList.vue')), 'Others');
const ArticleDetail = r => require.ensure([], () => r(require('./router/ArticleDetail/ArticleDetail.vue')), 'Others');
const LeaveNote = r => require.ensure([], () => r(require('./router/LeaveNote/LeaveNote.vue')), 'Others');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/ArticleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/LeaveNote',
      name: 'LeaveNote',
      component: LeaveNote
    },
  ]
})
