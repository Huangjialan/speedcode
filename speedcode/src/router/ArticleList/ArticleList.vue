<template>
  <div class="articleList-div">
    <div class="articleList">
      <div v-for="(art,i) in articleList" class="articleBox">
        <h2><a class="title" v-text="art.title" @click="toDetail(art.id)"></a></h2>
        <small>{{art.time}} by 刘曦 阅读1123次</small>
        <div class="articleContent" v-html="art.body"></div>
        <span class="readAll" @click="toDetail(art.id)">阅读全文...</span>
        <p>标签：{{art.key}} | 评论(0)</p>
      </div>
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="right-box">
      <personNote/>
      <Category ref="category"/>
    </div>
 </div>  
</template>

<script>
  import personNote from '@/components/ui/personNote/personNote.vue';
  import Category from '@/components/ui/Category/Category.vue';

  export default {
    data () {
      return {
        articleList: [],
        totalCount: 1,
      }
    },
    components: {
      personNote,
      Category,
    },
    mounted (){
      this.init();
    },
    methods: {
      init (){
        this.$axios.get('http://47.104.73.125:81/api/article').then((res)=>{
          if (!!res) {
            this.articleList = res.data.data;
            this.totalCount = res.data.count;
            if (!sessionStorage.getItem('categoryList')){
              sessionStorage.setItem('categoryList',JSON.stringify(res.data.hot));
              this.$refs.category.init();
            }
          }
        });
      },
      toDetail (id) {
        this.$router.push({path:"/ArticleDetail",query:{id:id}});
      }
    }
  }
</script>

<style lang="less">
  .articleList-div{
    display: flex;
    .articleList{
      flex: 1;
      padding: 20px 30px;
      margin-right: 20px;
      background: #fff;
      margin-bottom:20px;
      border-radius: 10px;
      .articleBox{
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #DCDFE6;
      }
      pre{
        border: 1px solid sandybrown;
        background: chocolate;
      }
      .title{
        font-size: 24px;
        color: #527ED1;
        cursor: pointer;
      }
      small{
        margin-top: 10px;
      }
      .articleContent{
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 5px;
      }
      .pagination-box{
        text-align: center;
      }
      .readAll{
        font-size: 14px;
        color: #34538b;
        font-weight: bold;
        cursor: pointer;
      }
      .title:hover,.readAll:hover{
        text-decoration: underline;
      }
    }
    .right-box{
      width: 300px;
    }
  }
  @media (max-width: 1000px) {
    .articleList-div {
      display: block;
      .articleList{
        margin-right: 0;
      }
      .right-box{
        width: 100%;
      }
    }
    
  }
</style>