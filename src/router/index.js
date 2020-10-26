import Vue from 'vue'
import Router from 'vue-router'


/**
 * 管理边栏的地方
 */
Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
//登陆界面
const Login = r => require.ensure([], () => r(require('@/views/login/index')), 'login')

/** Cluster相关 **/
const ClusterManager_Cluster = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster')), 'ClusterManager_Cluster');
const ClusterManager_Cluster_Alias = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Alias')), 'ClusterManager_Cluster_Alias');
const ClusterManager_Cluster_Index = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Index')), 'ClusterManager_Cluster_Index');
const ClusterManager_Cluster_License = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_License')), 'ClusterManager_Cluster_License');
const ClusterManager_Cluster_Node = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Node')), 'ClusterManager_Cluster_Node');
const ClusterManager_Cluster_Plugin = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Plugin')), 'ClusterManager_Cluster_Plugin');
const ClusterManager_Cluster_Repository = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Repository')), 'ClusterManager_Cluster_Repository');
const ClusterManager_Cluster_Segment = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Segment')), 'ClusterManager_Cluster_Segment');
const ClusterManager_Cluster_Shard = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Shard')), 'ClusterManager_Cluster_Shard');
const ClusterManager_Cluster_Snapshot = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Snapshot')), 'ClusterManager_Cluster_Snapshot');
const ClusterManager_Cluster_Task = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Task')), 'ClusterManager_Cluster_Task');
const ClusterManager_Cluster_Template = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_Template')), 'ClusterManager_Cluster_Template');
const ClusterManager_Cluster_XPack = r => require.ensure([], () => r(require('@/views/ClusterManager/Cluster_XPack')), 'ClusterManager_Cluster_XPack');

/** Node相关 */
const NodeManager_Node = r => require.ensure([], () => r(require('@/views/NodeManager/Node')), 'NodeManager_Node');

/** Index相关**/
const IndexManager_Index = r => require.ensure([], () => r(require('@/views/IndexManager/Index')), 'IndexManager_Index');
const IndexManager_Index_Alias = r => require.ensure([], () => r(require('@/views/IndexManager/Index_Alias')), 'IndexManager_Index_Alias');
const IndexManager_Index_CRUD = r => require.ensure([], () => r(require('@/views/IndexManager/Index_CRUD')), 'IndexManager_Index_CRUD');
const IndexManager_Index_Document = r => require.ensure([], () => r(require('@/views/IndexManager/Index_Document')), 'IndexManager_Index_Document');
const IndexManager_Index_FreezeUnFreeze = r => require.ensure([], () => r(require('@/views/IndexManager/Index_FreezeUnFreeze')), 'IndexManager_Index_FreezeUnFreeze');
const IndexManager_Index_FreshFlush = r => require.ensure([], () => r(require('@/views/IndexManager/Index_FreshFlush')), 'IndexManager_Index_FreshFlush');
const IndexManager_Index_Mapping = r => require.ensure([], () => r(require('@/views/IndexManager/Index_Mapping')), 'IndexManager_Index_Mapping');
const IndexManager_Index_NewIndex = r => require.ensure([], () => r(require('@/views/IndexManager/Index_NewIndex')), 'IndexManager_Index_NewIndex');
const IndexManager_Index_OpenClose = r => require.ensure([], () => r(require('@/views/IndexManager/Index_OpenClose')), 'IndexManager_Index_OpenClose');
const IndexManager_Index_Recovery = r => require.ensure([], () => r(require('@/views/IndexManager/Index_Recovery')), 'IndexManager_Index_Recovery');
const IndexManager_Index_Segment = r => require.ensure([], () => r(require('@/views/IndexManager/Index_Segment')), 'IndexManager_Index_Segment');
const IndexManager_Index_Setting = r => require.ensure([], () => r(require('@/views/IndexManager/Index_Setting')), 'IndexManager_Index_Setting');
const IndexManager_Index_Shard = r => require.ensure([], () => r(require('@/views/IndexManager/Index_Shard')), 'IndexManager_Index_Shard');


