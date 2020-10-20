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
                <el-form-item label="healthContain">
                    <el-input v-model="headers.ES_FILTER.health"
                              placeholder="请输入healthContain(green/yellow/red)"></el-input>
                </el-form-item>
                <el-form-item label="statusContain">
                    <el-input v-model="headers.ES_FILTER.status" placeholder="请输入statusContain(open	)"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <hr>
                <h5 class="form-tit">Index(集群-索引)</h5>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>index</th>
                        <th>health</th>
                        <th>pri</th>
                        <th>pri.store.size</th>
                        <th>rep</th>
                        <th>store.size</th>
                        <th>status</th>
                        <th>docs.count</th>
                        <th>docs.deleted</th>
                        <!-- <th>uuid</th>-->
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>序号</th>
                        <th>索引名称</th>
                        <th>健康状况</th>
                        <th>主分片数量</th>
                        <th>主分片存储</th>
                        <th>复制</th>
                        <th>存储</th>
                        <th>状态</th>
                        <th>文档数量</th>
                        <th>文档删除数量</th>
                        <!-- <th>uuid</th>-->
                        <th>操作</th>
                    </tr>
                    <tbody>
                    <template v-if="Cluster_IndexController_Cat_Indices_Result">
                        <tr v-for="(info,index) in Cluster_IndexController_Cat_Indices_Result.list">
                            <td>{{index+1}}</td>
                            <td>{{info.index}}</td>
                            <td>{{info.health}}</td>
                            <td>{{info.pri}}</td>
                            <td>{{info['pri.store.size']}}</td>
                            <td>{{info.rep}}</td>
                            <td>{{info['store.size']}}</td>
                            <td>{{info.status}}</td>
                            <td>{{info['docs.count']}}</td>
                            <td>{{info['docs.deleted']}}</td>
                            <!--<td>{{info.uuid}}</td>-->
                            <td>
                                <span @click="routerToDetailView(info.index)">详情</span>
                                <span @click="preByFileName(info.preRelationViewUrl)">别名</span>
                                <span @click="routerToDocumentView(info.index)">文档</span>
                                <span @click="routerToMappingView(info.index)">映射</span>
                                <template v-if="info.status=='open'">
                                <span @click="Index_OpenCloseController_Close(info.index)">
                                    <span class="red">关闭</span></span>
                                </template>
                                <template v-else>
                                    <span class="redSpan" @click="Index_OpenCloseController_Open(info.index)">打开</span>
                                </template>
                                <span @click="Index_FreshFlushController_Refresh(info.index)">refresh</span>
                                <span @click="Index_FreshFlushController_Flush(info.index)">flush</span>
                                <span @click="routerToShardView(info.index)">分片</span>
                                <span @click="routerToSegmentView(info.index)">段</span>
                                <span @click="routerToRecoveryView(info.index)">恢复</span>
                                <span @click="routerToSettingView(info.index)">设置</span>
                                <span @click="routerToDSLView(info.index)">DSL</span>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Cluster_IndexController_Cat_Indices_Result.list.length > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="Cluster_IndexController_Cat_Indices_Result.pageNum"
                           :page-size="Cluster_IndexController_Cat_Indices_Result.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="Cluster_IndexController_Cat_Indices_Result.total">
            </el-pagination>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                Cluster_IndexController_Cat_Indices_Result: {
                    "endRow": 10,
                    "firstPage": 1,
                    "hasNextPage": true,
                    "hasPreviousPage": false,
                    "isFirstPage": true,
                    "isLastPage": false,
                    "lastPage": 8,
                    "list": [
                        {
                            "pri.store.size": "",
                            "docs.deleted": "",
                            "pri": "",
                            "health": "",
                            "index": "",
                            "rep": "",
                            "uuid": "",
                            "store.size": "",
                            "status": "",
                            "docs.count": ""
                        }
                    ],
                    "navigatePages": 8,
                    "navigatepageNums": [1, 2, 3, 4, 5, 6, 7, 8],
                    "nextPage": 2,
                    "orderBy": "18ff48aa-258e-40ef-b555-0843dfad462c",
                    "pageNum": 1,
                    "pageSize": 10,
                    "pages": 10,
                    "prePage": 0,
                    "size": 10,
                    "startRow": 1,
                    "total": 18100
                },
                headers: {//存放分页信息
                    "ES_HOST": "http://10.202.16.9:9200",
                    "ES_PAGE": "true",
                    "ES_PAGE_SIZE": "15",
                    "ES_FILTER": {
                        "index": "*",
                        "health": "*",
                        "status": "*"
                    }
                },
                bootstrap: {
                    servers: '192.168.0.105:9092'
                },
                bootstrap_servers: {
                    "home": "192.168.0.105:9092"
                }
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
            self.Cluster_IndexController_Cat_Indices();


        },
        watch: {},
        methods: {

            //获取全部的索引
            Cluster_IndexController_Cat_Indices() {
                let self = this;
                self.$http.get(self.api.Cluster_IndexController_Cat_Indices, {
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
                        self.Cluster_IndexController_Cat_Indices_Result = response.content;
                        self.$message({
                            type: 'success',
                            message: '查询成功',
                            duration: 2000
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
            Index_OpenCloseController_Close(index) {
                this.$confirm('是否关闭该条索引？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let self = this;
                    self.$http.post(self.api.Index_OpenCloseController_Close + "/" + index + "/_close", {}, {
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
                            self.Cluster_IndexController_Cat_Indices();
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
            Index_OpenCloseController_Open(index) {
                this.$confirm('是否打开该条索引？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let self = this;
                    self.$http.post(self.api.Index_OpenCloseController_Open + "/" + index + "/_open", {}, {
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
                            self.Cluster_IndexController_Cat_Indices();
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
            Index_FreshFlushController_Refresh(index) {
                this.$confirm('是否refresh该条索引？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let self = this;
                    self.$http.get(self.api.Index_FreshFlushController_Refresh + "/" + index + "/_refresh", {
                        headers: {
                            "ES_HOST": self.headers.ES_HOST
                        }
                    }, function (response) {
                        if (response.code == 0) {
                            self.$message({
                                type: 'success',
                                message: 'refresh成功',
                                duration: 2000
                            });
                            self.Cluster_IndexController_Cat_Indices();
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
            Index_FreshFlushController_Flush(index) {
                this.$confirm('是否flush该条索引？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let self = this;
                    self.$http.get(self.api.Index_FreshFlushController_Flush + "/" + index + "/_flush", {
                        headers: {
                            "ES_HOST": self.headers.ES_HOST
                        }
                    }, function (response) {
                        if (response.code == 0) {
                            self.$message({
                                type: 'success',
                                message: 'refresh成功',
                                duration: 2000
                            });
                            self.Cluster_IndexController_Cat_Indices();
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
            handleCurrentChange(currentChange) {
                let self = this;
                // self.topicPartitionAndRealOffset = [];
                self.$http.get(self.api.RedisController_GetRecordByScrollId, {
                    params: {
                        'scrollId': self.Cluster_IndexController_Cat_Indices_Result.orderBy,
                        'pageNum': currentChange,
                        'pageSize': self.Cluster_IndexController_Cat_Indices_Result.pageSize,
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.consumers = [];
                        self.Cluster_IndexController_Cat_Indices_Result = response.content;
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
                                duration: 2000
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
            routerToDetailView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/IndexManager_Index" + "?" + queryStr, '_self');
            },
            routerToMappingView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/IndexManager_Index_Mapping" + "?" + queryStr, '_self');
            },
            routerToDocumentView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/IndexManager_Index_Document" + "?" + queryStr, '_self');
            }
            ,
            routerToShardView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/IndexManager_Index_Shard" + "?" + queryStr, '_self');
            }
            ,
            routerToSegmentView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/IndexManager_Index_Segment" + "?" + queryStr, '_self');
            }
            ,
            routerToSettingView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/IndexManager_Index_Setting" + "?" + queryStr, '_self');
            }
            ,
            routerToRecoveryView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/IndexManager_Index_Recovery" + "?" + queryStr, '_self');
            }
            ,
            routerToDSLView(index) {
                let self = this;
                let queryStr = "";
                const header_ES_HOST = JSON.stringify(self.headers.ES_HOST);
                queryStr = queryStr + "index=" + index + "" + "&header_ES_HOST=" + header_ES_HOST;
                window.open("#/SearchManager_Search_DSL_TermLevel" + "?" + queryStr, '_self');
            }
            ,
            searchEvent() {
                this.Cluster_IndexController_Cat_Indices();
            }
            ,
            searchRest() {
                let self = this;
                self.search.id = '';
                self.search.title = '';
                self.search.img = '';
                self.search.time = '';
                self.search.type = '';
                self.search.lookSum = '';
                self.search.content = '';
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

    .red {
        color: #b21f2d !important;
        /*font-size: 100px;*/
    }
</style>
