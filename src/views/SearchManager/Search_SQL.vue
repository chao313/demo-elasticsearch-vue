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
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search"
                               @click="sqlExample()">示例
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button-search"
                               @click="sqlNotice()">注意
                    </el-button>
                </el-form-item>
                <template v-if="role.level > 0">
                    <el-form-item label="选择导出size" size="mini">
                        <el-select v-model="outPut.size" filterable @blur="selectBlur">
                            <el-option v-for=" item in outPut.level" :key="item" :label="item"
                                       :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="el-button-search" @click="outputToEvent('excel')">导出为Excel
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="el-button-search" @click="outputToEvent('db')">导出为DB
                        </el-button>
                    </el-form-item>
                </template>
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
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form size="mini">
                        <div class="grid-content">
                            <!-- sql 提示-->
                            <textarea rows="6" ref="mycode" v-model="sql.content" placeholder="按Ctrl键进行代码提示"
                                      class="codesql" style="height:200px;width:600px;"/>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
            <div style="margin: 15px 0;"></div>
            <hr>
            <el-collapse>
                <el-collapse-item title="常用检索" name="2">
                    <h3>
                        <code>
                        <pre>
                          {{example.demo}}
                        </pre>
                        </code>
                    </h3>
                </el-collapse-item>
                <el-collapse-item title="展示请求JSON" name="1">
                    <code>
                        <pre>{{request}}</pre>
                    </code>
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

                    <template v-if="Search_Result">
                        <template v-for="(info1,index) in Search_Result.hits.hits">
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
                                    <template v-if="role.level == 100">
                                        <span @click="edit(info1._index,info1._type,info1._id,info1._source)">修改</span>
                                        <span class="red"
                                              @click="Index_DocumentController_Delete(info1._index,info1._type,info1._id)">删除</span>
                                    </template>
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
            <el-pagination v-show="Search_Result.compatible_total > 0"
                           background
                           @current-change="handleCurrentChange"
                           :current-page.sync="request.from/request.size+1"
                           :page-size="request.size"
                           layout="total, prev, pager, next, jumper"
                           :total="Search_Result.compatible_total">
            </el-pagination>
        </div>
        <el-dialog
                title="更新"
                :visible.sync="dialog.dialogVisible"
                width="40%"
                :before-close="handleClose">
            <el-input
                    type="textarea"
                    :rows="20"
                    placeholder="请输入json"
                    v-model="dialog.value">
            </el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialog.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleUpdate">确 定</el-button></span>
        </el-dialog>
        <!--下载地址-->
        <el-dialog
                title="下载Url"
                :visible.sync="Excel.dialog.dialogVisible"
                width="40%"
                :before-close="handleClose">
            <template v-for="url in Excel.dialog.urls">
                <br>
                <a :href="url" target="_blank">{{url}}</a>
            </template>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="Excel.dialog.dialogVisible = false">确 定</el-button></span>
        </el-dialog>
    </div>

</template>

