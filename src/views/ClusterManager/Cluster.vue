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
                <h5 class="form-tit">cluster基础信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>cluster_name</th>
                        <th>tagline</th>
                        <th>cluster_uuid</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>name</th>
                        <th>集群名称</th>
                        <th>集群标签</th>
                        <th>集群UUID</th>
                    </tr>

                    <tbody>
                    <tr>
                        <template v-if="cluster">
                            <!--显示的字段 - 具体数据-->
                            <td>{{cluster.name}}</td>
                            <td>{{cluster.cluster_name}}</td>
                            <td>{{cluster.tagline}}</td>
                            <td>{{cluster.cluster_uuid}}</td>
                        </template>
                    </tr>
                    </tbody>
                </table>
                <hr>
                <h5 class="form-tit">cluster版本信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>number</th>
                        <th>build_flavor</th>
                        <th>build_type</th>
                        <th>build_hash</th>
                        <th>build_date</th>
                        <th>build_snapshot</th>
                        <th>lucene_version</th>
                        <th>minimum_wire_compatibility_version</th>
                        <th>minimum_index_compatibility_version</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>集群版本号</th>
                        <th>构建分支</th>
                        <th>构建类型</th>
                        <th>构建hash</th>
                        <th>集群构建日期</th>
                        <th>是否是构建快照</th>
                        <th>lucene版本</th>
                        <th>wire兼容性</th>
                        <th>index兼容性</th>
                    </tr>
                    <tbody>
                    <tr>
                        <template v-if="cluster.version">
                            <td>{{cluster.version.number}}</td>
                            <td>{{cluster.version.build_flavor}}</td>
                            <td>{{cluster.version.build_type}}</td>
                            <td>{{cluster.version.build_hash}}</td>
                            <td>{{cluster.version.build_date}}</td>
                            <td>{{cluster.version.build_snapshot}}</td>
                            <td>{{cluster.version.lucene_version}}</td>
                            <td>{{cluster.version.minimum_wire_compatibility_version}}</td>
                            <td>{{cluster.version.minimum_index_compatibility_version}}</td>
                        </template>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        data() {
            return {
                cluster: {
                    name: "",
                    cluster_name: "",
                    cluster_uuid: "",
                    version: {
                        number: "",
                        build_flavor: "",
                        build_type: "",
                        build_hash: "",
                        build_date: "",
                        build_snapshot: false,
                        lucene_version: "",
                        minimum_wire_compatibility_version: "",
                        minimum_index_compatibility_version: ""
                    },
                    tagline: ""
                },
                headers: {//存放分页信息
                    ES_HOST: "",
                },
                bootstrap: {
                    servers: ''//192.168.0.105:9092
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
            self.ConfigController_GetServers();
            self.ConfigController_GetDefaultServers();
        },
        watch: {},
        methods: {//获取具体的配置
            Cluster() {
                let self = this;
                self.$http.get(self.api.Cluster, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.cluster = response.content;
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
                            // self.$message({
                            //     type: 'success',
                            //     message: '查询成功',
                            //     duration: 2000
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
                let self = this;
                self.Cluster();
            },
            ConfigController_GetDefaultServers() {
                //获取默认的地址
                let self = this;
                self.$http.get(self.api.ConfigController_GetDefaultServers, {}, function (response) {
                        if (response.code == 0) {
                            self.headers.ES_HOST = response.content;
                            self.Cluster();
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
