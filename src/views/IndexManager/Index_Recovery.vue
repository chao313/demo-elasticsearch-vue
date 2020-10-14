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
                <h5 class="form-tit">索引Recovery信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>index</th>
                        <th>shard</th>
                        <th>time</th>
                        <th>type</th>
                        <th>stage</th>
                        <th>source_host</th>
                        <th>source_node</th>
                        <th>target_host</th>
                        <th>target_node</th>
                        <th>repository</th>
                        <th>snapshot</th>
                        <th>files</th>
                        <th>files_recovered</th>
                        <th>files_percent</th>
                        <th>files_total</th>
                        <th>bytes</th>
                        <th>bytes_recovered</th>
                        <th>bytes_percent</th>
                        <th>bytes_total</th>
                        <th>translog_ops</th>
                        <th>translog_ops_recovered</th>
                        <th>translog_ops_percent</th>

                    </tr>
                    </thead>
                    <tr>
                        <th>索引名称</th>
                        <th>分片名称</th>
                        <th>时间</th>
                        <th>类型</th>
                        <th>阶段</th>
                        <th>源host</th>
                        <th>源node</th>
                        <th>目标host</th>
                        <th>目标Node</th>
                        <th>仓库</th>
                        <th>快照</th>
                        <th>文件</th>
                        <th>被恢复的文件</th>
                        <th>文件百分比</th>
                        <th>总文件数量</th>
                        <th>字节数</th>
                        <th>恢复的字节数</th>
                        <th>恢复是字节百分比</th>
                        <th>总字节数</th>
                        <th>传输日志</th>
                        <th>恢复的传输日志</th>
                        <th>传输日志百分比</th>
                    </tr>
                    <tbody>

                    <template v-if="Index_RecoveryController_Cat_Recovery_Result">
                        <template v-for="(info,index) in Index_RecoveryController_Cat_Recovery_Result">
                            <tr>
                                <td>{{info.index}}</td>
                                <td>{{info.shard}}</td>
                                <td>{{info.time}}</td>
                                <td>{{info.type}}</td>
                                <td>{{info.stage}}</td>
                                <td>{{info.source_host}}</td>
                                <td>{{info.source_node}}</td>
                                <td>{{info.target_host}}</td>
                                <td>{{info.target_node}}</td>
                                <td>{{info.repository}}</td>
                                <td>{{info.snapshot}}</td>
                                <td>{{info.files}}</td>
                                <td>{{info.files_recovered}}</td>
                                <td>{{info.files_percent}}</td>
                                <td>{{info.files_total}}</td>
                                <td>{{info.bytes}}</td>
                                <td>{{info.bytes_recovered}}</td>
                                <td>{{info.bytes_percent}}</td>
                                <td>{{info.bytes_total}}</td>
                                <td>{{info.translog_ops}}</td>
                                <td>{{info.translog_ops_recovered}}</td>
                                <td>{{info.translog_ops_percent}}</td>
                            </tr>
                        </template>
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
                index: '样例数据',
                Index_RecoveryController_Cat_Recovery_Result: [
                    {
                        "index": "-",//index_bulk 索引名称
                        "shard": "-",//0 分片名称
                        "time": "-",//175ms 时间
                        "type": "-",//existing_store 类型
                        "stage": "-",//done 阶段
                        "source_host": "-",//n/a 源host
                        "source_node": "-",//n/a 源node
                        "target_host": "-",//172.17.0.12 目标host
                        "target_node": "-",//d3c7fdf362fb 目标Node
                        "repository": "-",//n/a 仓库
                        "snapshot": "-",//n/a 快照
                        "files": "-",//0 文件
                        "files_recovered": "-",//0 被恢复的文件
                        "files_percent": "-",//100.0% 文件百分比
                        "files_total": "-",//7 总文件数量
                        "bytes": "-",//0 字节数
                        "bytes_recovered": "-",//0 恢复的字节数
                        "bytes_percent": "-",//100.0% 恢复是字节百分比
                        "bytes_total": "-",//406051 总字节数
                        "translog_ops": "-",//0 传输日志
                        "translog_ops_recovered": "-",//0恢复的传输日志
                        "translog_ops_percent": "-"//100.0% 传输日志百分比
                    }
                ],
                bootstrap_servers: {
                    "home": "192.168.0.105:9092"
                },
                bootstrap: {
                    servers: '192.168.0.105:9092'
                },
            }
        },
        mounted() {
            let self = this;
        },
        created() {
            let self = this;
            const index = this.$route.query && this.$route.query.index;
            self.index = index;
            self.Index_RecoveryController_Cat_Recovery();

        },
        watch: {},
        methods: {//获取具体的配置
            Index_RecoveryController_Cat_Recovery() {
                let self = this;
                self.$http.get(self.api.Index_RecoveryController_Cat_Recovery + self.index, {
                    params: {
                        'format': 'JSON',
                        'h': '*'
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Index_RecoveryController_Cat_Recovery_Result = response.content;
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
