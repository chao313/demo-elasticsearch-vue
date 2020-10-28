<template>
    <div class="app-container">
        <div class="mt20">
            <el-form :inline="true" size="mini">
                <el-form-item label="bootstrap.servers">
                    <el-select v-model="headers.ES_HOST" placeholder="请输入ES地址:">
                        <el-option v-for="(item,index) in bootstrap_servers" :key="item" :label="index"
                                   :value="item" disabled>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="index">
                    <el-input v-model="index" placeholder="index" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <hr>
                <h5 class="form-tit">索引Setting信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>provided_name</th>
                        <th>number_of_shards</th>
                        <th>number_of_replicas</th>
                        <th>creation_date</th>
                        <th>frozen</th>
                        <template v-if="Index_SettingController_Settings_Result[index].settings.index.search">
                            <th>search.throttled</th>
                        </template>
                        <template v-if="Index_SettingController_Settings_Result[index].settings.index.blocks">
                            <th>blocks.write</th>
                        </template>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>索引名称</th>
                        <th>分片数量</th>
                        <th>复制系数</th>
                        <th>创建时间</th>
                        <th>是否冻结</th>
                        <template v-if="Index_SettingController_Settings_Result[index].settings.index.search">
                            <th>是否节流</th>
                        </template>
                        <template v-if="Index_SettingController_Settings_Result[index].settings.index.blocks">
                            <th>是否阻塞写</th>
                        </template>
                        <th>操作</th>
                    </tr>
                    <tbody>
                    <template v-if="Index_SettingController_Settings_Result">
                        <tr>
                            <td>{{Index_SettingController_Settings_Result[index].settings.index.provided_name||index}}
                            </td>
                            <td>{{Index_SettingController_Settings_Result[index].settings.index.number_of_shards}}</td>
                            <td>{{Index_SettingController_Settings_Result[index].settings.index.number_of_replicas}}
                            </td>
                            <td>{{Index_SettingController_Settings_Result[index].settings.index.creation_date |
                                dateString}}
                            </td>
                            <td>{{Index_SettingController_Settings_Result[index].settings.index.frozen||'false'}}
                            </td>
                            <template v-if="Index_SettingController_Settings_Result[index].settings.index.search">
                                <td>
                                    {{Index_SettingController_Settings_Result[index].settings.index.search.throttled||defaultValue}}
                                </td>
                            </template>
                            <template v-if="Index_SettingController_Settings_Result[index].settings.index.blocks">
                                <td>
                                    {{Index_SettingController_Settings_Result[index].settings.index.blocks.write||defaultValue}}
                                </td>
                            </template>
                            <td>
                                <template
                                        v-if="Index_SettingController_Settings_Result[index].settings.index.frozen=='true'">
                                <span @click="Index_FreezeUnFreezeController_Unfreeze(Index_SettingController_Settings_Result[index].settings.index.provided_name||index)">
                                    <span class="red">解冻</span></span>
                                </template>
                                <template v-else>
                                    <span class="redSpan"
                                          @click="Index_FreezeUnFreezeController_Freeze(Index_SettingController_Settings_Result[index].settings.index.provided_name||index)">冻结</span>
                                </template>
                            </td>

                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>

