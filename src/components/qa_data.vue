<template>
  <div class="qa-data">
    <h1>问答数据管理</h1>
    <el-table :data="qa_data_table" style="width: 100%">
      <el-table-column label="问题" prop="title"></el-table-column>
      <el-table-column label="答案" prop="answers[0].answer"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input @change="load_qa_data" width="70%" v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="editQAData(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" width="70px">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" @click="dialogFormVisible = true" type="primary">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteQuestion(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加问题" :visible.sync="dialogFormVisible">
      <el-form :model="qa_form">
        <el-form-item label="问题" :label-width="formLabelWidth">
          <el-input v-model="qa_form.question" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="相似问题" :label-width="formLabelWidth">
          <el-input v-model="qa_form.similar_questions" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回答" :label-width="formLabelWidth">
          <el-input v-model="qa_form.answer" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addQAData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'QAData',
  data:function(){
    return {
      qa_data_table: [],
      search:"",
      dialogFormVisible: false,
      qa_form: {
          answer:"",
          question:"",
          similar_questions:""
        },
        formLabelWidth: '120px'
    }
  },
  methods:{
    load_qa_data:function(){
      var _self = this;
      $.post(_self.robot_url + "/api/qa_data",{"content":_self.search},function(data,status){
          if(status==="success" && data.code===200){
            _self.qa_data_table = data.data;
          }
        })
    },

    editQAData:function(index,row){
      this.$router.push({ "name": 'QAInfo', "params": { "question_id": row.id }});
    },

    deleteQuestion:function(index, row) {
      var _self = this;
        _self.$confirm('此确定删除该信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function(){
          $.ajax({
            type:"DELETE",
            url: _self.robot_url+"/api/qa_data_detail",
            data:{"question_id":row.id,"answer_id":row.answer_id},
            success:function(data,status){
              if (data==="success"){
              _self.$message({
                type: 'success',
                message: '删除成功!'
              });
              _self.load_qa_data();
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

    addQAData:function(){
      var question = this.qa_form.question;
      var answer = this.qa_form.answer;
      var _self = this;
      $.post(_self.robot_url+"/api/qa_data_detail",{"question":question,"answer":answer},function(data,status){
          if(status==="success" && data==="success"){
              _self.$message({
                type: 'success',
                message: '创建成功!'
              });
              _self.dialogFormVisible = false;
            }
            else{
              _self.$message({
                type: 'error',
                message: '创建失败!'
              });
            }
        });
    }
  },
  mounted:function(){
      this.load_qa_data();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
