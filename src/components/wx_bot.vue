<template>
  <div class="hello">
    <h1>微信号管理</h1>
    <el-form :inline="true" :model="bot_search_form" class="demo-form-inline" style="margin-top: 40px">
      <el-form-item label="昵称">
        <el-input v-model="bot_search_form.nickname" placeholder="输入关键字搜索"></el-input>
      </el-form-item>
      <el-form-item label="所属客户端">
        <el-select v-model="bot_search_form.client_id" placeholder="客户端">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="client in client_info" :label="client.name" :value="client.client_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="load_wxbot">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="wxbot" @row-dblclick="get_bot_detail" style="width: 100%">
      <el-table-column label="wxid" prop="wxid"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="好友数" prop="friend_num"></el-table-column>
      <el-table-column label="群数量" prop="group_num"></el-table-column>
      <el-table-column label="最近登录客户端" prop="client_name"></el-table-column>
      <el-table-column label="登录状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_login" @change="change_connect_state(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>

      <el-table-column align="right" label="操作">
        <template slot-scope="scope" >
          <el-button size="mini" type="danger" @click="delete_client(scope.row)" v-if="scope.row.is_login" disabled>删除</el-button>
          <el-button size="mini" type="danger" @click="delete_client(scope.row)" v-else>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'WXBot',
  data () {
    return {
      wxbot:[],
      nickname: "",
      bot_search_form:{"nickname":"","client_id":""},
      client_info:[]
    }
  },
  methods:{
    load_wxbot:function(){
      var _self = this;
      $.get(_self.wx_url+"/wx/bot?nickname="+_self.bot_search_form.nickname+"&page=1&page_size=10&client_id="+_self.bot_search_form.client_id,function(data,status){
        if(status==="success"&data.code===200){
          _self.wxbot = data.data;
        }
      })
    },
    get_bot_detail:function(row, column, event){
      this.$router.push({ "name": 'WXBotDetail', "params": { "wxid": row.wxid }});
    },
    load_client_info:function(){
      var _self = this;
      $.get(_self.wx_url+"/wx/client?is_all=true",function(data,status){
        if(status==="success"&data.code===200){
          _self.client_info = data.data;
        }
      })
    }
  },
  mounted:function(){
    this.load_wxbot();
    this.load_client_info()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
