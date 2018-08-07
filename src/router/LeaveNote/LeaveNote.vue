<template>
  <div class="container leaveNote border-r" @click="clickEvent">
    <div class="leave">
      <!--<el-input type="textarea" :rows="5" resize="none" placeholder="请输入想您说的话..." v-model="content">-->
      <!--</el-input>-->
      <!--DIV输入框-->
      <div class="editor" v-html="content" @keyup="setContent($event)" contenteditable></div>
      <span class="pcl" v-show="pclShow">{{pcl}}</span>
      <div class="tools">
        <i @click="setB" class="iconfont">&#xe6fe;</i>
        <i @click="setURL" class="iconfont">&#xe63e;</i>
        <i @click="setFACE" class="iconfont">&#xe659;</i>
        <i @click="setREFER" class="iconfont">&#xe65d;</i>
        <ul v-show="showFACE" class="qqbq">
          <li v-for="i in qqbq" ><img @click="inpFACE(i)" :src="'static/img/qqbq/'+(i)+'.gif'" /></li>
        </ul>
        <i @click="setIMG" class="iconfont">&#xe791;</i>
        <i @click="setCODE" class="iconfont">&#xe6b9;</i>
        <el-button @click="showInfo" class="fr">提交留言</el-button>
      </div>
    </div>
    <div class="leave-content">
      <ul class="fl">
        <li v-for="vo in messageList">
          <div class="fl img">
            <a :href="vo.url" target="_blank"><img src="static/img/head.jpg" /></a>
          </div>
          <div class="fl content">
            <h4><a :href="vo.url" target="_blank">{{vo.name}}</a></h4>
            <p v-html="vo.content"></p>
            <span>{{vo.time|timeReturn}}<a class="fr" @click="replyBtn(vo.id,vo.name)" href="#">回复</a></span>
            <!--<i class="iconfont lou">&#xe6f1;{{vo.id}}</i>-->

            <div class="reply" v-for="zo in vo.list">
              <a :href="zo.url" target="_blank"><img src="static/img/head.jpg" /></a>
              <h4><a :href="zo.url" target="_blank">{{zo.name}}</a> 回复: <a :href="vo.url" target="_blank">{{vo.name}}</a></h4>
              <p v-html="zo.content"></p>
              <span>{{zo.time | timeReturn}}
                <a class="fr" @click="pid=zo.id;pcl='回复'+(zo.name || '匿名')+':'" href="#">回复</a>
              </span>
              <div class="reply" v-for="zzo in zo.list">
                <a :href="zzo.url" target="_blank"><img src="static/img/head.jpg" /></a>
                <h4><a :href="zzo.url" target="_blank">{{zzo.name}}</a> 回复: <a :href="zo.url" target="_blank">{{zo.name}}</a></h4>
                <p v-html="zo.content"></p>
                <span>{{zzo.time|timeReturn}} 
                  <!--<i class="iconfont">&#xe61a;</i>{{zzo.region || "未知地点"}} {{zzo.os}} {{zzo.browser}}-->
                </span>
              </div>
            </div>
          </div>
        </li>
        <el-alert v-show="messageList.length==0" title="还没有人评论呢，赶紧来抢沙发吧" type="info" description=" " :closable="false" show-icon></el-alert>
      </ul>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="currentChange"
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="page.size"
      :total="page.count">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="用户昵称" >
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" >
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="博客地址" >
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="postLeave()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        page: {
          count: 0,
          size: 10
        },
        form: {
          name:'',
          email:'',
          url:'',
          qq:''
        },
        article_id: 0,
        content: "",
        content2: "",
        pid: 0,
        pcl: "在这里输入您的留言吧",
        pclShow: true,
        showFACE: false,
        qqbq: [],
        messageList: [],
        user: {
          name: "",
          qq: "",
          url: "",
          email: "",
          show: false,
          pid: ""
        },
        currentPage: 1,
        dialogTableVisible: false,
      }
    },
    created() {
      this.init();
      for(var i = 1; i <= 74; i++) {
        this.qqbq.push(i);
      }
    },
    methods: {
      init () {
        this.$axios.get(`http://47.104.73.125:81/api/leave/comment.html?p=${this.currentPage}&article_id=${this.article_id}`).then((res)=>{
          this.page.count = res.data.count;
          this.messageList = res.data.list;
        });
      },
      clickEvent (e) {
        var target  = e.target.className;
        if(target !== 'qqbq' && target !== 'iconfont'){
          this.showFACE = false;
        }　　
      },
      setContent: function($e) { //模拟双向绑定
        this.content2 = $e.target.innerHTML;
        if(this.content2.length <= 0) {
          this.pclShow = true;
        } else {
          this.pclShow = false;
        }
        console.log("pclShow ",this.pclShow);
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      //加粗
      setB: function() {
        this.$prompt('请输入加粗文字', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        }).then(({
          value
        }) => {
          this.content = this.content2 = this.content2 + "<b>" + value + "</b>";
        });
      },
      //连接
      setURL: function() {
        this.$prompt('请输入URL', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        }).then(({
          value
        }) => {
          var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
          if(!reg.test(value)) {
            this.$message.error('URL错误');
            return;
          }
          this.content = this.content2 = this.content2 + '<a href="' + value + '">' + value + '</a>';
        });

      },
      //显示表情
      setFACE: function() {
        this.showFACE = !this.showFACE;
      },
      //表情
      inpFACE: function(i) {
        this.content = this.content2 = this.content2 + "<img src='./static/img/qqbq/" + i + ".gif'>";
      },
      //引用
      setREFER: function() {
        this.$prompt('请输入引用内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: "textarea",
          showClose: false
        }).then(({
          value
        }) => {
          this.content = this.content2 = this.content2 + "<blockquote>" + value + "</blockquote>";
        });
      },
      //图片
      setIMG: function() {
        this.$prompt('请输入图片地址', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        }).then(({
          value
        }) => {
          var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
          if(!reg.test(value)) {
            this.$message.error('URL错误');
            return;
          }
          this.content = this.content2 = this.content2 + '<img src="' + value + '" />';
        });
      },
      //code
      setCODE: function() {
        this.$prompt('请输入代码内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: "textarea",
          showClose: false
        }).then(({
          value
        }) => {
          this.content = this.content2 = this.content2 + "<pre>" + value + "</pre>";
        });
      },
      //回复
      replyBtn (id,name){
        this.pid=id;
        this.pcl='回复'+(name || '匿名')+':';
      },
      //弹出用户信息框
      showInfo (){
        var self = this;
        if(self.content2.length < 8) {
          self.$message.error('留言内容不得少于8个字');
          return;
        }
        this.dialogTableVisible = true;
      },
      //提交信息
      postLeave (){
        var self = this;
        let params = {
          content: this.content2,
          qq: this.form.qq,
          pid: this.pid,
          article_id:this.article_id,
          name:this.form.name,
          email:this.form.email,
          url:this.form.url
        };
        this.$axios.post('http://47.104.73.125:81/api/leave/add.html',params).then((res)=>{
          if(res.data.code == 1) {
            self.content = "";
            self.content2 = "";
            self.pid = 0;
            self.$message.success("留言成功");
            this.dialogTableVisible = false;
            self.init();
          } else {
            self.$message.error(e.data.msg);
          }
        }).catch(err => {
          self.$message.error(err);
           console.log(err);
        });

      },
      getQqInfo: function(e) {
        var self = this;
        this.$emit("gets", {
          url: '/api/user/qqinfo.html?qq=' + e,
          success: function(e) {
            self.user.name = e.data.name;
            self.user.email = e.data.email;
            self.user.url = e.data.url;
          }
        });
      },
      currentChange (page){
        this.currentPage = page;
        this.init();
      }
    }
  }
</script>

<style>
  .leaveNote{
    padding: 20px 30px;
    background: #fff;
    margin-bottom:20px;
  }
  .userInfo .form{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    background-color: #FFF;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
  }
  .userInfo .form h3{
    margin-bottom: 20px;
  }
  .pcl{
    position: absolute;
    color: #CCC;
    margin-top: -155px;
    margin-left: 10px;
  }
</style>