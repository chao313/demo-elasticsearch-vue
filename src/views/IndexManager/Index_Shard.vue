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
                <h5 class="form-tit">索引Shards消息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>ip</th>
                        <th>node</th>
                        <th>index</th>
                        <th>shard</th>
                        <th>prirep</th>
                        <th>state</th>
                        <th>store</th>
                        <th>docs</th>
                        <th>segments.count</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>序号</th>
                        <th>ip</th>
                        <th>节点名称</th>
                        <th>索引名称</th>
                        <th>分片名称</th>
                        <th>分片类型</th>
                        <th>分片状态</th>
                        <th>分片size</th>
                        <th>文档数量</th>
                        <th>段的数量</th>

                    </tr>
                    <tbody>
                    <template v-if="Index_ShardController_Cat_Shards_Result.list">
                        <tr v-for="(info,index) in Index_ShardController_Cat_Shards_Result.list">
                            <td>{{index+1}}</td>
                            <td>{{info.ip}}</td>
                            <td>{{info.node}}</td>
                            <td>{{info.index}}</td>
                            <td>{{info.shard}}</td>
                            <td>{{info.prirep}}</td>
                            <td>{{info.state}}</td>
                            <td>{{info.store}}</td>
                            <td>{{info.docs}}</td>
                            <td>{{info['segments.count']}}</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Index_ShardController_Cat_Shards_Result.list.length > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="Index_ShardController_Cat_Shards_Result.pageNum"
                           :page-size="Index_ShardController_Cat_Shards_Result.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="Index_ShardController_Cat_Shards_Result.total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                index: '',
                Index_ShardController_Cat_Shards_Result: {
                    "endRow": 10,
                    "firstPage": 1,
                    "hasNextPage": true,
                    "hasPreviousPage": false,
                    "isFirstPage": true,
                    "isLastPage": false,
                    "lastPage": 8,
                    "list": [
                        {
                            "completion.size": "-",// '0b'完成大小
                            "docs": "-",// '999'分片中的文档数
                            "fielddata.evictions": "-",// '0'字段数据缓存逐出
                            "fielddata.memory_size": "-",// '0b'已使用的字段数据缓存存储器
                            "flush.total": "-",// '3'冲洗次数
                            "flush.total_time": "-",// '65ms'花在冲洗上的时间
                            "get.current": "-",// '0'当前get操作的数量
                            "get.exists_time": "-",// '0s'成功get所花费的时间
                            "get.exists_total": "-",// '0'成功执行get操作的次数
                            "get.missing_time": "-",// '0s'get失败的时间
                            "get.missing_total": "-",// '0'get操作失败的次数
                            "get.time": "-",// '0s'get的时间
                            "get.total": "-",// '0'get操作的数量
                            "id": "-",// 'MioHCeOCQ8CV3d640v56sw'分片id
                            "index": "-",// 'index_bulk'索引
                            "indexing.delete_current": "-",// '0'当前删除操作的数量
                            "indexing.delete_time": "-",// '0s'删除所花费的时间
                            "indexing.delete_total": "-",// '0'删除操作的数量
                            "indexing.index_current": "-",// '0'当前索引操作的数量
                            "indexing.index_failed": "-",// '0'索引操作失败的次数
                            "indexing.index_time": "-",// '2.2s'用于建立索引的时间
                            "indexing.index_total": "-",// '999'索引操作的数量
                            "ip": "-",// '172.17.0.12'ip
                            "merges.current": "-",// '0'当前合并操作的数量
                            "merges.current_docs": "-",// '0'当前合并文档的数量
                            "merges.current_size": "-",// '0b'当前合并的大小
                            "merges.total": "-",// '0'完成的合并操作的数量
                            "merges.total_docs": "-",// '0'合并文档的数量
                            "merges.total_size": "-",// '0b'当前合并的大小
                            "merges.total_time": "-",// '0s'当前合并的大小
                            "node": "-",// 'd3c7fdf362fb'节点主机名
                            "path.data": "-",// '/usr/share/elasticsearch/data/nodes/0'路径数据
                            "path.state": "-",// '/usr/share/elasticsearch/data/nodes/0'路径状态
                            "prirep": "-",// 'p'分片类型
                            "query_cache.evictions": "-",// '0'查询缓存逐出
                            "query_cache.memory_size": "-",// '0b'已使用的查询缓存存储器
                            "recoverysource.type": "-",// null恢复源的类型
                            "refresh.external_time": "-",// '1.1s'
                            "refresh.external_total": "-",// '5'
                            "refresh.listeners": "-",// '0'
                            "refresh.time": "-",// '1.1s'刷新所花费的时间
                            "refresh.total": "-",// '6'刷新次数
                            "search.fetch_current": "-",// '0'当前的提取阶段操作
                            "search.fetch_time": "-",// '64ms'在抓取阶段花费的时间
                            "search.fetch_total": "-",// '1'提取操作的数量
                            "search.open_contexts": "-",// '0'打开搜索上下文
                            "search.query_current": "-",// '0'当前的查询阶段操作
                            "search.query_time": "-",// '44ms'在查询阶段花费的时间
                            "search.query_total": "-",// '1'查询操作的数量
                            "search.scroll_current": "-",// '0'当前打开滚动上下文
                            "search.scroll_time": "-",// '0s'上下文保持打开状态滚动时间
                            "search.scroll_total": "-",// '0'完成滚动上下文
                            "segments.count": "-",// '2'段数
                            "segments.fixed_bitset_memory": "-",// '0b'固定位集用于嵌套对象字段类型的内存
                            "segments.index_writer_memory": "-",// '0b'索引编写器使用的内存
                            "segments.memory": "-",// '12.8kb'段使用的内存
                            "segments.version_map_memory": "-",// '0b'版本映射使用的内存
                            "seq_no.global_checkpoint": "-",// '998'全局检查点
                            "seq_no.local_checkpoint": "-",// '998'本地检查点
                            "seq_no.max": "-",// '998'最大序列号
                            "shard": "-",// '0'当前分片
                            "state": "-",// 'STARTED'分片状态
                            "store": "-",// '396.5kb'分片存储size
                            "sync_id": "-",// null
                            "unassigned.at": "-",// null
                            "unassigned.details": "-",// null
                            "unassigned.for": "-",// null
                            "unassigned.reason": "-",// null
                            "warmer.current": "-",// '0'
                            "warmer.total": "-",// '4'
                            "warmer.total_time": "-",// '6ms'
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
                bootstrap: {
                    servers: '192.168.0.105:9092'
                },
                bootstrap_servers: {
                    "home": "192.168.0.105:9092"
                },
                headers: {//存放分页信息
                    "ES_HOST": "http://39.107.236.187:7014",
                    "ES_PAGE": "true",
                    "ES_PAGE_SIZE": "15",
                    "ES_FILTER": {}
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
            const index = this.$route.query && this.$route.query.index;
            self.index = index;
            const header_ES_HOST = this.$route.query && this.$route.query.header_ES_HOST;
            self.headers.ES_HOST = JSON.parse(header_ES_HOST);
            self.ConfigController_GetServers();
            self.Index_ShardController_Cat_Shards();
        },
        watch: {},
        methods: {
            Index_ShardController_Cat_Shards() {
                let self = this;
                self.$http.get(self.api.Index_ShardController_Cat_Shards + self.index, {
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
                        self.Index_ShardController_Cat_Shards_Result = response.content;
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
            }
            ,
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
            handleCurrentChange(currentChange) {
                let self = this;
                self.$http.get(self.api.RedisController_GetRecordByScrollId, {
                    params: {
                        'scrollId': self.Index_ShardController_Cat_Shards_Result.orderBy,
                        'pageNum': currentChange,
                        'pageSize': self.Index_ShardController_Cat_Shards_Result.pageSize,
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.Index_ShardController_Cat_Shards_Result = response.content;
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
            }
            ,
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
                this.queryBase();
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