/** Search相关**/
const SearchManager_Search = r => require.ensure([], () => r(require('@/views/SearchManager/Search')), 'SearchManager_Search');
const SearchManager_Search_Analyze = r => require.ensure([], () => r(require('@/views/SearchManager/Search_Analyze')), 'SearchManager_Search_Analyze');
const SearchManager_Search_Count = r => require.ensure([], () => r(require('@/views/SearchManager/Search_Count')), 'SearchManager_Search_Count');
const SearchManager_Search_DSL_Compound = r => require.ensure([], () => r(require('@/views/SearchManager/Search_DSL_Compound')), 'SearchManager_Search_DSL_Compound');
const SearchManager_Search_DSL_FullText = r => require.ensure([], () => r(require('@/views/SearchManager/Search_DSL_FullText')), 'SearchManager_Search_DSL_FullText');
const SearchManager_Search_DSL_MatchAll = r => require.ensure([], () => r(require('@/views/SearchManager/Search_DSL_MatchAll')), 'SearchManager_Search_DSL_MatchAll');
const SearchManager_Search_DSL_TermLevel = r => require.ensure([], () => r(require('@/views/SearchManager/Search_DSL_TermLevel')), 'SearchManager_Search_DSL_TermLevel');
const SearchManager_Search_ExplainValidate = r => require.ensure([], () => r(require('@/views/SearchManager/Search_ExplainValidate')), 'SearchManager_Search_ExplainValidate');
const SearchManager_Search_Lucene = r => require.ensure([], () => r(require('@/views/SearchManager/Search_Lucene_')), 'SearchManager_Search_Lucene');
const SearchManager_Search_Lucene_Example = r => require.ensure([], () => r(require('@/views/SearchManager/Search_Lucene_Example')), 'SearchManager_Search_Lucene_Example');
const SearchManager_Search_Script = r => require.ensure([], () => r(require('@/views/SearchManager/Search_Script')), 'SearchManager_Search_Script');
const SearchManager_Search_Scroll = r => require.ensure([], () => r(require('@/views/SearchManager/Search_Scroll')), 'SearchManager_Search_Scroll');
const SearchManager_Search_Shard = r => require.ensure([], () => r(require('@/views/SearchManager/Search_Shard')), 'SearchManager_Search_Shard');
const SearchManager_Search_SQL = r => require.ensure([], () => r(require('@/views/SearchManager/Search_SQL')), 'SearchManager_Search_SQL');


const ResourceManagerList = r => require.ensure([], () => r(require('@/views/ResourceManager/List')), 'ResourceManagerList')
const ResourceManagerAdd = r => require.ensure([], () => r(require('@/views/ResourceManager/Add')), 'ResourceManagerAdd')
const ResourceManagerView = r => require.ensure([], () => r(require('@/views/ResourceManager/View')), 'ResourceManagerView')


