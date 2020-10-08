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
                    <template v-if="Cluster_ShardController_Cat_Shards_Format_Result">
                        <tr v-for="(info,index) in Cluster_ShardController_Cat_Shards_Format_Result">
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

    </div>

</template>

<script>
    export default {
        data() {
            return {
                Cluster_ShardController_Cat_Shards_Format_Result: [
                    {
                        "completion.size": "0b",//完成大小
                        "docs": "20",//分片中的文档数
                        "fielddata.evictions": "0",//字段数据缓存逐出
                        "fielddata.memory_size": "0b",//已使用的字段数据缓存存储器
                        "flush.total": "1",//冲洗次数
                        "flush.total_time": "106ms",//花在冲洗上的时间
                        "get.current": "0",//当前get操作的数量
                        "get.exists_time": "0s",//成功get所花费的时间
                        "get.exists_total": "0",//成功执行get操作的次数
                        "get.missing_time": "0s",//get失败的时间
                        "get.missing_total": "0",//get操作失败的次数
                        "get.time": "0s",//get的时间
                        "get.total": "0",//get操作的数量
                        "id": "m8L3fWtcTeOPC6IPXw6beA",
                        "index": "index3",//索引
                        "indexing.delete_current": "0",//当前删除操作的数量
                        "indexing.delete_time": "0s",//删除所花费的时间
                        "indexing.delete_total": "0",//删除操作的数量
                        "indexing.index_current": "0",//当前索引操作的数量
                        "indexing.index_failed": "0",//索引操作失败的次数
                        "indexing.index_time": "98ms",//用于建立索引的时间
                        "indexing.index_total": "20",//索引操作的数量
                        "ip": "127.0.0.1",//ip
                        "merges.current": "0",//当前合并操作的数量
                        "merges.current_docs": "0",//当前合并文档的数量
                        "merges.current_size": "0b",//当前合并的大小
                        "merges.total": "0",//完成的合并操作的数量
                        "merges.total_docs": "0",//合并文档的数量
                        "merges.total_size": "0b",//当前合并的大小
                        "merges.total_time": "0s",//当前合并的大小
                        "node": "chaodeMacBook-Pro.local",//节点主机名
                        "path.data": "a/nodes/0 /Users/chao/software/elasticsearch-7.9.2/d",//路径数据
                        "path.state": "ta/nodes/0",
                        "prirep": "p",//分片类型
                        "query_cache.evictions": "0",//查询缓存逐出
                        "query_cache.memory_size": "0b",//已使用的查询缓存存储器
                        "recoverysource.type": "",//恢复源的类型
                        "refresh.external_time": "191ms",
                        "refresh.external_total": "5",
                        "refresh.listeners": "0",
                        "refresh.time": "190ms",//刷新所花费的时间
                        "refresh.total": "6",//刷新次数
                        "search.fetch_current": "0",//当前的提取阶段操作
                        "search.fetch_time": "7ms",//在抓取阶段花费的时间
                        "search.fetch_total": "3",//提取操作的数量
                        "search.open_contexts": "0",//打开搜索上下文
                        "search.query_current": "0",//当前的查询阶段操作
                        "search.query_time": "180ms",//在查询阶段花费的时间
                        "search.query_total": "59",//查询操作的数量
                        "search.scroll_current": "0",//当前打开滚动上下文
                        "search.scroll_time": "0s",//上下文保持打开状态滚动时间
                        "search.scroll_total": "0",//完成滚动上下文
                        "segments.count": "3",//段数
                        "segments.fixed_bitset_memory": "0b",//固定位集用于嵌套对象字段类型的内存
                        "segments.index_writer_memory": "0b",//索引编写器使用的内存
                        "segments.memory": "5.4kb",//段使用的内存
                        "segments.version_map_memory": "0b",//版本映射使用的内存
                        "seq_no.global_checkpoint": "19",//全局检查点
                        "seq_no.local_checkpoint": "19",//本地检查点
                        "seq_no.max": "19",//最大序列号
                        "shard": "0",//当前分片
                        "state": "STARTED",
                        "store": "4.7kb",
                        "sync_id": "",
                        "unassigned.at": "",
                        "unassigned.details": "",
                        "unassigned.for": "",
                        "unassigned.reason": "",
                        "warmer.current": "0",
                        "warmer.total": "4",
                        "warmer.total_time": "0s /Users/chao/software/elasticsearch-7.9.2/da"
                    }
                ],
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
            self.Cluster_ShardController_Cat_Shards_Format();

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
            Cluster_ShardController_Cat_Shards_Format() {
                let self = this;
                self.$http.get(self.api.Cluster_ShardController_Cat_Shards_Format, {}, function (response) {
                    if (response.code == 0) {
                        self.Cluster_ShardController_Cat_Shards_Format_Result = response.content;
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
                        }
                        else {
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
