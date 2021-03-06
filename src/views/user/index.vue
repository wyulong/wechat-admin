<template>
  <div class="app-container">
    <div class="filter-container">
      用户类型
      <el-select v-model="listQuery.type" placeholder="业务类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="用户编号" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag>
            {{ row.userType | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="150px" align="center">
        <template slot-scope="{row}">
          <div class="avatar-wrapper">
            <img :src="row.headImg" class="user-avatar" height="40" width="40">
          </div>
        </template>
      </el-table-column>

      <el-table-column label="手机号码" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子邮箱" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次登录" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <!--          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">-->
          <!--            删除-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户编号" prop="id">
          <el-input v-model="temp.id" disabled />
        </el-form-item>
        <el-form-item label="用户类型" prop="status">
          <el-select v-model="temp.userType" disabled class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="temp.phone" :disabled="temp.userType !== 0" />
        </el-form-item>

        <el-form-item label="用户名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>

        <el-form-item label="上次登录" prop="createTime">
          <el-input v-model="temp.updateTime" disabled />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, editData, deleteDate } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'User',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '未处理',
        1: '处理中',
        2: '处理完成'
      }
      return statusMap[status]
    },
    typeFilter(status) {
      const statusMap = {
        0: '普通用户',
        1: '管理员'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: -1
      },
      typeOptions: [
        { key: -1, display_name: '全部' },
        { key: 0, display_name: '普通用户' },
        { key: 1, display_name: '管理员' }
      ],
      dealTypeOptions: [
        { key: -1, display_name: '全部' },
        { key: 0, display_name: '普通用户' },
        { key: 1, display_name: '管理员' }
      ],
      statusOptions: [
        { key: -1, display_name: '全部' },
        { key: 0, display_name: '未处理' },
        { key: 1, display_name: '处理中' },
        { key: 2, display_name: '处理完成' }
      ],
      dealOptions: [
        { key: 0, display_name: '未处理' },
        { key: 1, display_name: '处理中' },
        { key: 2, display_name: '处理完成' }
      ],
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑信息',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          editData(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '处理成功',
              message: '[' + tempData.name + ']' + '处理成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteDate(row).then(() => {
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '删除成功',
          message: '[' + row.name + ']' + '删除成功',
          type: 'success',
          duration: 2000
        })
      }).then(() => this.getList())
    }
  }
}
</script>
