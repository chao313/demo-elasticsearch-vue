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
                <h5 class="form-tit">({{index}})索引基础信息</h5>
                <table>
                    <thead>
                    <tr>
                        <th>fieldName</th>
                        <th>type</th>
                        <th>fields.keyword.type</th>
                        <th>fields.keyword.ignore_above</th>

                    </tr>
                    </thead>
                    <tr>
                        <th>字段名称</th>
                        <th>字段类型</th>
                        <th>字段keyword类型</th>
                        <th>字段keyword超过size不会分析</th>
                    </tr>
                    <tbody>

                    <template v-if="Index_MappingController_Mapping_Compatible_Result">
                        <template v-for="(info,field) in Index_MappingController_Mapping_Compatible_Result">
                            <tr>
                                <td>{{field}}</td>
                                <td>{{info.type}}</td>
                                <td>{{info.fields.keyword.type}}</td>
                                <td>{{info.fields.keyword.ignore_above}}</td>
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
                Index_MappingController_Mapping_Compatible_Result: {
                    "F24_0088": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "ignore_above": 256,
                                "type": "keyword"
                            }
                        }
                    },
                    "F24_0088": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "ignore_above": 256,
                                "type": "keyword"
                            }
                        }
                    }
                },
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
            self.Index_MappingController_Mapping_Compatible();

        },
        watch: {},
        methods: {//获取具体的配置
            Index_MappingController_Mapping_Compatible() {
                let self = this;
                self.$http.post(self.api.Index_MappingController_Mapping_Compatible + "/" + self.index + "/_mapping/compatible", {}, {}, function (response) {
                    if (response.code == 0) {
                        self.Index_MappingController_Mapping_Compatible_Result = response.content;
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
