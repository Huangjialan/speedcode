<template>
  <div class="articleDetail-div">
    <div class="left-box">
      <div class="articleDetail border-r">
        <div>
          <h2 class="title" v-text="articleList.title"></h2>
          <small>{{articleList.time}} by {{articleList.author.name}} 阅读{{articleList.view}}次</small>
          <div class="articleContent" v-html="articleList.body" v-highlight></div>
        </div>
      </div>
      <MessageBoard :articleId="id" />
    </div>    
    <div class="right-box">
      <personNote/>
      <HotArticle/>
      <Category/>
    </div>
  </div>
</template>
<script>
  import hljs from 'highlight.js';
  import personNote from '@/components/ui/personNote/personNote.vue';
  import Category from '@/components/ui/Category/Category.vue';
  import HotArticle from '@/components/ui/HotArticle/HotArticle.vue';
  import MessageBoard from '@/components/ui/MessageBoard/MessageBoard.vue';
  export default {
    data (){
      return {
        articleList: {
          author:{},
        },
        id : this.$route.query.id
      }
    },
    components: {
      personNote,
      Category,
      MessageBoard,
      HotArticle
    },
    mounted () {
      this.init();
    },
    watch: {
      "$route"() {
        this.id = this.$route.query.id;
        this.init();
      },
    },
    methods: {
      init () {
        this.$axios.get('http://47.104.73.125:81/api/article/content?id='+this.id).then((res)=>{
          if (!!res) {
            this.articleList = res.data;
          }
        });
      },
    }
  }
</script>

<style lang="less">
  .articleDetail-div{
    display: flex;
    .left-box{
      flex: 1;
      margin-right: 20px;
      overflow: hidden;
    }
    .articleDetail{
      padding: 20px 30px;
      background: #fff;
      margin-bottom:20px;
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
        pre,p,span{
          white-space: pre-wrap;
          word-wrap: break-word;
          word-break: break-word;
        }
      }
      .pagination-box{
        text-align: center;
      }
    }
    .right-box{
      width: 300px;
      overflow: hidden;
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