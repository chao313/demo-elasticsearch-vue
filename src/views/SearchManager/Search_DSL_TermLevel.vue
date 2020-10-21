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
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="outputToExcelEvent()">导出为Excel
                    </el-button>
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
            <template v-for="(boolType,index) in DSL.bool">
                <el-form :inline="true" size="mini" :label-position="left">
                    <el-collapse>
                        <el-collapse-item :title="'字段值筛选'+boolType" name="1">
                            <!-- filter-->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'exists')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="exists">
                            </el-form-item>
                            <br>
                            <template v-for="(existsObj,index) in DSL.data[boolType].exists">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].exists[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'exists',index)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- term -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'term')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="term">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].term">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].term[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].term[index].value"
                                              placeholder="vlaue"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'term',index,)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- terms -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'terms')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="terms">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].terms">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].terms[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <template v-for="(obj,valueIndex) in DSL.data[boolType].terms[index].value">
                                    <el-form-item>
                                        <el-input v-model="DSL.data[boolType].terms[index].value[valueIndex]"
                                                  placeholder="vlaue"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" class="el-button-search"
                                                   @click="DSLTermsValueAdd(boolType,index,valueIndex)">+
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" class="el-button-search"
                                                   @click="DSLTermsValueRemove(boolType,index,valueIndex)">-
                                        </el-button>
                                    </el-form-item>
                                </template>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'terms',index)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- range -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'range')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="range">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].range">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].range[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].range[index].gte" placeholder="大于"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].range[index].lte" placeholder="小于"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'range',index)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- regexp -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'regexp')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="regexp">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].regexp">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].regexp[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].regexp[index].value"
                                              placeholder="vlaue"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'regexp',index)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- prefix -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'prefix')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="prefix">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].prefix">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].prefix[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].prefix[index].value"
                                              placeholder="vlaue"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'prefix',index)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- wildcard -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'wildcard')">
                                    +
                                </el-button>
                            </el-form-item>
                            <el-form-item label="wildcard">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].wildcard">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].wildcard[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].wildcard[index].value"
                                              placeholder="vlaue"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,index,'wildcard')">
                                        -
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- ids -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'ids')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="ids">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].ids.value">
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].ids.value[index]"
                                              placeholder="vlaue"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'ids',index)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                            <!--      ------------------------------------------------- -->
                            <!-- fuzzy -->
                            <el-form-item>
                                <el-button type="primary" class="el-button-search" @click="DSLAdd(boolType,'fuzzy')">+
                                </el-button>
                            </el-form-item>
                            <el-form-item label="fuzzy">
                            </el-form-item>
                            <br>
                            <template v-for="(obj,index) in DSL.data[boolType].fuzzy">
                                <el-form-item>
                                    <el-select v-model="DSL.data[boolType].fuzzy[index].field"
                                               placeholder="请选择字段:">
                                        <el-option v-for="field in sources.fields" :key="field" :label="field"
                                                   :value="field">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="DSL.data[boolType].fuzzy[index].value"
                                              placeholder="vlaue"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="el-button-search"
                                               @click="DSLRemove(boolType,'fuzzy',index)">-
                                    </el-button>
                                </el-form-item>
                                <br>
                            </template>
                        </el-collapse-item>
                    </el-collapse>
                </el-form>
            </template>
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
        <!--下载地址-->
        <el-dialog
                title="下载Url"
                :visible.sync="Excel.dialog.dialogVisible"
                width="40%">
            <template v-for="url in Excel.dialog.urls">
                <a :href="url" target="_blank">{{url}}</a>
            </template>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="Excel.dialog.dialogVisible = false">确 定</el-button></span>
        </el-dialog>
    </div>

</template>

<script>

    import {Loading} from "element-ui";

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
                    sort: "_score"
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
                DSL: {
                    bool: ['filter', 'must_not', 'should', 'must'],
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
                }
            }
        },
        mounted() {
            let self = this;
        }
        ,
        created() {
            let self = this;
            const index = this.$route.query && this.$route.query.index;
            self.index = index;
            const header_ES_HOST = this.$route.query && this.$route.query.header_ES_HOST;
            self.headers.ES_HOST = JSON.parse(header_ES_HOST);
            self.ConfigController_GetServers();
            self.Index_MappingController_Mapping_Compatible();
            self.Search();

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
            Search() {
                let self = this;
                //self.request._source = self.sources.checkedFields;//这个很重要 需要考虑是否启用
                self.$http.post(self.api.Search + "/" + self.index + "/_search", self.request, {
                    headers: {
                        "ES_HOST": self.headers.ES_HOST
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
            }
            ,
            handleCurrentChange(currentChange) {
                let self = this;
                self.request.from = (currentChange - 1) * self.request.size;
                self.Search();
            }
            ,

            routerToConsumerManagerList(bootstrap_servers) {
                let queryStr = "";
                queryStr = queryStr + "bootstrap_servers=" + bootstrap_servers + "";
                window.open("#/ConsumerManagerList" + "?" + queryStr, '_self');
            }
            ,
            searchEvent() {
                //DSLParse
                let self = this;
                self.$http.post(self.api.HelperController_DSLHelper, self.DSL.data, {}, function (response) {
                    if (response.code == 0) {
                        self.request.query = response.content;
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
            outputToExcelEvent() {
                //导出为excel
                let self = this;
                self.$http.post(self.api.HelperController_DSLHelper, self.DSL.data, {}, function (response) {
                    if (response.code == 0) {
                        self.request.query = response.content;
                        self.outputToExcel();

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
                var loadingInstance = Loading.service();
                self.$http.post(self.api.HelperController_OutputToExcel + self.index, self.request, {
                    params: {
                        'scroll': '1m'
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
            ,
            DSLAdd(bool, type) {
                //DSL 统一添加
                let self = this;
                const example = JSON.parse(JSON.stringify(self.DSL.example.show[type]))
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
