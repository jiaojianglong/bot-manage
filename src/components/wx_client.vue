<template>
  <div class="wx_client">
    <h1>客户端管理</h1>
    <el-table :data="client" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-table border stripe :data="props.row.wxbot" @row-dblclick="get_bot_detail" style="width: 100%">
              <el-table-column label="微信编号" prop="weixin_num"></el-table-column>
              <el-table-column label="昵称" prop="weixin_nickname"></el-table-column>
              <el-table-column label="电话" prop="weixin_phone"></el-table-column>
              <el-table-column label="wxid" prop="weixin_wxid"></el-table-column>
              <el-table-column label="id" prop="weixin_id"></el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="host" prop="host"></el-table-column>
      <el-table-column label="接收端口" prop="accept_port"></el-table-column>
      <el-table-column label="发送端口" prop="send_port"></el-table-column>
      <el-table-column label="连接状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.connect_state" @change="change_connect_state(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="自动加好友">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.auto_friend" @change="auto_friend(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="自动加群">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.auto_group" @change="auto_group(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>

      <el-table-column align="right" min-width	="150px;">
        <template slot="header" slot-scope="scope">
          <el-input @change="get_client_info" width="70%" v-model="client_search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="login_wx(scope.row)" v-if="scope.row.connect_state" type="primary">登录微信</el-button>
          <el-button size="mini"  v-else disabled type="primary">登录微信</el-button>
          <el-button size="mini" @click="get_login_image(scope.row)" type="primary">获取二维码</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" width="70px">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" @click="get_client_info" type="primary">刷新</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="edit_client(scope.row)" v-if="scope.row.connect_state" disabled>编辑</el-button>
          <el-button size="mini" @click="edit_client(scope.row)" v-else >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" width="70px">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" @click="add_client_dialog = true;add_client_form = {}" type="primary" >添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delete_client(scope.row)" v-if="scope.row.connect_state" disabled>删除</el-button>
          <el-button size="mini" type="danger" @click="delete_client(scope.row)" v-else>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加问题" :visible.sync="add_client_dialog">
      <el-form :model="add_client_form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="add_client_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="host" :label-width="formLabelWidth">
          <el-input v-model="add_client_form.host" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接收端口" :label-width="formLabelWidth">
          <el-input v-model="add_client_form.accept_port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发送端口" :label-width="formLabelWidth">
          <el-input v-model="add_client_form.send_port" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;add_client_form = {}">取 消</el-button>
        <el-button type="primary" @click="create_client">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="登录二维码" :visible.sync="login_dialog" width="15%">
      <img style="width:80%;margin: 10%" :src="wx_url+login_image_url"/>
    </el-dialog>
  </div>
</template>

<script>
import {lazyload} from '@/utils'
import {API} from '@/service'
import {HTTP} from '@/utils'
export default {
  name: 'WXClient',
  data () {
    return {
      client: [],
      client_search: "",
      add_client_dialog: false,
      add_client_form:{},
      formLabelWidth:"120px",
      client_page : 1,
      client_page_size : 12,
      login_image_url:"",
      login_dialog:false,
    }
  },
  methods:{
    get_client_info:function(){
      API(this, "client.client").default.get().then(res => {
          console.log(res)
      });
//      $.get(_self.wx_url + "/wx/client?name="+ _self.client_search+ "&page="+_self.client_page+ "&page_size="+_self.client_page_size,function(data,status){
//          if(status==="success" && data.code===200){
//            _self.client = data.data;
//          }
//        })
    },
    create_client:function(){
      var _self = this;
      $.post(_self.wx_url + "/wx/client",_self.add_client_form,function(data,status){
        if(status==="success" && data.code===200){
          _self.$message({
                type: 'success',
                message: '保存成功!'
              });
          _self.add_client_dialog = false;
          _self.add_client_form = {};
          _self.get_client_info();

        }
      })
    },
    change_connect_state:function(row){
      var _self = this;
      var client_id = row._id;
      var connect_state = row.connect_state;
      $.post(_self.wx_url+"/wx/client/connect",{"client_id":client_id,"connect_state":connect_state},function(data,statue){
        if(data.data===false){
            if (connect_state === false){
              _self.$message({type: 'success',message: '断开连接成功!'})
            }
            else{
              _self.$message({type: 'error',message: '连接失败!'})
            }
          }
        else{
          if (connect_state === false){
              _self.$message({type: 'error',message: '断开连接失败!'})
            }
            else{
              _self.$message({type: 'success',message: '连接成功!'})
            }
        }
        _self.get_client_info()
      });

    },

    edit_client:function(row){
      this.add_client_form = row;
      this.add_client_dialog = true;
    },

    delete_client:function(row){
      var _self = this;
        _self.$confirm('此确定删除该信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function(){
          $.ajax({
            type:"DELETE",
            url: _self.wx_url+"/wx/client",
            data:{"client_id":row._id,},
            success:function(data,status){
              if (data.data==="success"){
              _self.$message({
                type: 'success',
                message: '删除成功!'
              });
              _self.get_client_info();
            }
            else{
              _self.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          }})}).catch(function(){
            _self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    login_wx:function(row){
      var _self = this;
      $.post(_self.wx_url+"/wx/client/login",{"client_id":row._id},function(data,status){
        if(status==="success"&data.code===200){
          _self.$message({type:"success",message:"打开登录成功，需手机操作！"})
        }
      })
    },

    get_bot_detail:function(row, column, event){
      this.$router.push({ "name": 'WXBotDetail', "params": { "wxid": row.weixin_wxid }});
    },

    get_login_image:function(row){
      var _self = this;
      $.get(_self.wx_url+"/wx/client/login?client_id="+row._id,function(data,status){
        if(status==="success"&&data.code===200){
          _self.login_image_url = data.data.login_image
        }
      });
      this.login_dialog = true;
    },

    auto_friend:function(row){
      var _self = this;
      var client_id = row._id;
      var auto_state = row.auto_friend;
      $.get(_self.wx_url+"/wx/client/auto_friend?client_id="+client_id+"&auto_friend_state="+auto_state,function(data,status){
        if(status==='success'&&data.code===200){
          _self.$message({type:"success",message:"成功"})
        }
      })
    },
    auto_group:function(row){
      var _self = this;
      var client_id = row._id;
      var auto_state = row.auto_group;
      $.get(_self.wx_url+"/wx/client/auto_group?client_id="+client_id+"&auto_group_state="+auto_state,function(data,status){
        if(status==='success'&&data.code===200){
          _self.$message({type:"success",message:"成功"})
        }
      })
    }
  },
  mounted:function(){
    this.get_client_info()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
