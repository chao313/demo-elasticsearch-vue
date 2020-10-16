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
                <el-form-item label="ipContain">
                    <el-input v-model="headers.ES_FILTER.ip" placeholder="请输入ipContain"></el-input>
                </el-form-item>
                <el-form-item label="node.role">
                    <el-input v-model="headers.ES_FILTER['node.role']" placeholder="请输入node.role(d/-)"></el-input>
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
                        <th>ip</th>
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
                        <th>节点ip</th>
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
                    <template v-if="Cluster_NodeController_Cat_Nodes_Result.list">
                        <tr v-for="(info,index) in Cluster_NodeController_Cat_Nodes_Result.list">
                            <td>{{index+1}}</td>
                            <td>{{info.id}}</td>
                            <td>{{info.ip}}</td>
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
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Cluster_NodeController_Cat_Nodes_Result.list.length > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="Cluster_NodeController_Cat_Nodes_Result.pageNum"
                           :page-size="Cluster_NodeController_Cat_Nodes_Result.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="Cluster_NodeController_Cat_Nodes_Result.total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                Cluster_NodeController_Cat_Nodes_Result: {
                    "endRow": 10,
                    "firstPage": 1,
                    "hasNextPage": true,
                    "hasPreviousPage": false,
                    "isFirstPage": true,
                    "isLastPage": false,
                    "lastPage": 8,
                    "list": [
                        {
                            "build": "d34da0ea4a966c4e49417f2da2f244e3e97b4e6e",//Elasticsearch构建哈希
                            "completion.size": "",//0b完成大小
                            "cpu": "",//100节点最近的系统CPU使用率
                            "disk.avail": "",//34.7gb可用磁盘空间
                            "disk.total": "",//232.5gb节点总磁盘空间
                            "disk.used": "",//197.7gb节点已使用的磁盘空间
                            "disk.used_percent": "",//85.04已用磁盘空间百分比
                            "fielddata.evictions": "",//0字段数据缓存逐出
                            "fielddata.memory_size": "",//0b已使用的字段数据缓存存储器
                            "file_desc.current": "",//290节点当前文件描述
                            "file_desc.max": "",//10240节点最大文件描述
                            "file_desc.percent": "",//2节点使用的文件描述符百分比
                            "flavor": "",//default节点分支
                            "flush.total": "",//16冲洗次数
                            "flush.total_time": "",//1.8s花在冲洗上的时间
                            "get.current": "",//0当前获取操作的数量
                            "get.exists_time": "",//154ms成功获取所花费的时间
                            "get.exists_total": "",//2成功执行get操作的次数
                            "get.missing_time": "",//0s花费失败的时间
                            "get.missing_total": "",//0获取操作失败的次数
                            "get.time": "",//154ms花费的时间
                            "get.total": "",//2获取操作的数量
                            "heap.current": "",//481.9mb已用堆
                            "heap.max": "",//1gb
                            "heap.percent": "",//47节点最大配置堆
                            "http_address": "",//127.0.0.1:9202节点http地址
                            "id": "",//m8L3
                            "indexing.delete_current": "",//0当前删除操作的数量
                            "indexing.delete_time": "",//202ms删除所花费的时间
                            "indexing.delete_total": "",//1 indexing.delete_total
                            "indexing.index_current": "",//0当前索引操作的数量
                            "indexing.index_failed": "",//0索引操作失败的次数
                            "indexing.index_time": "",//2.8s用于建立索引的时间
                            "indexing.index_total": "",//12113索引操作的数量
                            "ip": "",//127.0.0.1节点ip
                            "jdk": "",//15节点JDK版本
                            "load_1m": "",//4.30最近的平均负载
                            "master": "",//* 节点是否为当选的主节点。返回的值包括*（当选的主服务器）和-（当选的主服务器
                            "merges.current": "",//0 当前合并操作的数量
                            "merges.current_docs": "",//0 当前合并文档的数量
                            "merges.current_size": "",//0b 当前合并的大小
                            "merges.total": "",//0 完成的合并操作的次数
                            "merges.total_docs": "",//0 合并文档的数量
                            "merges.total_size": "",//0b 当前合并的大小
                            "merges.total_time": "",//0s 合并文档所花费的时间
                            "name": "",//这个是样例数据 节点主机名称
                            "node.role": "",//dilmrt 节点角色 节点的角色。返回的值包括d（数据节点），i （目标节点），m（主资格节点），l（机器学习节点），v （仅投票节点），t（转换节点），r（远程集群客户端节点）和-（仅协调节点） ）。
                            "pid": "",//9059 节点ES进程号
                            "port": "",//9300 节点端口号
                            "query_cache.evictions": "",//0 查询缓存逐出
                            "query_cache.memory_size": "",//0b 已使用的查询缓存存储器
                            "ram.current": "",//7.9gb 已用的总内存
                            "ram.max": "",// 8gb总内存
                            "ram.percent": "",// 100 已使用的总内存百分比
                            "refresh.external_time": "",//3.4s
                            "refresh.external_total": "",//86
                            "refresh.listeners": "",//0
                            "refresh.time": "",//3.5s刷新所花费的时间，
                            "refresh.total": "",//102刷新次数
                            "request_cache.evictions": "",//0请求缓存逐出
                            "request_cache.hit_count": "",//477请求缓存命中计数
                            "request_cache.memory_size": "",//8.9kb已使用的请求缓存存储器
                            "request_cache.miss_count": "",//13请求缓存未命中计数
                            "script.cache_evictions": "",//0从缓存中逐出的已编译脚本总数
                            "script.compilation_limit_triggered": "",//0
                            "script.compilations": "",//1 脚本编译总数
                            "search.fetch_current": "",//0 search.fetch_current
                            "search.fetch_time": "",//1.3s 在抓取阶段花费的时间
                            "search.fetch_total": "",//358 提取操作的数量
                            "search.open_contexts": "",//0 打开搜索上下文
                            "search.query_current": "",//0 当前的查询阶段操作
                            "search.query_time": "",//5.1s 在查询阶段花费的时间
                            "search.query_total": "",//854 节点完成检索总次数
                            "search.scroll_current": "",//0 打开滚动上下文
                            "search.scroll_time": "",//6.3h 上下文保持打开状态时间滚动
                            "search.scroll_total": "",//31 节点完成滚动检索总次数
                            "segments.count": "",// 25 segments.count
                            "segments.fixed_bitset_memory": "",//0b 固定位集使用的内存用于嵌套对象字段类型，而类型过滤器用于join字段中引用的类型，例如1.0kb。
                            "segments.index_writer_memory": "",//0b 索引编写器使用的内存
                            "segments.memory": "",//54.8kb 段使用的内存
                            "segments.version_map_memory": "",//0b 版本映射使用的内存
                            "suggest.current": "",//0
                            "suggest.time": "",//0s 建议所花费的时间
                            "suggest.total": "",//0 建议操作的数量
                            "type": "",// tar 节点类型
                            "uptime": "",//2.2d 节点正常运行时间
                            "version": ""//7.9.2 节点版本
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
                    "ES_HOST": "http://39.107.236.187:7014",
                    "ES_PAGE": "true",
                    "ES_PAGE_SIZE": "15",
                    "ES_FILTER": {
                        "ip": "*",
                        "node.role": "*"
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
            self.bootstrap = {};
            self.bootstrap_servers = {};
            self.ConfigController_GetServers();
            self.Cluster_NodeController_Cat_Nodes();

        },
        watch: {},
        methods: {
            Cluster_NodeController_Cat_Nodes() {
                let self = this;
                self.$http.get(self.api.Cluster_NodeController_Cat_Nodes, {
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
                        self.Cluster_NodeController_Cat_Nodes_Result = response.content;
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
                // self.topicPartitionAndRealOffset = [];
                self.$http.get(self.api.RedisController_GetRecordByScrollId, {
                    params: {
                        'scrollId': self.Cluster_NodeController_Cat_Nodes_Result.orderBy,
                        'pageNum': currentChange,
                        'pageSize': self.Cluster_NodeController_Cat_Nodes_Result.pageSize,
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.consumers = [];
                        self.Cluster_NodeController_Cat_Nodes_Result = response.content;
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
                let self = this;
                self.Cluster_NodeController_Cat_Nodes();
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
