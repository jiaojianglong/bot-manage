<template>
  <div class="hello" style="height:100%;">
    <div style="height:5%;">
      <h2 style="display:inline;">{{ bot_detail_info.base_info.nickname }}</h2>
      <div style="display:inline;margin-left: 30px" >
        <i class="el-icon-info"></i><span style="margin-left: 5px">{{bot_detail_info.base_info.wxid}}</span>
        <i class="el-icon-phone" style="margin-left: 15px"></i><span style="margin-left: 5px">{{bot_detail_info.base_info.phone}}</span>
        <span  style="margin-left: 15px">好友：</span><span style="margin-left: 5px">{{bot_detail_info.friend.length}}人</span>
        <span  style="margin-left: 15px">群聊：</span><span style="margin-left: 5px">{{bot_detail_info.group.length}}个</span>
      </div>

    </div>
    <div style="padding-top:20px;height:85%">
      <div style="display: inline-block;margin-right: 20px;"><span>进群打招呼：</span>
        <el-switch @change="save_bot_info" v-model="bot_detail_info.base_info.is_add_group_hellow" style="vertical-align: text-bottom;" ></el-switch>
        <i @click="add_group_hellow_dialog=true" class="el-icon-circle-plus-outline" style="font-size: 20px;color:cornflowerblue;vertical-align: text-bottom;"></i>
      </div>
      <div style="display: inline-block;margin-right: 20px;"><span>新人进群欢迎：</span>
        <el-switch @change="save_bot_info" v-model="bot_detail_info.base_info.is_welcome_member" style="vertical-align: text-bottom;" ></el-switch>
        <i @click="welcome_member_dialog=true" class="el-icon-circle-plus-outline" style="font-size: 20px;color:cornflowerblue;vertical-align: text-bottom;"></i>
      </div>
      <div style="display: inline-block;margin-right: 20px;"><span>加好友打招呼：</span>
        <el-switch @change="save_bot_info" v-model="bot_detail_info.base_info.is_add_friend_hellow" style="vertical-align: text-bottom;" ></el-switch>
        <i @click="add_friend_hellow_dialog = true" class="el-icon-circle-plus-outline" style="font-size: 20px;color:cornflowerblue;vertical-align: text-bottom;"></i>
      </div>
      <div style="display: inline-block;margin-right: 20px;"><span>关键词自动回答：</span>
        <el-switch @change="save_bot_info" v-model="bot_detail_info.base_info.is_keyword" style="vertical-align: text-bottom;" ></el-switch>
        <i @click="keywords_dialog=true" class="el-icon-circle-plus-outline" style="font-size: 20px;color:cornflowerblue;vertical-align: text-bottom;"></i>
      </div>
      <div style="display: inline-block;margin-right: 20px;"><span>回复模式：</span>
        <el-radio-group v-model="reply_pattern" @change="save_bot_info">
          <el-radio :label="1">不回复</el-radio>
          <el-radio :label="2">群@回复</el-radio>
          <el-radio :label="3">回复所有</el-radio>
        </el-radio-group>
      </div>
      <div style="display: inline-block;margin-right: 20px;">
        <el-button type="primary" size="mini" style="vertical-align: text-bottom">加好友</el-button>
      </div>
      <el-row style="padding-top:30px;height:100%;">

        <el-col :span="1"><span style="line-height: 40px;">好友：</span></el-col>
        <el-col :span="10" style="height:100%">
          <div id="friend_box" style="height:100%;overflow-y: scroll;overflow-x: hidden;">
            <el-table :stripe="true" :show-header="false" :data="bot_detail_info.friend"  style="width: 100%">
              <el-table-column width="50px;">
                <template slot-scope="scope">
                  <img :src="scope.row.headportrait" width="40px" style="border-radius: 20px;">
                </template>
              </el-table-column>
              <el-table-column prop="nickname"></el-table-column>
              <el-table-column prop="status"></el-table-column>
              <el-table-column align="right">
                <template slot-scope="scope">
                  <el-button size="mini" @click="delete_client(scope.row)">配置</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="100px">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="delete_client(scope.row)">删除好友</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="1"><div style="height: 100%;display: inline-block"></div></el-col>

        <el-col :span="1"><span style="line-height: 40px;">群组：</span></el-col>
        <el-col :span="10" style="height:100%;">
          <div id="group_box" style="height:100%;overflow-y: scroll;overflow-x: hidden;">
            <el-table :stripe="true" :show-header="false" :data="bot_detail_info.group"  style="width: 100%">
              <el-table-column width="50px;">
                <template slot-scope="scope">
                  <img :src="scope.row.headportrait" width="40px" style="border-radius: 20px;">
                </template>
              </el-table-column>
              <el-table-column prop="nickname"></el-table-column>
              <el-table-column prop="status"></el-table-column>
              <el-table-column align="right">
                <template slot-scope="scope">
                  <el-button size="mini" @click="delete_client(scope.row)">配置</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="100px">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="delete_client(scope.row)">退出群聊</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </el-col>
      </el-row>
    </div>
  <el-dialog
    title="进群介绍语"
    :visible.sync="add_group_hellow_dialog"
    width="70%">
    <el-button type="primary" @click="add_group_word(add_group_hellow)">添 加</el-button>
    <div v-for="(_,index) in add_group_hellow" :key="index" style="margin-top: 5px;">
      <el-input clearable v-model="add_group_hellow[index]" placeholder="请输入内容" style="display: inline-block;width:50%;"></el-input>
      <el-button type="danger" @click="remove_group_word(add_group_hellow,index)" style="vertical-align: bottom;display: inline-block;padding:4px 15px;margin-top: 5px;">
        <i class="el-icon-remove-outline" style="font-size: 30px;color:white;vertical-align: text-bottom;"></i></el-button>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="add_group_hellow_dialog = false">取 消</el-button>
      <el-button type="primary" @click="save_bot_info();add_group_hellow_dialog = false">确 定</el-button>
    </span>
  </el-dialog>


    <el-dialog
    title="进群欢迎语"
    :visible.sync="welcome_member_dialog"
    width="70%">
    <el-button type="primary" @click="add_group_word(welcome_member)">添 加</el-button>
    <div v-for="(_,index) in welcome_member" :key="index" style="margin-top: 5px;">
      <el-input clearable v-model="welcome_member[index]" placeholder="请输入内容" style="display: inline-block;width:50%;"></el-input>
      <el-button type="danger" @click="remove_group_word(welcome_member,index)" style="vertical-align: bottom;display: inline-block;padding:4px 15px;margin-top: 5px;">
        <i class="el-icon-remove-outline" style="font-size: 30px;color:white;vertical-align: text-bottom;"></i></el-button>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="welcome_member_dialog = false">取 消</el-button>
      <el-button type="primary" @click="save_bot_info();welcome_member_dialog = false;">确 定</el-button>
    </span>
  </el-dialog>

    <el-dialog
    title="加好友介绍语"
    :visible.sync="add_friend_hellow_dialog"
    width="70%">
    <el-button type="primary" @click="add_group_word(add_friend_hellow)">添 加</el-button>
    <div v-for="(_,index) in add_friend_hellow" :key="index" style="margin-top: 5px;">
      <el-input clearable v-model="add_friend_hellow[index]" placeholder="请输入内容" style="display: inline-block;width:50%;"></el-input>
      <el-button type="danger" @click="remove_group_word(add_friend_hellow,index)" style="vertical-align: bottom;display: inline-block;padding:4px 15px;margin-top: 5px;">
        <i class="el-icon-remove-outline" style="font-size: 30px;color:white;vertical-align: text-bottom;"></i></el-button>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="add_friend_hellow_dialog = false">取 消</el-button>
      <el-button type="primary" @click="save_bot_info();add_friend_hellow_dialog = false;">确 定</el-button>
    </span>
  </el-dialog>

    <el-dialog
    title="关键词回答"
    :visible.sync="keywords_dialog"
    width="70%">
    <el-button type="primary" @click="add_group_keyword(keywords)">添 加</el-button>
    <div v-for="item in keywords" style="margin-top: 5px;">
      <el-input clearable v-model="item.keyword" placeholder="关键字" style="display: inline-block;width:20%;"></el-input>
      <el-input clearable v-model="item.reply" placeholder="回答" style="display: inline-block;width:40%;"></el-input>
      <el-button type="danger" @click="remove_group_word(keywords,index)" style="vertical-align: bottom;display: inline-block;padding:4px 15px;margin-top: 5px;">
        <i class="el-icon-remove-outline" style="font-size: 30px;color:white;vertical-align: text-bottom;"></i></el-button>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="keywords_dialog = false">取 消</el-button>
      <el-button type="primary" @click="save_bot_info();keywords_dialog = false;">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

