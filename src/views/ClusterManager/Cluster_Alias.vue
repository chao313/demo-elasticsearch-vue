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
                <el-form-item label="indexContain">
                    <el-input v-model="headers.ES_FILTER.index" placeholder="请输入indexContain"></el-input>
                </el-form-item>
                <el-form-item label="aliasContain">
                    <el-input v-model="headers.ES_FILTER.alias" placeholder="请输入aliasContain"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <hr>
                <h5 class="form-tit">Alias(集群-别名)</h5>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>alias</th>
                        <th>index</th>
                        <th>routing.index</th>
                        <th>routing.search</th>
                        <th>filter</th>
                        <th>is_write_index</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>序号</th>
                        <th>别名</th>
                        <th>索引名称</th>
                        <th>路由索引</th>
                        <th>路由检索</th>
                        <th>过滤</th>
                        <th>是写索引</th>
                    </tr>
                    <tbody>
                    <template v-if="Cluster_AliasController_Cat_Aliases_Result.list">
                        <tr v-for="(info,index) in Cluster_AliasController_Cat_Aliases_Result.list">
                            <td>{{index+1}}</td>
                            <td>{{info.alias}}</td>
                            <td>{{info.index}}</td>
                            <td>{{info['routing.index']}}</td>
                            <td>{{info['routing.search']}}</td>
                            <td>{{info.filter}}</td>
                            <td>{{info.is_write_index}}</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Cluster_AliasController_Cat_Aliases_Result.list.length > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="Cluster_AliasController_Cat_Aliases_Result.pageNum"
                           :page-size="Cluster_AliasController_Cat_Aliases_Result.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="Cluster_AliasController_Cat_Aliases_Result.total">
            </el-pagination>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                Cluster_AliasController_Cat_Aliases_Result: {
                    endRow: 10,
                    firstPage: 1,
                    hasNextPage: true,
                    hasPreviousPage: false,
                    isFirstPage: true,
                    isLastPage: false,
                    lastPage: 8,
                    list: [
                        {
                            "filter": "",
                            "routing.index": "",
                            "is_write_index": "",
                            "alias": "",
                            "index": "",
                            "routing.search": ""
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
                    total: 18100
                },
                headers: {//存放分页信息
                    ES_HOST: "",
                    ES_PAGE: "true",
                    ES_PAGE_SIZE: "15",
                    ES_FILTER: {
                        "index": "*",
                        "alias": "*"
                    }
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
        methods: {
            Cluster_AliasController_Cat_Aliases() {
                let self = this;
                self.$http.get(self.api.Cluster_AliasController_Cat_Aliases, {
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
                        self.Cluster_AliasController_Cat_Aliases_Result = response.content;
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
            handleCurrentChange(currentChange) {
                let self = this;
                // self.topicPartitionAndRealOffset = [];
                self.$http.get(self.api.RedisController_GetRecordByScrollId, {
                    params: {
                        'scrollId': self.Cluster_AliasController_Cat_Aliases_Result.orderBy,
                        'pageNum': currentChange,
                        'pageSize': self.Cluster_AliasController_Cat_Aliases_Result.pageSize,
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.consumers = [];
                        self.Cluster_AliasController_Cat_Aliases_Result = response.content;
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
                self.Cluster_AliasController_Cat_Aliases();
            },
            ConfigController_GetDefaultServers() {
                //获取默认的地址
                let self = this;
                self.$http.get(self.api.ConfigController_GetDefaultServers, {}, function (response) {
                        if (response.code == 0) {
                            self.headers.ES_HOST = response.content;
                            self.Cluster_AliasController_Cat_Aliases();
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
