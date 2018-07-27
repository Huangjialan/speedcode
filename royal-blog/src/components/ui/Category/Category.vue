<template>
  <div class="articleCate">
    <div class="cateTitle">文章分类</div>
    <ul>
      <li v-for="list in categoryList"><a @click="gotoCategory(list.id)">{{list.title}}</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        categoryList:[]
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init (){
        this.categoryList = JSON.parse(sessionStorage.getItem('categoryList'));
        console.log('sucess',this.categoryList);
      },
      toDetail (id) {
        this.$router.push({path:"/ArticleDetail",query:{id:id}});
      },
      gotoCategory (id) {
        alert(id);
        this.$router.push({path:"/",query:{id:id}});
      }
    }
  }
</script>
</script>

<style lang="less">
  .articleCate{
      padding: 20px 30px;
      background: #fff;
      margin-bottom:20px;
      border-radius: 10px;
      .cateTitle{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      ul li {
        font-size: 14px;
        line-height: 26px;
        a{
          text-decoration: underline;
        }
      }
    }
</style>