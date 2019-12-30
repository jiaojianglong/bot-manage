<template>
  <div class="wx_friend">
    <h1>好友管理</h1>
    <el-table show-header="false" :data="friends_info" style="width: 100%">
      <el-table-column>
        <template slot-scope="scope">
          <img :src="scope.row.headportrait" width="40px">
        </template>
      </el-table-column>
      <el-table-column label="wxid" prop="wxid"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="type" prop="type"></el-table-column>
      <el-table-column label="所属微信wxid" prop="bot_wxid"></el-table-column>
      <el-table-column label="所属微信name" prop="bot_name"></el-table-column>
      <el-table-column label="好友状态" prop="status"></el-table-column>


      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input @change="load_wxbot" width="70%" v-model="nickname" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="delete_client(scope.row)">编辑配置</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" width="90px">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" @click="delete_client(scope.row)">刷新</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delete_client(scope.row)" v-if="scope.row.type==='好友'">删除好友</el-button>
          <el-button size="mini" type="danger" @click="delete_client(scope.row)" v-else>退出群聊</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'WXFriend',
  data () {
    return {
      friends_info:[],
      nickname:"",
      bot_wxid:""
    }
  },
  methods:{
    load_friends_info:function(){
      var _self = this;
      $.get(_self.wx_url + "/wx/friend?name="+ _self.nickname,function(data,status){
          if(status==="success" && data.code===200){
            _self.friends_info = data.data;
          }
        })
    }
  },
  mounted:function(){
    this.load_friends_info()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
