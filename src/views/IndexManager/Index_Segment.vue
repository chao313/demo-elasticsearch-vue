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
                <h5 class="form-tit">索引Segment信息</h5>
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
                    <template v-if="Index_SegmentController_Cat_Segments_Result.list">
                        <tr v-for="(info,index) in Index_SegmentController_Cat_Segments_Result.list">
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
            <el-pagination v-show="Index_SegmentController_Cat_Segments_Result.list.length > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="Index_SegmentController_Cat_Segments_Result.pageNum"
                           :page-size="Index_SegmentController_Cat_Segments_Result.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="Index_SegmentController_Cat_Segments_Result.total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                Index_SegmentController_Cat_Segments_Result: {
                    endRow: 10,
                    firstPage: 1,
                    hasNextPage: true,
                    hasPreviousPage: false,
                    isFirstPage: true,
                    isLastPage: false,
                    lastPage: 8,
                    list: [
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
                    navigatePages: 8,
                    navigatepageNums: [1, 2, 3, 4, 5, 6, 7, 8],
                    nextPage: 2,
                    orderBy: "18ff48aa-258e-40ef-b555-0843dfad462c",
                    pageNum: 1,
                    pageSize: 10,
                    pages: 10,
                    prePage: 0,
                    size: 10,
                    startRow: 1,
                    total: 18100
                },
                bootstrap: {
                    servers: ''//192.168.0.105:9092
                },
                bootstrap_servers: {
                    "home": ""//192.168.0.105:9092
                },
                headers: {//存放分页信息
                    ES_HOST: "",
                    ES_PAGE: "true",
                    ES_PAGE_SIZE: "15",
                    ES_FILTER: {}
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
            const header_ES_HOST = this.$route.query && this.$route.query.header_ES_HOST;
            self.headers.ES_HOST = JSON.parse(header_ES_HOST);
            self.ConfigController_GetServers();
            self.Index_SegmentController_Cat_Segments();
        },
        watch: {},
        methods: {
            Index_SegmentController_Cat_Segments() {
                let self = this;
                self.$http.get(self.api.Index_SegmentController_Cat_Segments + self.index, {
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
                        self.Index_SegmentController_Cat_Segments_Result = response.content;
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
                            // self.$message({
                            //     type: 'success',
                            //     message: '查询成功',
                            //     duration: 1000
                            // });
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
                        'scrollId': self.Index_SegmentController_Cat_Segments_Result.orderBy,
                        'pageNum': currentChange,
                        'pageSize': self.Index_SegmentController_Cat_Segments_Result.pageSize,
                    }
                }, function (response) {

                    if (response.code == 0) {
                        self.Index_SegmentController_Cat_Segments_Result = response.content;
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
            searchEvent() {
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
