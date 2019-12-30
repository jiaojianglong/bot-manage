<template>
  <div class="qa_info">
    <h1>问题编辑</h1>
    <el-row style="margin-top: 50px">
      <el-col :span="7">
        <h4>问题展示</h4>
        <el-form ref="form" label-position="left" label-width="80px" :model="question_form">
          <el-form-item label="问题">
            <el-input v-model="question_form.title"></el-input>
          </el-form-item>
          <el-form-item label="相似问题">
            <el-input type="textarea" :rows="16" v-model="question_form.similar_questions"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save_question_info">保存问题信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="1"><div style="height:20px"></div></el-col>
      <el-col :span="7">
        <h4>答案展示</h4>
        <el-form ref="form" label-position="left" label-width="80px" :model="answer_form">
          <el-form-item label="问题">
            <el-input v-model="answer_form.title"></el-input>
          </el-form-item>
          <el-form-item v-for="answer in answer_form.answers" :label="answer.emotion">
            <el-input v-model="answer.answer"></el-input>
          </el-form-item>
          <el-form-item label="校验状态">
            <el-radio-group v-model="answer_form.check_state">
              <el-radio :label=0>未校验</el-radio>
              <el-radio :label=1>已校验</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save_answer_info">保存答案信息</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="1"><div style="height:20px"></div></el-col>
      <el-col :span="7">
        <h4>答案绑定</h4>
        <el-form ref="form" label-position="left" label-width="80px" :model="new_answer_form">
          <el-form-item label="检索问题">
            <el-autocomplete v-model="state1" :fetch-suggestions="queryAnswer"  @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item v-for="answer in new_answer_form.answers" :label="answer.emotion">
            <el-input :disabled="true" v-model="answer.answer[0]"></el-input>
          </el-form-item>
          <el-form-item label="校验状态">
            <el-radio-group :disabled="true" v-model="new_answer_form.check_state">
              <el-radio :label=0>未校验</el-radio>
              <el-radio :label=1>已校验</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="change_answer_to_new_answer">绑定到此问题</el-button>
            <el-button type="primary" @click="change_answer">取消绑定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'QAInfo',
  data:function(){
    return{
      question_id:this.$route.params.question_id,
      question_form:{},
      answer_form:{},
      new_answer_form:{},
      state1:"",
      answer_select_list : [],
      answer_id:"",
      new_answer_id:"",
    }
  },
  methods:{
    load_qa_info:function(){
      var _self = this;
      $.get(_self.robot_url+"/api/question_detail_info?question_id="+_self.question_id,function(data,status){
        if(status==="success" && data.code===200){
          _self.question_form = data.data;
          _self.answer_id = data.data.answer_id;
        }
        else{
          _self.$message({type:"error",message:"问答数据加载失败！"})
        }
      });
    },
    load_answer_info:function(){
      var _self = this;
      $.get(_self.robot_url+"/api/answer_detail_info?answer_id="+_self.answer_id,function(data,status){
        if(status==="success" && data.code===200){
          _self.answer_form = data.data;
        }
        else{
          _self.$message({type:"error",message:"加载失败！"})
        }
      });

    },
    load_new_answer_info:function(){
      var _self = this;
      $.get(_self.robot_url+"/api/answer_detail_info?answer_id="+_self.new_answer_id,function(data,status){
        if(status==="success" && data.code===200){
          _self.new_answer_form = data.data;
        }
        else{
          _self.$message({type:"error",message:"加载失败！"})
        }
      });
    },
    load_answer_select_list:function(){
      var _self = this;
      console.log(_self.question_form.title);
      $.get(_self.robot_url+"/api/answer_info?title=" + _self.question_form.title, function (data, status) {
          if (status === "success" && data.code === 200) {
            _self.answer_select_list = data.data;
          }
          else {
            _self.$message({type: "error", message: "加载失败！"})
          }
        });
    },
    queryAnswer:function(queryString, cb) {
      var _self = this;
      var queryString = queryString;
      if(queryString) {
        $.get(_self.robot_url+"/api/answer_info?title=" + queryString, function (data, status) {
          if (status === "success" && data.code === 200) {
            _self.answer_select_list = data.data;
          }
          else {
            _self.$message({type: "error", message: "加载失败！"})
          }
        });
      }
      cb(this.answer_select_list)

      },
    handleSelect:function(item){
      this.new_answer_id = item.id;
    },
    change_answer:function(){
      this.answer_id = this.question_form.answer_id
    },
    change_answer_to_new_answer:function(){
      this.answer_id = this.new_answer_id
    },
    save_question_info:function(){
      var _self = this;
      var question_info = _self.question_form;
      question_info.answer_id = _self.answer_id;
      $.ajax({
            type:"PUT",
            url:_self.robot_url+"/api/question_detail_info",
            data:question_info,
            success:function(data,status){
              if (status === "success" && data==="success") {
                _self.$message({type:"success",message:"保存成功"})
              }
              else {
                _self.$message({type: "error", message: "保存失败"})
              }
                }});
    },
    save_answer_info:function(){
      var _self = this;
      var formData = JSON.stringify(this.answer_form);
      console.log(formData);
      $.ajax({
            type:"PUT",
            url:_self.robot_url+"/api/answer_detail_info",
            data:formData,
            success:function(data,status){
              if (status === "success" && data==="success") {
                _self.$message({type:"success",message:"保存成功"})
              }
              else {
                _self.$message({type: "error", message: "保存失败"})
              }
                }});
    }

  },
  watch: {
    answer_id: function (new_id, old_id) {
      this.load_answer_info()
    },
    new_answer_id: function (new_id, old_id) {
      this.load_new_answer_info()
    },
    question_form:function(new_id,old_id){
      this.load_answer_select_list()
}
  },
  mounted:function(){
      this.load_qa_info();
    }
}
</script>

<style scoped>
</style>
