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
                @select="selectItem"
                class="el-menu-vertical-demo"
                background-color="#1e282c"
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

  import logo from '@/assets/logo.png'
export default {
  name: 'App',
    data: function(){
      return {
          logo: logo,
      }
    },
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
