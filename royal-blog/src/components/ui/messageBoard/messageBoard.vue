<template>
  <div class="container messageBoard-box">
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
        <el-button @click="postLeave" class="fr">提交留言</el-button>
      </div>
    </div>
    <div class="leave-content">
      <ul class="fl">
        <li v-for="vo in messageList">
          <div class="fl img">
            <a :href="vo.url" target="_blank"><img :src="vo.head" /></a>
          </div>
          <div class="fl content">
            <h4><a :href="vo.url" target="_blank">{{vo.name}}</a></h4>
            <p v-html="vo.content"></p>
            <span>{{vo.time}} <i class="iconfont">&#xe61a;</i>{{vo.region || "未知地点"}} {{vo.os}} {{vo.browser}}
                <a class="fr" @click="pid=vo.id;pcl='回复'+(vo.name || '匿名')+':'" href="#">回复</a></span>
            <i class="iconfont lou">&#xe6f1;{{vo.id}}</i>

            <div class="reply" v-for="zo in vo.list">
              <a :href="zo.url" target="_blank"><img :src="zo.head" /></a>
              <h4><a :href="zo.url" target="_blank">{{zo.name}}</a> 回复: <a :href="vo.url" target="_blank">{{vo.name}}</a></h4>
              <p v-html="zo.content"></p>
              <span>{{zo.time}} <i class="iconfont">&#xe61a;</i>{{zo.region || "未知地点"}} {{zo.os}} {{zo.browser}}
                  <a class="fr" @click="pid=zo.id;pcl='回复'+(zo.name || '匿名')+':'" href="#">回复</a>
                </span>
              <div class="reply" v-for="zzo in zo.list">
                <a :href="zzo.url" target="_blank"><img :src="zzo.head" /></a>
                <h4><a :href="zzo.url" target="_blank">{{zzo.name}}</a> 回复: <a :href="zo.url" target="_blank">{{zo.name}}</a></h4>
                <p v-html="zo.content"></p>
                <span>{{zzo.time}} <i class="iconfont">&#xe61a;</i>{{zzo.region || "未知地点"}} {{zzo.os}} {{zzo.browser}}
                </span>
              </div>
            </div>
          </div>
        </li>
        <el-alert v-show="messageList.length==0" title="没有数据" type="info" description=" " :closable="false" show-icon></el-alert>
      </ul>
    </div>
    <div class="page" v-show="messageList.length>0">
      <el-pagination background :page-size="page.size" @current-change="getPage" layout="prev, pager, next" :total="page.count"> </el-pagination>
    </div>

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
      }
    },
    created() {
      this.init();
      for(var i = 1; i <= 74; i++) {
        this.qqbq.push(i);
      }
      this.$emit("SetHeader", true);
      this.$emit("SetScrollTop");
      //      sessionStorage['title'] = document.title = "留言 - "+(this.init.info.nick || this.init.info.name)+ "的博客"
      this.getPage(1);
    },
    methods: {
      init () {
        this.$axios.get('http://blog.php127.com/api/leave/index.html?p=1').then((res)=>{
          this.messageList = res.data.list;
          console.log("res",res);
        });
      },
      setContent: function($e) { //模拟双向绑定
        this.content2 = $e.target.innerHTML;
        if(this.content2.length <= 0) {
          this.pclShow = true;
        } else {
          this.pclShow = false;
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      postLeave: function() {
        var self = this;
        if(self.content2.length < 10) {
          self.$message.error('留言内容不得少于10个字');
          return;
        }
//      if(!this.isUser()) {
//        this.user.show = true;
//        return;
//      }
debugger;
        let params = {
          content: this.content2,
          qq: this.user.qq,
          pid: this.pid
        };
        this.$axios.post('http://blog.php127.com/api/leave/add.html',params).then((res)=>{
          if(e.status == 200) {
            if(e.data.code == 1) {
              self.content = "";
              self.content2 = "";
              self.pid = 0;
              self.$message.success("留言成功");
              sessionStorage['leave_1'] = "";
              self.getPage(1);
            } else {
              self.$message.error(e.data.msg);
            }
          } else {
            self.$message.error('服务器异常 状态码' + e.status);
          }
        });

      },
      isUser: function() {
        if(this.user.name.length > 0 && this.user.qq.length > 0 && this.user.email.length > 0 && this.user.url.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      userPost: function() {
        if(!this.isUser()) {
          this.$message.error('信息未填写完整');
          return;
        }
        this.$emit("posts", {
          url: '/api/user/add.html',
          data: {
            qq: this.user.qq,
            name: this.user.name,
            email: this.user.email,
            url: this.user.url,
          }
        });

        this.user.show = false;
        this.postLeave();

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
      getPage(p) { //切换页面
        var self = this;
        var name = 'leave_' + p;
        if(sessionStorage[name]) {
          var data = JSON.parse(sessionStorage[name]);
          self.show = true;
          self.list = data.list;
          self.page.count = data.count;
        } else {
          this.$emit("gets", {
            url: '/api/leave/index.html?p=' + p,
            success: function(e) {
              if(e.status == 200) {
                self.show = true;
                self.list = e.data.list;
                self.page.count = e.data.count;
                sessionStorage[name] = JSON.stringify(e.data);
              }
            },
            error: function(e) {
              self.$message.error('服务器异常');
            }
          });
        }
      }

    }
  }
</script>

<style>
  .messageBoard-box{
    padding: 20px 30px;
    background: #fff;
    margin-bottom:20px;
    border-radius: 10px;
  }
</style>