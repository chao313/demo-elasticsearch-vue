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
                <el-form-item label="选择size">
                    <el-select v-model="request.size">
                        <el-option v-for=" item in level" :key="item" :label="item"
                                   :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择排序">
                    <el-select v-model="request.sort">
                        <el-option v-for=" item in sources.fields" :key="item" :label="item"
                                   :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
            <hr>
            <el-collapse>
                <el-collapse-item title="字段选择(默认展示全部)" name="1">
                    <el-checkbox :indeterminate="sources.isIndeterminate" v-model="sources.checkAll"
                                 @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="sources.checkedFields" @change="handlecheckedFieldsChange">
                        <el-checkbox v-for="field in sources.fields" :label="field" :key="field">{{field}}</el-checkbox>
                    </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>
            <div style="margin: 15px 0;"></div>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <hr>
                <h5 class="form-tit">({{index}})索引基础信息</h5>
                <table>
                    <thead>
                    <tr>
                        <template v-if="sources.checkedFields">
                            <th>id</th>
                            <!--<th>_index</th>-->
                            <!--<th>_type</th>-->
                            <template v-for="field in sources.checkedFields">
                                <th class="td-format">{{field}}</th>
                            </template>
                            <th>操作</th>
                        </template>
                    </tr>
                    </thead>
                    <tbody>

                    <template v-if="Search_DSL_MatchAllController_Search_Result">
                        <template v-for="(info1,index) in Search_DSL_MatchAllController_Search_Result.hits.hits">
                            <tr>
                                <td>{{index+1}}</td>
                                <template v-if="Index_MappingController_Mapping_Compatible_Result">
                                    <!--<td>{{info1._index}}</td>-->
                                    <!--<td>{{info1._type}}</td>-->
                                    <template v-for="field in sources.checkedFields">
                                        <td class="in-line td-format">{{info1._source[field]}}</td>
                                    </template>
                                </template>
                                <td class="in-line">
                                    <span @click="Index_DocumentController_Get(info1._index,info1._type,info1._id)">查看</span>
                                    <span @click="edit(info1._index,info1._type,info1._id,info1._source)">修改</span>
                                    <span class="red"
                                          @click="Index_DocumentController_Delete(info1._index,info1._type,info1._id)">删除</span>
                                </td>
                            </tr>
                        </template>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt10">
            <!--/** */:page-size  数一页的数量！！！-->
            <el-pagination v-show="Search_DSL_MatchAllController_Search_Result.compatible_total > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="request.from/request.size+1"
                           :page-size="request.size"
                           layout="total, prev, pager, next, jumper"
                           :total="Search_DSL_MatchAllController_Search_Result.compatible_total">
            </el-pagination>
        </div>
        <el-dialog
                title="更新"
                :visible.sync="dialog.dialogVisible"
                width="40%">
            <el-input
                    type="textarea"
                    :rows="20"
                    placeholder="请输入json"
                    v-model="dialog.value">
            </el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialog.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleClose">确 定</el-button></span>
        </el-dialog>
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
                    "timed_out": false,
                    "compatible_total": 0 //兼容size
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
                    "size": 15,
                    sort:"_score"
                },
                bootstrap_servers: {
                    "home": "192.168.0.105:9092"
                },
                bootstrap: {
                    servers: '192.168.0.105:9092'
                },
                headers: {
                    "ES_HOST": "http://39.107.236.187:7014"
                },
                sources: {
                    checkAll: false,
                    checkedFields: ['样例数据', '样例数据'],//存放筛选的字段
                    fields: ['样例数据', '样例数据'],
                    isIndeterminate: true
                },
                level: ['15', '50', '100', '500', '1000', '2000'],
                dialog: {
                    dialogVisible: false,
                    value: '',
                    index: '',
                    type: '',
                    id: '',
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
            self.Index_MappingController_Mapping_Compatible();
            self.Search_DSL_MatchAllController_Search();//匹配全部

        },
        watch: {},
        methods: {//获取具体的配置
            Index_MappingController_Mapping_Compatible() {
                let self = this;
                self.$http.post(self.api.Index_MappingController_Mapping_Compatible + "/" + self.index + "/_mapping/compatible", {}, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Index_MappingController_Mapping_Compatible_Result = response.content;
                        //提取全部的key
                        const keys = [];
                        for (var key in response.content) {
                            keys.push(key);
                        }
                        self.sources.fields = keys;
                        self.sources.checkedFields = keys;

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
                //self.request._source = self.sources.checkedFields;//这个很重要 需要考虑是否启用
                self.$http.post(self.api.Search + "/" + self.index + "/_search", self.request, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Search_DSL_MatchAllController_Search_Result = response.content;
                        /**
                         * 兼容ES版本问题 存放total的位置变化
                         */
                        console.info("total:" + self.Search_DSL_MatchAllController_Search_Result.hits.total)
                        if (null != self.Search_DSL_MatchAllController_Search_Result.hits.total.value) {
                            self.Search_DSL_MatchAllController_Search_Result.compatible_total = self.Search_DSL_MatchAllController_Search_Result.hits.total.value;
                        } else if (null != self.Search_DSL_MatchAllController_Search_Result.hits.total) {
                            self.Search_DSL_MatchAllController_Search_Result.compatible_total = self.Search_DSL_MatchAllController_Search_Result.hits.total;
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
                self.request.from = (currentChange - 1) * self.request.size;
                self.Search_DSL_MatchAllController_Search();
            }
            ,

            routerToConsumerManagerList(bootstrap_servers) {
                let queryStr = "";
                queryStr = queryStr + "bootstrap_servers=" + bootstrap_servers + "";
                window.open("#/ConsumerManagerList" + "?" + queryStr, '_self');
            }
            ,
            searchEvent() {
                this.Search_DSL_MatchAllController_Search();
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
            },
            Index_DocumentController_Delete(index, type, id) {
                this.$confirm('是否删除该条索引？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let self = this;
                    self.$http.delete(self.api.Index_DocumentController_Delete + index + "/" + type + "/" + id, {
                        headers: {
                            "ES_HOST": self.headers.ES_HOST
                        }
                    }, function (response) {
                        if (response.code == 0) {
                            self.$message({
                                type: 'success',
                                message: '删除成功',
                                duration: 2000
                            });
                            self.Search_DSL_MatchAllController_Search();//刷新 这里的删除有延迟，立刻刷新会有检索延迟问题
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
                });
            },
            Index_DocumentController_Get(index, type, id) {
                let self = this;
                self.$http.get(self.api.Index_DocumentController_GET + index + "/" + type + "/" + id, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.$message({
                            type: 'success',
                            message: '查询成功',
                            duration: 2000
                        });
                        self.pen(JSON.stringify(response.content, null, 2))
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
            pen(value) {
                this.$alert('<pre>' + value + '</pre>', '预览', {
                    dangerouslyUseHTMLString: true
                });
            },
            edit(index, type, id, value) {
                let self = this;
                //清空
                self.dialog.value = '';
                self.dialog.index = '';
                self.dialog.type = '';
                self.dialog.id = '';
                //
                self.dialog.dialogVisible = true;
                self.dialog.value = JSON.stringify(value, null, 2);
                self.dialog.index = index;
                self.dialog.type = type;
                self.dialog.id = id;

            },
            Index_DocumentController_Update(index, type, id, value) {
                let self = this;
                self.$http.put(self.api.Index_DocumentController_Update + index + "/" + type + "/" + id, value, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST,
                        'content-type': 'application/json'
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.$message({
                            type: 'success',
                            message: '更新成功',
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
            handleCheckAllChange(val) {
                this.sources.checkedFields = val ? this.sources.fields : [];
                this.sources.isIndeterminate = false;
            },
            handlecheckedFieldsChange(value) {
                let checkedCount = value.length;
                this.sources.checkAll = checkedCount === this.sources.fields.length;
                this.sources.isIndeterminate = checkedCount > 0 && checkedCount < this.sources.fields.length;
            },
            handleClose() {
                let self = this;
                //更新
                this.$confirm('确认更新?')
                    .then(_ => {
                        self.Index_DocumentController_Update(self.dialog.index, self.dialog.type, self.dialog.id, self.dialog.value);
                        self.dialog.dialogVisible = false
                    })
                    .catch(_ => {
                        self.dialog.dialogVisible = false
                    });
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

    .red {
        color: #b21f2d !important;
        /*font-size: 100px;*/
    }

    .in-line {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .td-format {
        text-align: left !important;
        padding-left: 16px;
    }

    .t_area {
        width: 300px;
        overflow-y: visible
    }
</style>
