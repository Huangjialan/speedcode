<template>
  <header class="web-header">
    <div class="navBar">
      <ul>
        <li v-for="nav in navList" >
          <router-link :to="nav.url">
            {{nav.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
  export default {
    data (){
      return {
        navList: [
          {name:"首页",url:"/"},
          {name:"技术文档",url:"/ArticleDetail"},
          {name:"留言板",url:"/leaveNote"},
        ],
      }
    }
  }
</script>

<style lang="less">
  .web-header{
    height: 60px;
    width: 100%;
    padding: 10px 0;
    background: #f5f5f5;
    .navBar{
      width: 600px;
      margin: 10px auto;
      font-size: 20px;
      ul li{
        float: left;
        padding: 0 20px;
      }
    } 
  }
</style>