<template>
  <div id="app" @click="floating">
    <NavBar/>
    <div class="body-content">
      <router-view/>
    </div>
    <WebFooter/>
  </div>
</template>

<script>
  import NavBar from './components/ui/NavBar/NavBar.vue';
  import WebFooter from './components/ui/WebFooter/WebFooter.vue';
  export default {
    name: 'App',
    data () {
      return {
        keys:{
          list:[
            {name:"php",show:false,yy:0,xx:0,opacity:1},
            {name:"css",show:false,yy:0,xx:0,opacity:1},
            {name:"python",show:false,yy:0,xx:0,opacity:1},
            {name:"java",show:false,yy:0,xx:0,opacity:1},
            {name:"mysql",show:false,yy:0,xx:0,opacity:1},
            {name:"php",show:false,yy:0,xx:0,opacity:1},
          ],
          i:0
        },
      }
    },
    components: {
      NavBar,
      WebFooter,
    },
    methods: {
      //点击特效
      floating (e){
        //排除某些元素
        if(e.target.nodeName=="A" || e.target.nodeName=="I"){
          return false;
        }
        var self = this;
        var n = self.keys.i;
        self.keys.list[n].yy = e.clientY;
        self.keys.list[n].xx = e.clientX;
        self.keys.list[n].show = true;
        self.keys.list[n].opacity = 1;
        setTimeout(function(){
          self.keys.list[n].opacity = 0.1;
          self.keys.list[n].yy = e.clientY-50;
        },10)

        setTimeout(function(){
          self.keys.list[n].show = false;
        },1000)

        self.keys.i = (self.keys.i==self.keys.list.length-1) ? 0 : ++self.keys.i;
      },
    }
  }
</script>

<style lang="less">
  body{
    color: #434343;
    background: #dae3e7;
  }
  .body-content{
    margin-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 768px) {
    .body-content {
        width: 750px;
    }
  }
  @media (min-width: 1000px) {
    .body-content {
        width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .body-content {
        width: 1160px;
    }
  }
  @media (min-width: 1400px) {
    .body-content {
        width: 1360px;
    }
  }
  
  
  
</style>
