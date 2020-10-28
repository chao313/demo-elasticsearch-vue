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
                <el-form-item>
                    <el-button type="primary" class="el-button-search" @click="searchEvent()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="app-list">
            <div class="app-tab">
                <h5 class="form-tit">索引基础信息({{index}})</h5>
                <table>
                    <thead>
                    <tr>
                        <th>index</th>
                        <th>size</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>索引名称</th>
                        <th>文档数量</th>
                    </tr>

                    <tbody>
                    <tr>
                        <template v-if="Index_Cat_Count_Result">
                            <!--显示的字段 - 具体数据-->
                            <td>{{index}}</td>
                            <td>{{Index_Cat_Count_Result[0].count}}</td>
                        </template>
                    </tr>
                    </tbody>
                </table>
                <hr>
                <h5 class="form-tit">索引基础信息({{index}})</h5>
                <table>
                    <thead>
                    <tr>
                        <th>index</th>
                        <th>health</th>
                        <th>docs.count</th>
                        <th>store.size</th>
                        <th>pri</th>
                        <th>rep</th>
                        <th>docs.deleted</th>
                        <th>pri.store.size</th>
                        <th>status</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>索引名称</th>
                        <th>索引健康</th>
                        <th>索引文档数量</th>
                        <th>索引存储size</th>
                        <th>索引主分片数量</th>
                        <th>索引复制分片数量</th>
                        <th>索引删除文档数量</th>
                        <th>索引主分片存储size</th>
                        <th>索引状态</th>
                    </tr>
                    <tbody>
                    <tr>
                        <template v-if="Index_Cat_Indices_Result">
                            <td>{{Index_Cat_Indices_Result[0].index}}</td>
                            <td>{{Index_Cat_Indices_Result[0].health}}</td>
                            <td>{{Index_Cat_Indices_Result[0]['docs.count']}}</td>
                            <td>{{Index_Cat_Indices_Result[0]['store.size']}}</td>
                            <td>{{Index_Cat_Indices_Result[0].pri}}</td>
                            <td>{{Index_Cat_Indices_Result[0].rep}}</td>
                            <td>{{Index_Cat_Indices_Result[0]['docs.deleted']}}</td>
                            <td>{{Index_Cat_Indices_Result[0]['pri.store.size']}}</td>
                            <td>{{Index_Cat_Indices_Result[0].status}}</td>
                        </template>
                    </tr>
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
                Index_Cat_Count_Result:
                    [
                        {
                            "epoch": "-",//1602427776
                            "timestamp": "-",//14:49:36
                            "count": "-"//样例数据
                        }
                    ],
                Index_Cat_Indices_Result: [
                    {
                        "health": "-",//yellow 索引健康
                        "status": "-",//open索引状态
                        "index": "-",//tb_object_0088索引名称
                        "uuid": "-",//S5Z-UZk1Tc-wZA1A-ONCtg索引UUID
                        "pri": "-",//1索引主分片数量
                        "rep": "-",//1索引复制分片数量
                        "docs.count": "-",//30索引文档数量
                        "docs.deleted": "-",//0索引删除文档数量
                        "store.size": "-",//134.2kb索引存储size
                        "pri.store.size": "-"//134.2kb主分片存储size
                    }
                ],
                bootstrap: {
                    servers: ''//192.168.0.105:9092
                },
                bootstrap_servers: {
                    "home": ""//192.168.0.105:9092
                },
                headers: {//存放分页信息
                    ES_HOST: ""
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
            self.ConfigController_GetServers();
            self.ConfigController_GetDefaultServers();

        },
        watch: {},
        methods: {
            Index_Cat_Count() {
                let self = this;
                self.$http.get(self.api.Index_Cat_Count + "/" + self.index, {
                    params: {
                        'format': 'JSON'
                    },
                    headers: {
                        "ES_HOST": self.headers.ES_HOST,
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Index_Cat_Count_Result = response.content;
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

            },
            Index_Cat_Indices() {
                let self = this;
                self.$http.get(self.api.Index_Cat_Indices + "/" + self.index, {
                    params: {
                        'format': 'JSON'
                    }
                }, function (response) {
                    if (response.code == 0) {
                        self.Index_Cat_Indices_Result = response.content;
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
            },
            ConfigController_GetDefaultServers() {
                //获取默认的地址
                let self = this;
                self.$http.get(self.api.ConfigController_GetDefaultServers, {}, function (response) {
                        if (response.code == 0) {
                            self.headers.ES_HOST = response.content;
                            self.Index_Cat_Count();
                            self.Index_Cat_Indices();
                        } else {
                            // self.$message({
                            //     type: 'error',
                            //     message: response.msg,
                            //     duration: 2000
                            // });
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
