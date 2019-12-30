<template>
  <div id="App">
    <el-container>
      <el-header>微信问答管理中心</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
                default-active="1"
                @select="selectItem"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>微信管理</span>
                  </template>
                  <el-menu-item index="/wx/client">客户端</el-menu-item>
                  <el-menu-item index="/wx/bot">微信号</el-menu-item>
                  <el-menu-item index="/wx/friend">好友</el-menu-item>
                </el-submenu>
                <el-menu-item index="/qa_data">
                  <i class="el-icon-menu"></i>
                  <span slot="title">问答数据管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-menu"></i>
                  <span slot="title">实体管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
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
export default {
  name: 'App',
  methods:{
      selectItem(index){
        this.$router.push(index);
      }
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
.el-header {
  background-color: rgb(84, 92, 100);
  color:white;
  line-height: 60px;
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
  background-color:#545c64;
}
</style>
