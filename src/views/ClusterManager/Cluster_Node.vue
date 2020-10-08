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
                <h5 class="form-tit">集群Nodes信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>id</th>
                        <th>name</th>
                        <th>cpu</th>
                        <th>ram.percent</th>
                        <th>disk.used_percent</th>
                        <th>load_1m</th>
                        <th>ram.current/ram.max</th>
                        <th>disk.used/disk.total</th>
                        <th>http_address</th>
                        <th>node.role</th>
                        <th>version</th>
                        <th>uptime</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>序号</th>
                        <th>节点id</th>
                        <th>节点主机</th>
                        <th>CPU使用</th>
                        <th>内存百分比</th>
                        <th>已使用磁盘百分比</th>
                        <th>负载</th>
                        <th>内存使用/总内存</th>
                        <th>已使用磁盘/总磁盘</th>
                        <th>http地址</th>
                        <th>节点角色</th>
                        <th>版本</th>
                        <th>启动时长</th>

                    </tr>
                    <tbody>
                    <template v-if="Cluster_NodeController_Cat_Nodes_Format_Result">
                        <tr v-for="(info,index) in Cluster_NodeController_Cat_Nodes_Format_Result">
                            <td>{{index+1}}</td>
                            <td>{{info.id}}</td>
                            <td>{{info.name}}</td>
                            <td>{{info.cpu}}%</td>
                            <td>{{info['ram.percent']}}%</td>
                            <td>{{info['disk.used_percent']}}%</td>
                            <td>{{info.load_1m}}</td>
                            <td>{{info['ram.current']}}/{{info['ram.max']}}</td>
                            <td>{{info['disk.used']}}/{{info['disk.total']}}</td>
                            <td>{{info.http_address}}</td>
                            <td>{{info['node.role']}}</td>
                            <td>{{info.version}}</td>
                            <td>{{info.uptime}}</td>
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
                Cluster_NodeController_Cat_Nodes_Format_Result: [
                    {
                        "build": "d34da0ea4a966c4e49417f2da2f244e3e97b4e6e",//Elasticsearch构建哈希
                        "completion.size": "0b",//完成大小
                        "cpu": "100",//节点最近的系统CPU使用率
                        "disk.avail": "34.7gb",//可用磁盘空间
                        "disk.total": "232.5gb",//节点总磁盘空间
                        "disk.used": "197.7gb",//节点已使用的磁盘空间
                        "disk.used_percent": "85.04",//已用磁盘空间百分比
                        "fielddata.evictions": "0",//字段数据缓存逐出
                        "fielddata.memory_size": "0b",//已使用的字段数据缓存存储器
                        "file_desc.current": "290",//节点当前文件描述
                        "file_desc.max": "10240",//节点最大文件描述
                        "file_desc.percent": "2",//节点使用的文件描述符百分比
                        "flavor": "default",//节点分支
                        "flush.total": "16",//冲洗次数
                        "flush.total_time": "1.8s",//花在冲洗上的时间
                        "get.current": "0",//当前获取操作的数量
                        "get.exists_time": "154ms",//成功获取所花费的时间
                        "get.exists_total": "2",//成功执行get操作的次数
                        "get.missing_time": "0s",//花费失败的时间
                        "get.missing_total": "0",//获取操作失败的次数
                        "get.time": "154ms",//花费的时间
                        "get.total": "2",//获取操作的数量
                        "heap.current": "481.9mb",//已用堆
                        "heap.max": "1gb",
                        "heap.percent": "47",//节点最大配置堆
                        "http_address": "127.0.0.1:9202",//节点http地址
                        "id": "m8L3",
                        "indexing.delete_current": "0",//当前删除操作的数量
                        "indexing.delete_time": "202ms",//删除所花费的时间
                        "indexing.delete_total": "1",//indexing.delete_total
                        "indexing.index_current": "0",//当前索引操作的数量
                        "indexing.index_failed": "0",//索引操作失败的次数
                        "indexing.index_time": "2.8s",//用于建立索引的时间
                        "indexing.index_total": "12113",//索引操作的数量
                        "ip": "127.0.0.1",//节点ip
                        "jdk": "15",//节点JDK版本
                        "load_1m": "4.30",//最近的平均负载
                        "master": "*",//节点是否为当选的主节点。返回的值包括*（当选的主服务器）和-（当选的主服务器
                        "merges.current": "0",//当前合并操作的数量
                        "merges.current_docs": "0",//当前合并文档的数量
                        "merges.current_size": "0b",//当前合并的大小
                        "merges.total": "0",//完成的合并操作的次数
                        "merges.total_docs": "0",//合并文档的数量
                        "merges.total_size": "0b",//当前合并的大小
                        "merges.total_time": "0s",//合并文档所花费的时间
                        "name": "这个是样例数据",//节点主机名称
                        "node.role": "dilmrt",//节点角色 节点的角色。返回的值包括d（数据节点），i （目标节点），m（主资格节点），l（机器学习节点），v （仅投票节点），t（转换节点），r（远程集群客户端节点）和-（仅协调节点） ）。
                        "pid": "9059",//节点ES进程号
                        "port": "9300",//节点端口号
                        "query_cache.evictions": "0",//查询缓存逐出
                        "query_cache.memory_size": "0b",//已使用的查询缓存存储器
                        "ram.current": "7.9gb",//已用的总内存
                        "ram.max": "8gb",//总内存
                        "ram.percent": "100",//已使用的总内存百分比
                        "refresh.external_time": "3.4s",
                        "refresh.external_total": "86",
                        "refresh.listeners": "0",
                        "refresh.time": "3.5s",//刷新所花费的时间，
                        "refresh.total": "102",//刷新次数
                        "request_cache.evictions": "0",//请求缓存逐出
                        "request_cache.hit_count": "477",//请求缓存命中计数
                        "request_cache.memory_size": "8.9kb",//已使用的请求缓存存储器
                        "request_cache.miss_count": "13",//请求缓存未命中计数
                        "script.cache_evictions": "0",//从缓存中逐出的已编译脚本总数
                        "script.compilation_limit_triggered": "0",
                        "script.compilations": "1",//脚本编译总数
                        "search.fetch_current": "0",//search.fetch_current
                        "search.fetch_time": "1.3s",//在抓取阶段花费的时间
                        "search.fetch_total": "358",//提取操作的数量
                        "search.open_contexts": "0",//打开搜索上下文
                        "search.query_current": "0",//当前的查询阶段操作
                        "search.query_time": "5.1s",//在查询阶段花费的时间
                        "search.query_total": "854",//节点完成检索总次数
                        "search.scroll_current": "0",//打开滚动上下文
                        "search.scroll_time": "6.3h",//上下文保持打开状态时间滚动
                        "search.scroll_total": "31",//节点完成滚动检索总次数
                        "segments.count": "25",//segments.count
                        "segments.fixed_bitset_memory": "0b",//固定位集使用的内存用于嵌套对象字段类型，而类型过滤器用于join字段中引用的类型，例如1.0kb。
                        "segments.index_writer_memory": "0b",//索引编写器使用的内存
                        "segments.memory": "54.8kb",//段使用的内存
                        "segments.version_map_memory": "0b",//版本映射使用的内存
                        "suggest.current": "0",
                        "suggest.time": "0s",//建议所花费的时间
                        "suggest.total": "0",//建议操作的数量
                        "type": "tar",//节点类型
                        "uptime": "2.2d",//节点正常运行时间
                        "version": "7.9.2"//节点版本
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
            self.Cluster_NodeController_Cat_Nodes_Format();

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
            Cluster_NodeController_Cat_Nodes_Format() {
                let self = this;
                self.$http.get(self.api.Cluster_NodeController_Cat_Nodes_Format, {}, function (response) {
                    if (response.code == 0) {
                        self.Cluster_NodeController_Cat_Nodes_Format_Result = response.content;
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