<script>

    import {Loading} from "element-ui";

    //sql 提示
    import 'codemirror/theme/ambiance.css'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/addon/hint/show-hint.css'

    let CodeMirror = require('codemirror/lib/codemirror')
    require('codemirror/addon/edit/matchbrackets')
    require('codemirror/addon/selection/active-line')
    require('codemirror/mode/sql/sql')
    require('codemirror/addon/hint/show-hint')
    require('codemirror/addon/hint/sql-hint')
    //sql 提示

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
                Search_Result: {
                    "_shards": {
                        "total": 1,
                        "failed": 0,
                        "successful": 1,
                        "skipped": 0
                    },
                    "hits": {
                        "hits": [
                            {
                                "_index": "-",//tb_object_0088
                                "_type": "",//tb_object_0088
                                "_source": {
                                    "F24_0088": "",//百度地图(116.43138,39.953785);
                                    "F21_0088": "",//总局
                                    "RP_GEN_DATETIME": "",//2020-09-15 17:37:26
                                    "F12_0088": ""//20021219
                                },
                                "_id": "",//4a21d370-3149-4e0c-8f2f-76ef68bde8d1
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
                    _source: [
                        "*"
                    ],
                    from: 0,
                    "query": {
                        "match_all": {
                            "boost": 1
                        }
                    },
                    size: 15,
                    sort: "_score"
                },
                bootstrap_servers: {
                    "home": "192.168.0.105:9092"
                },
                bootstrap: {
                    servers: '192.168.0.105:9092'
                },
                headers: {
                    "ES_HOST": ""
                },
                sources: {
                    checkAll: false,
                    checkedFields: ['样例数据', '样例数据'],//存放筛选的字段
                    fields: ['样例数据', '样例数据'],
                    isIndeterminate: true
                },
                level: ['15', '50', '100', '500', '1000', '2000'],
                outPut: {
                    level: ['10', '500', '5000', '10000', '50000', '100000', '200000', '500000', '1000000', '-1'],
                    size: '1000'
                },

                DSL: {
                    bool: ['must', 'must_not', 'filter', 'should'],
                    type: {
                        'is not null': 'exists',
                        'equal': 'term',
                        'in': 'terms',
                        'regexp': 'regexp',
                        'between': 'range',
                        '前缀': 'prefix',
                        'like': 'wildcard',
                        'id': 'ids',
                        '相似度': 'fuzzy'
                    },
                    example: {
                        real: {
                            exists: {
                                "exists": {
                                    "field": ""
                                }
                            },
                            term: {
                                "term": {
                                    "": {
                                        "boost": "1.0",
                                        "value": ""
                                    }
                                }
                            }
                        },
                        show: {
                            exists: {field: ''},
                            term: {field: '', value: ''},
                            terms: {field: '', value: ['']},
                            range: {field: '', gte: '', lte: ''},
                            regexp: {field: '', value: ''},
                            prefix: {field: '', value: ''},
                            wildcard: {field: '', value: ''},
                            ids: {value: ['']},
                            fuzzy: {field: '', value: ''}
                        }
                    },
                    data: {
                        filter: {
                            exists: [],
                            term: [],
                            terms: [],
                            range: [],
                            regexp: [],
                            prefix: [],
                            wildcard: [],
                            ids: {},
                            fuzzy: []
                        },
                        must: {
                            exists: [],
                            term: [],
                            terms: [],
                            range: [],
                            regexp: [],
                            prefix: [],
                            wildcard: [],
                            ids: {},
                            fuzzy: []
                        },
                        must_not: {
                            exists: [],
                            term: [],
                            terms: [],
                            range: [],
                            regexp: [],
                            prefix: [],
                            wildcard: [],
                            ids: {},
                            fuzzy: []
                        },

                        should: {
                            exists: [],
                            term: [],
                            terms: [],
                            range: [],
                            regexp: [],
                            prefix: [],
                            wildcard: [],
                            ids: {},
                            fuzzy: []
                        }
                    }
                },
                dialog: {
                    dialogVisible: false,
                    value: '',
                    index: '',
                    type: '',
                    id: '',
                },
                Excel: {
                    dialog: {
                        dialogVisible: false,
                        urls: []
                    }
                },
                sql: {
                    content: '',
                    hintOptions: {tables: {}},
                    editor: null
                },
                HelperController_SQLToEsHelper_result: {
                    "index": "TB_OBJECT_0088",
                    "fields": [
                        "*"
                    ],
                    "sort":{},
                    "dslHelper": {}
                },
                role: {
                    roleName: 'visitor',
                    level: 0,
                    outPutLevel: []
                },
                example: {
                    demo: ''
                }
            }
        },
        mounted() {
            let self = this;
            self.sqlInit();
        }
        ,
        created() {
            let self = this;
            const index = this.$route.query && this.$route.query.index;
            self.index = index;
            const header_ES_HOST = this.$route.query && this.$route.query.header_ES_HOST;
            if (null != header_ES_HOST) {
                self.headers.ES_HOST = JSON.parse(header_ES_HOST);
            }
            this.ConfigController_GetDefaultServers();
            self.ConfigController_GetServers();
            if (null != index) {
                self.Search();
            }
            // const role = this.$route.query && this.$route.query.role;//角色
            // self.role.role = role;
            self.ConfigController_GetRoleAdmin();
            self.ConfigController_GetDemoStr();
        }
        ,
        watch: {}
        ,
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
                        //
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
                })

            }
            ,
            Search() {
                var loadingInstance = Loading.service({
                    text: "加载中,请稍后..."
                });
                let self = this;
                self.Index_MappingController_Mapping_Compatible();//获取索引结构
                this.$http.post(self.api.Search + self.index + "/_search", self.request, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST,
                        'content-type': 'application/json'
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Search_Result = response.content;
                        /**
                         * 兼容ES版本问题 存放total的位置变化
                         */
                        console.info("total:" + self.Search_Result.hits.total)
                        if (null != self.Search_Result.hits.total.value) {
                            self.Search_Result.compatible_total = self.Search_Result.hits.total.value;
                        } else if (null != self.Search_Result.hits.total) {
                            self.Search_Result.compatible_total = self.Search_Result.hits.total;
                        }
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
                loadingInstance.close();
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
            }
            ,
            handleCurrentChange(currentChange) {
                let self = this;
                self.request.from = (currentChange - 1) * self.request.size;
                self.Search();
            }
            ,
            searchEvent() {
                //SQL 转换成 ES
                const loadingInstance = Loading.service();
                let self = this;
                const sql = this.sql.editor.getValue();
                self.$http.post(self.api.HelperController_SQLToEsHelper, sql, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST,
                        'content-type': 'application/json'
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.HelperController_SQLToEsHelper_result = response.content;
                        self.index = self.HelperController_SQLToEsHelper_result.index;
                        self.DSL.data = self.HelperController_SQLToEsHelper_result.dslHelper;
                        self.request.sort = self.HelperController_SQLToEsHelper_result.sort;
                        self.request._source = self.HelperController_SQLToEsHelper_result.fields;
                        self.HelperController_DSLHelper();
                        self.sources.checkedFields = self.HelperController_SQLToEsHelper_result.fields;
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
                });
                Loading.close();
            },
            HelperController_DSLHelper() {
                //DSLParse
                let self = this;
                self.$http.post(self.api.HelperController_DSLHelper, self.DSL.data, {}, function (response) {
                    if (response.code == 0) {
                        self.request.query = response.content;
                        self.request.from = 0;//这个比较重要 经常在上面吃亏! 存储不清除
                        self.Search();

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
                });
            }
            ,
            outputToEvent(type) {
                //导出为excel
                let self = this;
                self.$http.post(self.api.HelperController_DSLHelper, self.DSL.data, {}, function (response) {
                    if (response.code == 0) {
                        self.request.query = response.content;
                        if ('excel' == type) {
                            //导出为excel
                            self.outputToExcel();
                        } else if ('db' == type) {
                            //导出为db
                            self.outputToDb();
                        }

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
                });
            }
            ,
            outputToExcel() {
                //导出为excel
                let self = this;
                //这里重写导出的size
                const request = JSON.parse(JSON.stringify(self.request));
                request.size = 1000;
                const loadingInstance = Loading.service();
                self.$http.post(self.api.HelperController_OutputToExcel + self.index, request, {
                    params: {
                        'scroll': '1m',
                        'outPutSize': self.outPut.size
                    },
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Excel.dialog.urls = response.content;
                        self.Excel.dialog.dialogVisible = true;
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
                });
                Loading.close();
            }
            ,
            outputToDb() {
                //导出为excel
                let self = this;
                //这里重写导出的size
                const request = JSON.parse(JSON.stringify(self.request));
                request.size = 1000;
                var loadingInstance = Loading.service();
                self.$http.post(self.api.HelperController_OutputToDb + self.index, request, {
                    params: {
                        'scroll': '1m',
                        'outPutSize': self.outPut.size
                    },
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Excel.dialog.urls = response.content;
                        self.Excel.dialog.dialogVisible = true;
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
                });
                Loading.close();
            }
            ,
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
                            self.Search();//刷新 这里的删除有延迟，立刻刷新会有检索延迟问题
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
            }
            ,
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
                            duration: 1000
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
            }
            ,
            pen(value) {
                this.$alert('<pre>' + value + '</pre>', '预览', {
                    dangerouslyUseHTMLString: true
                });
            }
            ,
            penExcelUrl(values) {
                this.$alert('<pre>' + value + '</pre>', '预览', {
                    dangerouslyUseHTMLString: true
                });
            }
            ,
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

            }
            ,
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
            }
            ,
            handleCheckAllChange(val) {
                this.sources.checkedFields = val ? this.sources.fields : [];
                this.sources.isIndeterminate = false;
            }
            ,
            handlecheckedFieldsChange(value) {
                let checkedCount = value.length;
                this.sources.checkAll = checkedCount === this.sources.fields.length;
                this.sources.isIndeterminate = checkedCount > 0 && checkedCount < this.sources.fields.length;
            }
            ,
            handleUpdate() {
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
            },
            handleClose() {
                let self = this;
                //更新
                this.$confirm('确认关闭?')
                    .then(_ => {
                        self.Excel.dialog.dialogVisible = false;
                    })
                    .catch(_ => {
                        self.Excel.dialog.dialogVisible = true;
                    });
            }
            ,
            DSLAdd(bool, type) {
                //DSL 统一添加
                let self = this;
                const example = JSON.parse(JSON.stringify(self.DSL.example.show[type]));
                if (null == self.DSL.data[bool][type]) {
                    self.DSL.data[bool][type] = [];
                }
                if (type != 'ids') {
                    self.DSL.data[bool][type].push(example);
                } else {
                    if (JSON.stringify(self.DSL.data[bool][type]) == '{}') {
                        self.DSL.data[bool][type] = example;
                    } else {
                        self.DSL.data[bool][type].value.push('');
                    }
                }
            }
            ,
            DSLRemove(bool, type, index) {
                console.info("bool:" + bool + ",type:" + type + ";index:" + index)
                //DSL统一移除
                let self = this;
                if (type != 'ids') {
                    self.DSL.data[bool][type].splice(index, 1);
                } else {
                    self.DSL.data[bool][type].value.splice(index, 1);
                }
            },
            DSLTermsValueAdd(bool, index, valueIndex) {
                //专门添加Terms
                let self = this;
                console.info("index:" + index)
                self.DSL.data[bool]['terms'][index].value.push('');
            },
            DSLTermsValueRemove(bool, index, valueIndex) {
                //专门移除Terms
                let self = this;
                self.DSL.data[bool]['terms'][index].value.splice(valueIndex, 1);
            },
            selectBlur(e) {
                this.value = e.target.value
            },
            sqlInit() {
                let self = this;
                self.sql.hintOptions['tables'][self.index] = self.sources.fields;
                const data = JSON.parse(JSON.stringify(self.sql.hintOptions));
                console.log(data);
                //添加sql编辑
                let mime = 'text/x-mariadb'
                // let theme = 'ambiance'//设置主题，不设置的会使用默认主题
                let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
                    mode: mime, // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
                    indentWithTabs: true,
                    smartIndent: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    // theme: theme,
                    // autofocus: true,
                    // extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
                    hintOptions: {
                        // 自定义提示选项
                        // tables: {
                        //     users: ['1112', '123123', '124124'],
                        //     countries: ['124', '124124', '1']
                        // }

                        data
                    }
                })
                // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
                editor.on('inputRead', function () {
                    editor.showHint()
                });
                self.sql.editor = editor;
            },

            ESToSQL() {
                this.$alert('<pre>' + '暂未支持' + '</pre>', '注意', {
                    dangerouslyUseHTMLString: true
                });
                // //ES 转换成 SQL
                // let self = this;
                // self.$http.post(self.api.HelperController_SQLToEsHelper, self.sql.content, {
                //     headers: {
                //         "ES_HOST": self.headers.ES_HOST,
                //         'content-type': 'application/json'
                //     }
                // }, function (response) {
                //     if (response.code == 0) {
                //         // self.Excel.dialog.urls = response.content;
                //         // self.Excel.dialog.dialogVisible = true;
                //     } else {
                //         self.$message({
                //             type: 'error',
                //             message: response.msg,
                //             duration: 2000
                //         });
                //     }
                // }, function (response) {
                //     //失败回调
                //     self.$message({
                //         type: 'warning',
                //         message: '请求异常',
                //         duration: 1000
                //     });
                // });
            },
            sqlExample() {
                let self = this;
                const example =
                    `SELECT * FROM "tb_object_0088" WHERE
"F1_0088" IS NOT NULL AND "F2_0088" IS NULL
AND "F1_0088" = '1' AND "F1_0088" <> '1'
AND "F1_0088" IN ('1','2') AND "F1_0088" NOT IN ('1','2')
AND "F3_0088" BETWEEN 30 AND 40
AND "F3_0088" >= 30 AND F3_0088 <= 30
AND REGEXP_LIKE("F4_0088",'[\\u4e00-\\u9fa5]+') AND  NOT REGEXP_LIKE("F4_0088",'[0-9]*')
AND "F4_0088" LIKE 'St*'  AND "F4_0088" NOT LIKE 'St*'
                   `;
                self.sql.editor.setValue(example);

            }
            ,
            sqlNotice() {
                const example =
                    `1.只支持示例的语法,其他语法不支持(比如不等于只支持<>,不支持！=,不支持>)
2.表名,字段名称和值都要双引号
3.只支持AND如果要OR请转换成正则/in或者检索多次
4.正则不支持速记语法,请转成常规语法(\\d -> [0-9])
5.通配符使用*`;
                this.$alert('<pre>' + example + '</pre>', '注意', {
                    dangerouslyUseHTMLString: true
                });
            },
            ConfigController_GetDefaultServers() {
                //获取默认的地址
                let self = this;
                self.$http.get(self.api.ConfigController_GetDefaultServers, {}, function (response) {
                        if (response.code == 0) {
                            self.headers.ES_HOST = response.content;
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
            ConfigController_GetRoleAdmin() {
                //获取ip角色
                let self = this;
                self.$http.get(self.api.ConfigController_GetRoleAdmin, {}, function (response) {
                        if (response.code == 0) {
                            self.role = response.content;
                            self.outPut.level = self.role.outPutLevel;
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
            ConfigController_GetDemoStr() {
                //获取demo
                let self = this;
                self.$http.get(self.api.ConfigController_GetDemoStr, {}, function (response) {
                        if (response.code == 0) {
                            self.example.demo = response.content;
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

    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .codesql {
        font-size: 18pt;
        font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
        overflow-x: visible;
        overflow-y: visible;
    }
</style>
