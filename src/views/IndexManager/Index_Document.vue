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
                        <template v-if="Index_MappingController_Mapping_Compatible_Result">
                            <th>id</th>
                            <template v-for="(info,field) in Index_MappingController_Mapping_Compatible_Result">
                                <th>{{field}}</th>
                            </template>
                        </template>
                    </tr>
                    </thead>
                    <tbody>

                    <template v-if="Search_DSL_MatchAllController_Search_Result">
                        <template v-for="(info1,index) in Search_DSL_MatchAllController_Search_Result.hits.hits">
                            <tr>
                                <td>{{index+1}}</td>
                                <template v-if="Index_MappingController_Mapping_Compatible_Result">
                                    <template v-for="(info,field) in Index_MappingController_Mapping_Compatible_Result">
                                        <td>{{info1._source[field]}}</td>
                                    </template>
                                </template>
                            </tr>
                        </template>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Search_DSL_MatchAllController_Search_Result.hits.total.value > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="request.from/request.size+1"
                           :page-size="request.size"
                           layout="total, prev, pager, next, jumper"
                           :total="Search_DSL_MatchAllController_Search_Result.hits.total.value">
            </el-pagination>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                index: '样例数据',
                Index_MappingController_Mapping_Compatible_Result: {//不同版本之间的格式相对有差别
                    "样例数据": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "ignore_above": 256,
                                "type": "keyword"
                            }
                        }
                    }
                },
                Search_DSL_MatchAllController_Search_Result: {
                    "_shards": {
                        "total": 1,
                        "failed": 0,
                        "successful": 1,
                        "skipped": 0
                    },
                    "hits": {
                        "hits": [
                            {
                                "_index": "tb_object_0088",
                                "_type": "tb_object_0088",
                                "_source": {
                                    "F24_0088": "百度地图(116.43138,39.953785);",
                                    "F21_0088": "总局",
                                    "RP_GEN_DATETIME": "2020-09-15 17:37:26",
                                    "F12_0088": "20021219"
                                },
                                "_id": "4a21d370-3149-4e0c-8f2f-76ef68bde8d1",
                                "_score": 1
                            }
                        ],
                        "total": {
                            "value": 30,
                            "relation": "eq"
                        },
                        "max_score": 1
                    },
                    "took": 11,
                    "timed_out": false
                }
                ,
                request: {
                    "_source": [
                        "*"
                    ],
                    "from": 0,
                    "query": {
                        "match_all": {
                            "boost": 1
                        }
                    },
                    "size": 15
                }
                ,
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
            self.Search_DSL_MatchAllController_Search();//匹配全部

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
            , Search_DSL_MatchAllController_Search() {
                let self = this;
                self.$http.post(self.api.Search_DSL_MatchAllController_Search + "/" + self.index + "/_search", self.request, {}, function (response) {
                    if (response.code == 0) {
                        self.Search_DSL_MatchAllController_Search_Result = response.content;
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
            handleCurrentChange(currentChange) {
                let self = this;
                self.request.from = (currentChange - 1) * self.request.size;
                self.Search_DSL_MatchAllController_Search();
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
