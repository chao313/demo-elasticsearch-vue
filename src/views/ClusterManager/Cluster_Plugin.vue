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
                <el-form-item label="nameContain">
                    <el-input v-model="headers.ES_FILTER.name" placeholder="请输入nameContain"></el-input>
                </el-form-item>
                <el-form-item label="componentContain">
                    <el-input v-model="headers.ES_FILTER.component" placeholder="请输入componentContain"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <hr>
                <h5 class="form-tit">Plugin(集群-插件)</h5>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>component</th>
                        <th>url</th>
                        <th>type</th>
                        <th>version</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>序号</th>
                        <th>节点名称</th>
                        <th>插件名称</th>
                        <th>插件url</th>
                        <th>插件类型</th>
                        <th>节点版本</th>
                    </tr>
                    <tbody>
                    <template v-if="Cluster_PluginController_Cat_Plugins_Result.list">
                        <tr v-for="(info,index) in Cluster_PluginController_Cat_Plugins_Result.list">
                            <td>{{index+1}}</td>
                            <td>{{info.name}}</td>
                            <td>{{info.component}}</td>
                            <td>{{info.url}}</td>
                            <td>{{info.type}}</td>
                            <td>{{info.version}}</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Cluster_PluginController_Cat_Plugins_Result.list.length > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="Cluster_PluginController_Cat_Plugins_Result.pageNum"
                           :page-size="Cluster_PluginController_Cat_Plugins_Result.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="Cluster_PluginController_Cat_Plugins_Result.total">
            </el-pagination>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                Cluster_PluginController_Cat_Plugins_Result: {
                    endRow: 10,
                    firstPage: 1,
                    hasNextPage: true,
                    hasPreviousPage: false,
                    isFirstPage: true,
                    isLastPage: false,
                    lastPage: 8,
                    list: [
                        {
                            "component": "",//sql
                            "name": "",//dataNode-dwserver18-2
                            "type": "",//j/s
                            "version": "",//2.3.1.1
                            "url": ""///_plugin/sql/
                        }
                    ],
                    navigatePages: 8,
                    navigatepageNums: [1, 2, 3, 4, 5, 6, 7, 8],
                    nextPage: 2,
                    orderBy: "18ff48aa-258e-40ef-b555-0843dfad462c",
                    pageNum: 1,
                    pageSize: 10,
                    pages: 10,
                    prePage: 0,
                    size: 10,
                    startRow: 1,
                    total: 0
                },
                headers: {//存放分页信息
                    ES_HOST: "",
                    ES_PAGE: "true",
                    ES_PAGE_SIZE: "15",
                    ES_FILTER: {
                        "name": "*",
                        "component": "*"
                    }
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
            self.ConfigController_GetServers();
            self.ConfigController_GetDefaultServers();
        },
        watch: {},
        methods: {
            Cluster_PluginController_Cat_Plugins() {
                let self = this;
                self.$http.get(self.api.Cluster_PluginController_Cat_Plugins, {
                    params: {
                        'format': 'JSON'
                    },
                    headers: {
                        "ES_HOST": self.headers.ES_HOST,
                        "ES_PAGE": self.headers.ES_PAGE,
                        "ES_PAGE_SIZE": self.headers.ES_PAGE_SIZE,
                        "ES_FILTER": JSON.stringify(self.headers.ES_FILTER)
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Cluster_PluginController_Cat_Plugins_Result = response.content;
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
            handleCurrentChange(currentChange) {
                let self = this;
                // self.topicPartitionAndRealOffset = [];
                self.$http.get(self.api.RedisController_GetRecordByScrollId, {
                    params: {
                        'scrollId': self.Cluster_PluginController_Cat_Plugins_Result.orderBy,
                        'pageNum': currentChange,
                        'pageSize': self.Cluster_PluginController_Cat_Plugins_Result.pageSize,
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.consumers = [];
                        self.Cluster_PluginController_Cat_Plugins_Result = response.content;
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
            searchEvent() {
                let self = this;
                self.Cluster_PluginController_Cat_Plugins();
            },
            ConfigController_GetDefaultServers() {
                //获取默认的地址
                let self = this;
                self.$http.get(self.api.ConfigController_GetDefaultServers, {}, function (response) {
                        if (response.code == 0) {
                            self.headers.ES_HOST = response.content;
                            self.Cluster_PluginController_Cat_Plugins();
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
