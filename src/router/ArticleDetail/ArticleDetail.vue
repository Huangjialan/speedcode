<template>
  <div class="articleDetail-div">
    <div class="left-box">
      <div class="articleDetail">
        <div>
          <h2 class="title">了就是的空间是的</h2>
          <small>2018年9月 by 刘曦 阅读1123次</small>
          <div class="articleContent">阿少得可怜<br/>asdasdsad</div>
        </div>
      </div>
      <messageBoard/>  
    </div>    
    <div class="right-box">
      <personNote/>
      <Category/>
    </div>
  </div>
</template>

<script>
import personNote from '@/components/ui/personNote/personNote.vue';
import Category from '@/components/ui/Category/Category.vue';
import messageBoard from '@/components/ui/messageBoard/messageBoard.vue';

  export default {
    components: {
      personNote,
      Category,
      messageBoard
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        let id = this.$route.query.id;
        this.$axios.get('http://47.104.73.125:81/api/article/content?id='+id).then((res)=>{
          if (!!res) {
            this.articleList = res.data.data;
          }
        });
      }
      
    }
  }
</script>

<style lang="less">
  .articleDetail-div{
    display: flex;
    align-items: flex-start;
    .left-box{
      flex: 1;
      margin-right: 20px;
    }
    .articleDetail{
      padding: 20px 30px;
      background: #fff;
      margin-bottom:20px;
      border-radius: 10px;
      .title{
        font-size: 24px;
      }
      small{
        margin-top: 10px;
      }
      .articleContent{
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 20px;
      }
      .pagination-box{
        text-align: center;
      }
    }
    .right-box{
      width: 300px;
    }
  }
  @media (max-width: 1000px) {
    .articleDetail-div {
      display: block;
      .left-box{
        margin-right: 0;
      }
      .right-box{
        width: 100%;
      }
    }
    
  }
</style>