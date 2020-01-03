<template>
  <div id="App">
    <el-container>
      <el-header height="50px">
        <el-row style="width:200px">
          <el-col :span="8">
            <el-image
          style="height: 50px;width:50px;display: inline-block"
        :src="logo"
        fit="contain"></el-image>

          </el-col>
          <el-col :span="12">
            <h3 style="display: inline-block; line-height: 50px">管理后台</h3>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
                default-active="1"
                router
                class="el-menu-vertical-demo"
                background-color="#1e282c"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/">
                  <i class="el-icon-s-home"></i>
                  <span slot="title">首 页</span>
                </el-menu-item>
              </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>

  import logo from '@/assets/logo.png'
export default {
  name: 'App',
    data: function(){
      return {
          logo: logo,
      }
    },
  methods:{
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
.el-header {
  background-color: #409EFF;
  color:white;
}
html,body,#App{
  width:100%;
  height:100%;
}
.el-container{
  height:100%;
}
.el-aside {
  height:100%;
  background-color:#1e282c;
}
</style>
