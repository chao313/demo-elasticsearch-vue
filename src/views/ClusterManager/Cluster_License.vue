<template>
    <div class="app-container">
        <div class="mt20">
            <el-form :inline="true" size="mini">
                <el-form-item label="bootstrap.servers">
                    <el-select v-model="headers.ES_HOST" placeholder="请输入ES地址:">
                        <el-option v-for="(item,index) in bootstrap_servers" :key="item" :label="index"
                                   :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <h5 class="form-tit">cluster证书信息</h5>
                <table>
                    <thead>
                    <tr>
                        <!--<th>uid</th>-->
                        <th>issue_date</th>
                        <th>issued_to</th>
                        <th>max_nodes</th>
                        <th>type</th>
                        <th>issuer</th>
                        <th>status</th>
                    </tr>
                    </thead>
                    <tr>
                        <!--<th>UUID</th>-->
                        <th>颁发日期</th>
                        <th>颁发给</th>
                        <th>最大的节点数</th>
                        <th>类型</th>
                        <th>颁发者</th>
                        <th>状态</th>
                    </tr>

                    <tbody>
                    <tr>
                        <template v-if="Cluster_LicenseController_License_Result.license">
                            <!--显示的字段 - 具体数据-->
                            <!--<td>{{Cluster_LicenseController_License_Result.license.uid}}</td>-->
                            <td>{{Cluster_LicenseController_License_Result.license.issue_date}}</td>
                            <td>{{Cluster_LicenseController_License_Result.license.issued_to}}</td>
                            <td>{{Cluster_LicenseController_License_Result.license.max_nodes}}</td>
                            <td>{{Cluster_LicenseController_License_Result.license.type}}</td>
                            <td>{{Cluster_LicenseController_License_Result.license.issuer}}</td>
                            <td>{{Cluster_LicenseController_License_Result.license.status}}</td>
                        </template>
                    </tr>
                    </tbody>
                </table>
                <hr>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        data() {
            return {
                Cluster_LicenseController_License_Result: {
                    "license": {
                        "uid": "",
                        "issue_date": "",
                        "start_date_in_millis": 0,
                        "issued_to": "",
                        "max_nodes": 0,
                        "issue_date_in_millis": 0,
                        "type": "",
                        "issuer": "",
                        "status": ""
                    }
                },
                headers: {//存放分页信息
                    "ES_HOST": "",
                },
                bootstrap: {
                    servers: '192.168.0.105:9092'
                },
                bootstrap_servers: {
                    "home": ""//192.168.0.105:9092
                },
            }
        },
        mounted() {
            let self = this;
        },
        created() {
            let self = this;
            self.bootstrap = {};
            self.bootstrap_servers = {};
            self.ConfigController_GetServers();
            self.ConfigController_GetDefaultServers()();

        },
        watch: {},
        methods: {
            Cluster_LicenseController_License() {
                let self = this;
                self.$http.get(self.api.Cluster_LicenseController_License, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Cluster_LicenseController_License_Result = response.content;
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
                    }
                )
            },
            searchEvent() {
                let self = this;
                self.Cluster_LicenseController_License();
            },
            ConfigController_GetDefaultServers() {
                //获取默认的地址
                let self = this;
                self.$http.get(self.api.ConfigController_GetDefaultServers, {}, function (response) {
                        if (response.code == 0) {
                            self.headers.ES_HOST = response.content;
                            self.Cluster_LicenseController_License();
                        } else {
                            // self.$message({
                            //     type: 'error',
                            //     message: response.msg,
                            //     duration: 2000
                            // });
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
