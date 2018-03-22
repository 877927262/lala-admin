<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getAppointment">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="user" label="患者" width="120" sortable>
			</el-table-column>
			<el-table-column prop="doctor" label="大夫" width="200"  sortable>
			</el-table-column>
			<el-table-column prop="date" label="日期" width="250" sortable>
			</el-table-column>
			<el-table-column prop="time" label="时间段" width="150" sortable>
			</el-table-column>
			<el-table-column min-width="120" >
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="患者" prop="user">
					<el-input v-model="editForm.name" auto-complete="off" style="width:195px;" disabled></el-input>
				</el-form-item>
				<el-form-item label="大夫">
                    <el-select v-model="editForm.doctorValue" placeholder="请选择大夫">
                        <el-option
                                v-for="item in editForm.doctorList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="日期">
                    <el-select v-model="editForm.dateValue" placeholder="请选择日期">
                        <el-option
                                v-for="item in editForm.dateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="时间段">
                    <el-select v-model="editForm.timeValue" placeholder="请选择时间段">
                        <el-option
                                v-for="item in editForm.timeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import axios from 'axios';

	// import NProgress from 'nprogress'
	// import { getUserListPage, deleteUser, editUser, addUser } from '../../api/api';
	import { getAppointmentListPage, deleteAppointment } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					card_id: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id:'',
					doctorList: [],
					doctorValue:'',
					dateList: [],
					dateValue:'',
					timeList: [],
					timeValue:''
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getAppointment();
			},
			//获取用户列表
			getAppointment() {
				let page = this.page;
				let name = this.filters.name
				this.listLoading = true;
				// NProgress.start();
				getAppointmentListPage(name, page).then((res) => {
					this.total = res.data.total;
					this.users = res.data.data;
					this.listLoading = false;
					// NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let params = {id: row.id};
					deleteAppointment(params).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getAppointment();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							// console.log(para);
							editUser(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getAppointment();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			let _this =this;
			this.getAppointment();

		}
	}

</script>

<style scoped>

</style>