<script>
    import DateUtil from '../../utils/DateUtil.js'

    export default {
        data() {
            return {
                defaultValue: '-',
                index: "",
                Index_SettingController_Settings_Result: {
                    "test4": {
                        "settings": {
                            "index": {
                                "search": {
                                    "throttled": "-"//true是否节流
                                },
                                "number_of_shards": "",//1 分片数量
                                "blocks": {
                                    "write": "-"//true 是否阻塞写
                                },
                                "provided_name": "-",// test2提供的名称
                                "frozen": "-",//true 是否冻结
                                "creation_date": "-",//1602591430493 创建时间
                                "number_of_replicas": "-",//1 复制系数
                                "uuid": "-",//KuLEbXx9TjmfZtSrV8nRsw
                                "version": {
                                    "created": "-"// 7090299 创建版本
                                }
                            }
                        }
                    }
                },
                bootstrap: {
                    servers: ''//192.168.0.105:9092
                },
                bootstrap_servers: {
                    "home": "2"//192.168.0.105:909s
                },
                headers: {//存放分页信息
                    "ES_HOST": ""
                }
            }
        }
        ,
        filters: {
            dateString(timestamp) {
                const formatTime = DateUtil.dateFormat("YYYY-MM-dd HH:mm:ss", new Date(parseInt(timestamp)));
                return formatTime;
            }
        }
        ,
        mounted() {
            let self = this;
        },
        created() {
            let self = this;
            const index = this.$route.query && this.$route.query.index;
            self.index = index;
            const header_ES_HOST = this.$route.query && this.$route.query.header_ES_HOST;
            self.headers.ES_HOST = JSON.parse(header_ES_HOST);
            self.ConfigController_GetServers();
            self.Index_SettingController_Settings();
        },
        watch: {},
        methods: {
            Index_SettingController_Settings() {
                let self = this;
                self.$http.get(self.api.Index_SettingController_Settings + self.index + "/_settings", {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Index_SettingController_Settings_Result = response.content;
                        self.$message({
                            type: 'success',
                            message: '查询成功',
                            duration: 1000
                        });
                    } else {
                        self.$message({
                            type: 'error',
                            message: response.msg,
                            duration: 2000
                        });
                    }
                }, function (response) {
                    //失败回调
                    self.$message({
                        type: 'warning',
                        message: '请求异常',
                        duration: 1000
                    });
                })
            },
            Index_FreezeUnFreezeController_Freeze(index) {
                this.$confirm('是否冻结该条索引？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let self = this;
                    self.$http.post(self.api.Index_FreezeUnFreezeController_Freeze + index + "/_freeze", {}, {
                        headers: {
                            "ES_HOST": self.headers.ES_HOST
                        }
                    }, function (response) {
                        if (response.code == 0) {
                            self.$message({
                                type: 'success',
                                message: '关闭成功',
                                duration: 2000
                            });
                            self.Index_SettingController_Settings();
                        } else {
                            self.$message({
                                type: 'error',
                                message: response.msg,
                                duration: 2000
                            });
                        }
                    }, function (response) {
                        //失败回调
                        self.$message({
                            type: 'warning',
                            message: '请求异常',
                            duration: 1000
                        });
                    });
                });
            },
            Index_FreezeUnFreezeController_Unfreeze(index) {
                this.$confirm('是否解冻该条索引？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let self = this;
                    self.$http.post(self.api.Index_FreezeUnFreezeController_Unfreeze + "/" + index + "/_unfreeze", {}, {
                        headers: {
                            "ES_HOST": self.headers.ES_HOST
                        }
                    }, function (response) {
                        if (response.code == 0) {
                            self.$message({
                                type: 'success',
                                message: '打开成功',
                                duration: 2000
                            });
                            self.Index_SettingController_Settings();
                        } else {
                            self.$message({
                                type: 'error',
                                message: response.msg,
                                duration: 2000
                            });
                        }
                    }, function (response) {
                        //失败回调
                        self.$message({
                            type: 'warning',
                            message: '请求异常',
                            duration: 1000
                        });
                    })
                });
            },
            ConfigController_GetServers() {
                let self = this;
                self.$http.get(self.api.ConfigController_GetServers, {}, function (response) {
                        if (response.code == 0) {
                            self.bootstrap_servers = response.content;
                            for (var key in self.bootstrap_servers) {
                                //随机赋值
                                // console.log("属性：" + key + ",值 ：" + self.bootstrap_servers[key]);
                                self.bootstrap.servers = self.bootstrap_servers[key];
                            }
                            // self.$message({
                            //     type: 'success',
                            //     message: '查询成功',
                            //     duration: 1000
                            // });
                        } else {
                            self.$message({
                                type: 'error',
                                message: response.msg,
                                duration: 2000
                            });
                        }
                    }, function (response) {
                        //失败回调
                        self.$message({
                            type: 'warning',
                            message: '请求异常',
                            duration: 1000
                        });
                    }
                )
            },
            searchEvent() {
                this.queryBase();
            }


        }

    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .video-detail {

        p {
            display: inline-block;
            width: 40%;
            vertical-align: top;
        }

        label {
            width: 120px;
            display: inline-block;
        }

        span {
            color: #888;
        }

    }
</style>
