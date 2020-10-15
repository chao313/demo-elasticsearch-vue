<template>
    <div class="app-container">
        <div class="mt20">
            <el-form :inline="true" size="mini">
                <el-form-item label="bootstrap.servers">
                    <el-select v-model="bootstrap.servers" placeholder="请输入kafka地址:">
                        <el-option v-for="(item,index) in bootstrap_servers" :key="item" :label="index"
                                   :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="indexContain">
                    <el-input v-model="headers.ES_FILTER.index" placeholder="请输入indexContain"></el-input>
                </el-form-item>
                <el-form-item label="段的类型">
                    <el-input v-model="headers.ES_FILTER.prirep" placeholder="请输入段的类型"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <hr>
                <h5 class="form-tit">集群Segment信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>index</th>
                        <th>shard</th>
                        <th>segment</th>
                        <th>prirep</th>
                        <th>size</th>
                        <th>size.memory</th>
                        <th>docs.count</th>
                        <th>docs.deleted</th>
                        <th>searchable</th>
                        <th>committed</th>
                        <th>compound</th>
                        <th>version</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>序号</th>
                        <th>索引名称</th>
                        <th>分片名称</th>
                        <th>段的名称</th>
                        <th>段的类型</th>
                        <th>段占用的磁盘</th>
                        <th>段占用的内存</th>
                        <th>文档数量</th>
                        <th>文档删除数量</th>
                        <th>是否可检索</th>
                        <th>是否提交</th>
                        <th>是否组合</th>
                        <th>编写段的版本</th>

                    </tr>
                    <tbody>
                    <template v-if="Cluster_SegmentController_Cat_Segments_Result.list">
                        <tr v-for="(info,index) in Cluster_SegmentController_Cat_Segments_Result.list">
                            <td>{{index+1}}</td>
                            <td>{{info.index}}</td>
                            <td>{{info.shard}}</td>
                            <td>{{info.segment}}</td>
                            <td>{{info.prirep}}</td>
                            <td>{{info.size}}</td>
                            <td>{{info['size.memory']}}</td>
                            <td>{{info['docs.count']}}</td>
                            <td>{{info['docs.deleted']}}</td>
                            <td>{{info.searchable}}</td>
                            <td>{{info.committed}}</td>
                            <td>{{info.compound}}</td>
                            <td>{{info.version}}</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Cluster_SegmentController_Cat_Segments_Result.list.length > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="Cluster_SegmentController_Cat_Segments_Result.pageNum"
                           :page-size="Cluster_SegmentController_Cat_Segments_Result.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="Cluster_SegmentController_Cat_Segments_Result.total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                Cluster_SegmentController_Cat_Segments_Result: {
                    "endRow": 10,
                    "firstPage": 1,
                    "hasNextPage": true,
                    "hasPreviousPage": false,
                    "isFirstPage": true,
                    "isLastPage": false,
                    "lastPage": 8,
                    "list": [
                        {
                            "committed": "true",//是否提交
                            "compound": "true",//是否存储在复合文件中
                            "docs.count": "32",//文档数量
                            "docs.deleted": "0",//文档删除数量
                            "generation": "0",//世代号，例如0。对于每个写入的段，Elasticsearch都会增加该世代号
                            "index": "这个是样例数据",//索引
                            "ip": "127.0.0.1",//ip
                            "prirep": "p",//分片类型(主分片/)
                            "searchable": "true",//是否可搜索
                            "segment": "_0",//段的名称
                            "shard": "0",//分片名称
                            "size": "5.1kb",//段使用的磁盘空间
                            "size.memory": "1716",//段使用的内存大小
                            "version": "8.6.2"//编写段的Lucene版本
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
                    // "ES_HOST": "http://39.107.236.187:7014",
                    "ES_PAGE": "true",
                    "ES_PAGE_SIZE": "15",
                    "ES_FILTER": {
                        "index": "*",
                        "prirep": "*"
                    }
                },
                bootstrap: {
                    servers: '192.168.0.105:9092'
                },
                bootstrap_servers: {
                    "home": "192.168.0.105:9092"
                },
                topicSize: 0,
                consumerSize: 0,
                clusterInfo: {
                    controller: {
                        port: 9092,
                        idString: "",
                        host: "192.168.0.105",
                        id: 0,
                    },
                    nodes: [
                        {
                            port: 9092,
                            idString: "xx",
                            host: "192.168.0.105",
                            id: 0
                        }
                    ],
                    clusterId: "1",
                    authorizedOperations: []
                }
            }
        },
        mounted() {
            let self = this;
        },
        created() {
            let self = this;
            self.Cluster_SegmentController_Cat_Segments();

            self.clusterInfo.controller = {};
            self.clusterInfo.nodes = {};
            self.clusterInfo.clusterId = '';
            self.bootstrap = {};
            self.bootstrap_servers = {};
            self.getKafkaBootstrapServers();


        },
        watch: {},
        methods: {

            //获取具体的配置
            Cluster_SegmentController_Cat_Segments() {
                let self = this;
                self.$http.get(self.api.Cluster_SegmentController_Cat_Segments, {
                    params: {
                        'format': 'JSON',
                        'h': '*'
                    },
                    headers: {
                        "ES_HOST": self.headers.ES_HOST,
                        "ES_PAGE": self.headers.ES_PAGE,
                        "ES_PAGE_SIZE": self.headers.ES_PAGE_SIZE,
                        "ES_FILTER": JSON.stringify(self.headers.ES_FILTER)
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Cluster_SegmentController_Cat_Segments_Result = response.content;
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
            //获取具体的配置
            queryBase() {
                let self = this;
                self.$http.get(self.api.getCluster, {
                    params: {
                        'bootstrap.servers': self.bootstrap.servers
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.clusterInfo = response.content;
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
            getTopicSize() {
                let self = this;
                self.$http.get(self.api.getTopicSize, {
                    params: {
                        'bootstrap.servers': self.bootstrap.servers
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.topicSize = response.content;
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
            getConsumerGroupSize() {
                let self = this;
                self.$http.get(self.api.getConsumerGroupSize, {
                    params: {
                        'bootstrap.servers': self.bootstrap.servers
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.consumerSize = response.content;
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
            getKafkaBootstrapServers() {
                let self = this;
                self.$http.get(self.api.getKafkaBootstrapServers, {}, function (response) {
                        if (response.code == 0) {
                            self.bootstrap_servers = response.content;
                            for (var key in self.bootstrap_servers) {
                                //随机赋值
                                // console.log("属性：" + key + ",值 ：" + self.bootstrap_servers[key]);
                                self.bootstrap.servers = self.bootstrap_servers[key];
                            }
                            self.searchEvent();
                            self.getTopicSize();
                            self.getConsumerGroupSize();
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
            deleteByPrimaryKey(id) {
                let self = this;
                this.$confirm('是否删除该条数据？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    self.$http.get(self.api.deleteTBlogByPrimaryKey
                        , {
                            params: {
                                id: id
                            }
                        },
                        function (response) {
                            if (response.code == 0) {
                                if (response.content == true) {
                                    self.$message({
                                        type: 'success',
                                        message: '删除成功',
                                        duration: 2000
                                    });
                                    self.queryBase();
                                } else {
                                    self.$message({
                                        type: 'warning',
                                        message: '删除失败',
                                        duration: 2000
                                    });

                                }
                            } else {
                                self.$message({
                                    type: 'error',
                                    message: response.msg,
                                    duration: 2000
                                });
                            }
                        },
                        function (response) {
                            console.log(response);
                            //失败回调
                            self.$message({
                                type: 'error',
                                message: "请求异常",
                                duration: 2000
                            });
                        }
                    )

                })
            },
            handleCurrentChange(currentChange) {
                let self = this;
                self.$http.get(self.api.RedisController_GetRecordByScrollId, {
                    params: {
                        'scrollId': self.Cluster_SegmentController_Cat_Segments_Result.orderBy,
                        'pageNum': currentChange,
                        'pageSize': self.Cluster_SegmentController_Cat_Segments_Result.pageSize,
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.Cluster_SegmentController_Cat_Segments_Result = response.content;
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

            routerToConfigsView(bootstrap_servers) {
                //跳转携带参数
                let queryStr = "";
                queryStr = queryStr + "bootstrap_servers=" + bootstrap_servers + "";
                window.open("#/BrokerManagerConfigsView" + "?" + queryStr, '_self');
            }
            ,
            routerToTopicManagerList(bootstrap_servers) {
                //跳转携带参数
                let queryStr = "";
                queryStr = queryStr + "bootstrap_servers=" + bootstrap_servers + "";
                window.open("#/TopicManagerList" + "?" + queryStr, '_self');
            }
            ,
            routerToTopicPartitionOffsetList(bootstrap_servers) {
                let queryStr = "";
                queryStr = queryStr + "bootstrap_servers=" + bootstrap_servers + "";
                window.open("#/TopicPartitionOffsetList" + "?" + queryStr, '_self');
            }
            ,
            routerToConsumerManagerList(bootstrap_servers) {
                let queryStr = "";
                queryStr = queryStr + "bootstrap_servers=" + bootstrap_servers + "";
                window.open("#/ConsumerManagerList" + "?" + queryStr, '_self');
            }
            ,
            searchEvent() {
                this.Cluster_SegmentController_Cat_Segments();
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
</style>
