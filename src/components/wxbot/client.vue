<template>
    <el-container>
        <el-header>
            <h3>客户端管理</h3>
        </el-header>
        <el-main>
            <el-table
                    :data="items"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="host"
                        label="HOST">
                </el-table-column>
                <el-table-column
                        prop="accept_port"
                        label="接受端口">
                </el-table-column>
                <el-table-column
                        prop="send_port"
                        label="发送端口">
                </el-table-column>
                <el-table-column
                        prop="write_date"
                        label="操作时间">
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
        </el-footer>
    </el-container>
</template>

<script>
  import { API } from '@/service/index'

  export default {
    data: function () {
      return {
        items: []
      }
    },

    created: function () {
      this.getClient()
    },

    methods: {
      getClient: function() {
        API(this, 'wx.client').default.get().then(res => {
          this.items = res.data.data
        })
      }
    }
  }
</script>