export const constantRouterMap = [
    {
        path: '',
        component: Layout,
        redirect: '/ClusterManager_Cluster',
        name: 'ClusterManager_Cluster',
        meta: {
            title: 'Cluster管理'
        },
        noDropdown: true,
        children: [
            {
                path: 'ClusterManager_Cluster',
                component: ClusterManager_Cluster,
                name: 'ClusterManager_Cluster',
                meta: {
                    title: 'Cluster - 信息'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Alias',
                component: ClusterManager_Cluster_Alias,
                name: 'ClusterManager_Cluster_Alias',
                meta: {
                    title: 'Cluster - 别名'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Index',
                component: ClusterManager_Cluster_Index,
                name: 'ClusterManager_Cluster_Index',
                meta: {
                    title: 'Cluster - 索引'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_License',
                component: ClusterManager_Cluster_License,
                name: 'ClusterManager_Cluster_License',
                meta: {
                    title: 'Cluster - 证书'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Node',
                component: ClusterManager_Cluster_Node,
                name: 'ClusterManager_Cluster_Node',
                meta: {
                    title: 'Cluster - 节点'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Plugin',
                component: ClusterManager_Cluster_Plugin,
                name: 'ClusterManager_Cluster_Plugin',
                meta: {
                    title: 'Cluster - 插件'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Repository',
                component: ClusterManager_Cluster_Repository,
                name: 'ClusterManager_Cluster_Repository',
                meta: {
                    title: 'Cluster - 仓库'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Segment',
                component: ClusterManager_Cluster_Segment,
                name: 'ClusterManager_Cluster_Segment',
                meta: {
                    title: 'Cluster - 段'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Shard',
                component: ClusterManager_Cluster_Shard,
                name: 'ClusterManager_Cluster_Shard',
                meta: {
                    title: 'Cluster - 分片'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Snapshot',
                component: ClusterManager_Cluster_Snapshot,
                name: 'ClusterManager_Cluster_Snapshot',
                meta: {
                    title: 'Cluster - 快照'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Task',
                component: ClusterManager_Cluster_Task,
                name: 'ClusterManager_Cluster_Task',
                meta: {
                    title: 'Cluster - 任务'
                },
                hidden: false
            },
            {
                path: 'ClusterManager_Cluster_Template',
                component: ClusterManager_Cluster_Template,
                name: 'ClusterManager_Cluster_Template',
                meta: {
                    title: 'Cluster - 模板'
                },
                hidden: false
            }, {
                path: 'ClusterManager_Cluster_Task',
                component: ClusterManager_Cluster_Task,
                name: 'ClusterManager_Cluster_Task',
                meta: {
                    title: 'Cluster - 铂金'
                },
                hidden: false
            }
        ]
    },
    {
        path: '',
        component: Layout,
        redirect: '/NodeManager_Node',
        name: 'NodeManager_Node',
        meta: {
            title: 'Node管理'
        },
        noDropdown: true,
        children: [

            {
                path: 'NodeManager_Node',
                component: NodeManager_Node,
                name: 'NodeManager_Node',
                meta: {
                    title: 'Node信息'
                },
                hidden: false
            }
        ]
    },
    {
        path: '',
        component: Layout,
        redirect: '/IndexManager_Index',
        name: 'IndexManager_Index',
        meta: {
            title: 'Index管理'
        },
        noDropdown: true,
        children: [
            {
                path: 'IndexManager_Index',
                component: IndexManager_Index,
                name: 'IndexManager_Index',
                meta: {
                    title: 'Index - 信息'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_Alias',
                component: IndexManager_Index_Alias,
                name: 'IndexManager_Index_Alias',
                meta: {
                    title: 'Index - 别名'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_CRUD',
                component: IndexManager_Index_CRUD,
                name: 'IndexManager_Index_CRUD',
                meta: {
                    title: 'Index - CRUD'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_Document',
                component: IndexManager_Index_Document,
                name: 'IndexManager_Index_Document',
                meta: {
                    title: 'Index - 文档'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_Mapping',
                component: IndexManager_Index_Mapping,
                name: 'IndexManager_Index_Mapping',
                meta: {
                    title: 'Index - 映射'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_NewIndex',
                component: IndexManager_Index_NewIndex,
                name: 'IndexManager_Index_NewIndex',
                meta: {
                    title: 'Index - 新索引'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_Recovery',
                component: IndexManager_Index_Recovery,
                name: 'IndexManager_Index_Recovery',
                meta: {
                    title: 'Index - 恢复'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_Segment',
                component: IndexManager_Index_Segment,
                name: 'IndexManager_Index_Segment',
                meta: {
                    title: 'Index - 段'
                },
                hidden: false
            }
            ,
            {
                path: 'IndexManager_Index_Setting',
                component: IndexManager_Index_Setting,
                name: 'IndexManager_Index_Setting',
                meta: {
                    title: 'Index - 设置'
                },
                hidden: false
            },
            {
                path: 'IndexManager_Index_Shard',
                component: IndexManager_Index_Shard,
                name: 'IndexManager_Index_Shard',
                meta: {
                    title: 'Index - 分片'
                },
                hidden: false
            }

        ]
    },
    {
        path: '',
        component: Layout,
        redirect: '/SearchManager_Search',
        name: 'SearchManager_Search',
        meta: {
            title: 'Search管理'
        },
        noDropdown: true,
        children: [
            {
                path: 'SearchManager_Search',
                component: SearchManager_Search,
                name: 'SearchManager_Search',
                meta: {
                    title: 'Search'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_Analyze',
                component: SearchManager_Search_Analyze,
                name: 'SearchManager_Search_Analyze',
                meta: {
                    title: 'Search - 分词检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_Count',
                component: SearchManager_Search_Count,
                name: 'SearchManager_Search_Count',
                meta: {
                    title: 'Search - 数量检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_DSL_Compound',
                component: SearchManager_Search_DSL_Compound,
                name: 'SearchManager_Search_DSL_Compound',
                meta: {
                    title: 'Search - DSL组合检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_DSL_FullText',
                component: SearchManager_Search_DSL_FullText,
                name: 'SearchManager_Search_DSL_FullText',
                meta: {
                    title: 'Search - 全文检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_DSL_MatchAll',
                component: SearchManager_Search_DSL_MatchAll,
                name: 'SearchManager_Search_DSL_MatchAll',
                meta: {
                    title: 'Search - DSL匹配全部'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_DSL_TermLevel',
                component: SearchManager_Search_DSL_TermLevel,
                name: 'SearchManager_Search_DSL_TermLevel',
                meta: {
                    title: 'Search - DSL术语检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_ExplainValidate',
                component: SearchManager_Search_ExplainValidate,
                name: 'SearchManager_Search_ExplainValidate',
                meta: {
                    title: 'Search - 解释/验证'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_Lucene',
                component: SearchManager_Search_Lucene,
                name: 'SearchManager_Search_Lucene',
                meta: {
                    title: 'Search - Lucene检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_Lucene_Example',
                component: SearchManager_Search_Lucene_Example,
                name: 'SearchManager_Search_Lucene_Example',
                meta: {
                    title: 'Search - Lucene检索样例'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_Script',
                component: SearchManager_Search_Script,
                name: 'SearchManager_Search_Script',
                meta: {
                    title: 'Search - 脚本检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_Scroll',
                component: SearchManager_Search_Scroll,
                name: 'SearchManager_Search_Scroll',
                meta: {
                    title: 'Search - 滚动检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_Shard',
                component: SearchManager_Search_Shard,
                name: 'SearchManager_Search_Shard',
                meta: {
                    title: 'Search - 分片检索'
                },
                hidden: false
            },
            {
                path: 'SearchManager_Search_SQL',
                component: SearchManager_Search_SQL,
                name: 'SearchManager_Search_SQL',
                meta: {
                    title: 'Search - SQL检索'
                },
                hidden: false
            }
        ]
    },
    {
        path: '',
        component: Layout,
        redirect: '/ResourceManagerList',
        name: 'resourceManager',
        meta: {
            title: '资源管理'
        },
        noDropdown: true,
        hidden: false,
        children: [
            {
                path: 'ResourceManagerList',
                component: ResourceManagerList,
                name: 'ResourceManagerList',
                meta: {
                    title: '资源列表'
                },
                hidden: false
            }, {
                path: 'ResourceManagerAdd',
                component: ResourceManagerAdd,
                name: 'ResourceManagerAdd',
                meta: {
                    title: '资源添加'
                },
                hidden: false
            },
            {
                path: 'ResourceManagerView',
                component: ResourceManagerView,
                name: 'ResourceManagerView',
                meta: {
                    title: '资源查看'
                },
                hidden: true
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        hidden: true
    }
]
export const routerMap = {
    "9901": {
        path: 'test/test',
        component: Login,
        name: 'UserMgt',
        meta: {
            title: '用户管理'
        }
    }
}
export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})
