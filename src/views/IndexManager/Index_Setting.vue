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
                <h5 class="form-tit">索引Setting信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>provided_name</th>
                        <th>number_of_shards</th>
                        <th>number_of_replicas</th>
                        <th>creation_date</th>
                        <th>frozen</th>
                        <th>search.throttled</th>
                        <th>blocks.write</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>索引名称</th>
                        <th>分片数量</th>
                        <th>复制系数</th>
                        <th>创建时间</th>
                        <th>是否冻结</th>
                        <th>是否节流</th>
                        <th>是否阻塞写</th>
                    </tr>
                    <tbody>
                    <template v-if="Index_SettingController_Settings_Result.settings.index">
                        <tr>
                            <td>{{Index_SettingController_Settings_Result[index].settings.index.provided_name}}</td>
                            <td>{{Index_SettingController_Settings_Result.settings.index.number_of_shards}}</td>
                            <td>{{Index_SettingController_Settings_Result.settings.index.number_of_replicas}}</td>
                            <td>{{Index_SettingController_Settings_Result.settings.index.creation_date}}</td>
                            <td>{{Index_SettingController_Settings_Result.settings.index.frozen}}</td>
                            <td>{{Index_SettingController_Settings_Result.settings.index.search.throttled}}</td>
                            <td>{{Index_SettingController_Settings_Result.settings.index.blocks.write}}</td>
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
                index: "",
                Index_SettingController_Settings_Result: {
                    "settings": {
                        "index": {
                            "search": {
                                "throttled": "-"//true是否节流
                            },
                            "number_of_shards": "",//1 分片数量
                            "blocks": {
                                "write": "-"//true 是否阻塞写
                            },
                            "provided_name": "-",// test2提供的名称
                            "frozen": "-",//true 是否冻结
                            "creation_date": "-",//1602591430493 创建时间
                            "number_of_replicas": "-",//1 复制系数
                            "uuid": "-",//KuLEbXx9TjmfZtSrV8nRsw
                            "version": {
                                "created": "-"// 7090299 创建版本
                            }
                        }
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
            const index = this.$route.query && this.$route.query.index;
            self.index = index;
            self.Index_SettingController_Settings();
        },
        watch: {},
        methods: {

            //获取具体的配置
            Index_SettingController_Settings() {
                let self = this;
                self.$http.get(self.api.Index_SettingController_Settings + self.index + "/_settings", {
                    params: {
                        'format': 'JSON',
                        'h': '*'
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Index_SettingController_Settings_Result = response.content;
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