export default {
  components: {
    ElButton,
    ElInput,
    ElFormItem},
  name: 'WXBotDetail',
  data () {
    return {
      wxid : this.$route.params.wxid,
      bot_detail_info:{"base_info":{"nickname":"",}},
      add_group_hellow_dialog:false,
      welcome_member_dialog:false,
      add_friend_hellow_dialog:false,
      keywords_dialog:false,
      add_group_hellow:[],
      welcome_member:[],
      add_friend_hellow:[],
      keywords:[],
      reply_pattern:1
    }
  },
  methods:{
    get_bot_detail_info:function(){
      var _self = this;
      $.get(_self.wx_url+"/wx/bot/detail?wxid="+_self.wxid,function(data,status){
        if(status==="success"&&data.code===200){
          console.log(data.data);
          _self.bot_detail_info = data.data;
          if(data.data.base_info.add_group_hellow) {
            _self.add_group_hellow = data.data.base_info.add_group_hellow;
          }
          if(data.data.base_info.welcome_member) {
            _self.welcome_member = data.data.base_info.welcome_member;
          }
          if(data.data.base_info.add_friend_hellow) {
            _self.add_friend_hellow = data.data.base_info.add_friend_hellow;
          }
          if(data.data.base_info.keywords) {
            _self.keywords = data.data.base_info.keywords;
          }
          if (data.data.base_info.reply_pattern){
            _self.reply_pattern = data.data.base_info.reply_pattern;
          }

        }
      })
    },
    save_bot_info:function(){
      var _self = this;
      $.post(_self.wx_url+"/wx/bot/detail",
        {"wxid":_self.wxid,
          "is_add_group_hellow":_self.bot_detail_info.base_info.is_add_group_hellow,
          "add_group_hellow":_self.add_group_hellow.join("\n"),
          "is_welcome_member":_self.bot_detail_info.base_info.is_welcome_member,
          "welcome_member":_self.welcome_member.join("\n"),
          "is_add_friend_hellow":_self.bot_detail_info.base_info.is_add_friend_hellow,
          "add_friend_hellow":_self.add_friend_hellow.join("\n"),
          "is_keyword":_self.bot_detail_info.base_info.is_keyword,
          "keywords":JSON.stringify(_self.keywords),
          "reply_pattern":_self.reply_pattern,
        },function(data,status){
        if(status==="success"&&data.data==="success"){
          _self.$message({"type":"success","message":"操作成功"})
        }
        else{
          _self.$message({"type":"error","message":"操作失败"})
        }
      })
    },
    add_group_word:function(word_list){
      word_list.push("")
    },
    add_group_keyword:function(word_list){
      word_list.push({})
    },
    remove_group_word:function(word_list,index){
      word_list.splice(index,1)
    },
  },
  mounted:function(){
    this.get_bot_detail_info();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2,p,span,i{color: #909399;}
  .el-col{line-height: 30px}

  #friend_box::-webkit-scrollbar,#group_box::-webkit-scrollbar {
        display: none;
    }
</style>
