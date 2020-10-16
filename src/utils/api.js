/* 设置后台项目名称 */
const BASE_URL = '/demo_elasticsearch';
export default {


    /** Cluster */
    "Cluster": BASE_URL + '/Cluster/',
    "Cluster_Cat_Health_Format": BASE_URL + '/Cluster/_cat/health/format',
    "Cluster_AliasController_Cat_Aliases": BASE_URL + '/Cluster_AliasController/_cat/aliases',
    "Cluster_IndexController_Cat_Indices": BASE_URL + '/Cluster_IndexController/_cat/indices',
    "Cluster_LicenseController_License": BASE_URL + '/Cluster_LicenseController/_license',
    "Cluster_NodeController_Cat_Nodes": BASE_URL + '/Cluster_NodeController/_cat/nodes',
    "Cluster_SegmentController_Cat_Segments": BASE_URL + '/Cluster_SegmentController/_cat/segments',
    "Cluster_PluginController_Cat_Plugins": BASE_URL + '/Cluster_PluginController/_cat/plugins',

    "Cluster_ShardController_Cat_Shards": BASE_URL + '/Cluster_ShardController/_cat/shards',

    /** Index */
    "Index_Cat_Count": BASE_URL + '/Index/_cat/count/',
    "Index_Cat_Indices": BASE_URL + '/Index/_cat/indices/',
    "Index_MappingController_Mapping_Compatible": BASE_URL + '/Index_MappingController/', //Index_MappingController/tb_object_0088/_mapping/compatible
    "Index_OpenCloseController_Close": BASE_URL + '/Index_OpenCloseController/', //Index_OpenCloseController/tb_object_0088/_close
    "Index_OpenCloseController_Open": BASE_URL + '/Index_OpenCloseController/', //Index_OpenCloseController/tb_object_0088/_open
    "Index_FreshFlushController_Refresh": BASE_URL + '/Index_FreshFlushController/', //Index_OpenCloseController/tb_object_0088/_refresh
    "Index_FreshFlushController_Flush": BASE_URL + '/Index_FreshFlushController/', //Index_OpenCloseController/tb_object_0088/_flush
    "Index_ShardController_Cat_Shards": BASE_URL + '/Index_ShardController/_cat/shards/', //Index_ShardController/_cat/shards/index_bulk?h=*&format=JSON
    "Index_SegmentController_Cat_Segments": BASE_URL + '/Index_SegmentController/_cat/segments/', //Index_SegmentController/cat/segments/test2?v=true&format=JSON
    "Index_SettingController_Settings": BASE_URL + '/Index_SettingController/', //Index_SettingController/test2/_settings
    "Index_FreezeUnFreezeController_Freeze": BASE_URL + '/Index_FreezeUnFreezeController/', //Index_FreezeUnFreezeController/test2/_freeze
    "Index_FreezeUnFreezeController_Unfreeze": BASE_URL + '/Index_FreezeUnFreezeController/', //Index_FreezeUnFreezeController/test2/_unfreeze
    "Index_RecoveryController_Cat_Recovery": BASE_URL + '/Index_RecoveryController/_cat/recovery/', //Index_RecoveryController/_cat/recovery/index_bulk?v=true&format=JSON
    "Index_DocumentController_Delete": BASE_URL + '/Index_DocumentController/', //Index_DocumentController/<index>/<type>/<id> 文档删除
    "Index_DocumentController_GET": BASE_URL + '/Index_DocumentController/', //Index_DocumentController/<index>/<type>/<id> 文档获取

    /** Search */
    "Search_DSL_MatchAllController_Search": BASE_URL + '/Search_DSL_MatchAllController/',//Search_DSL_MatchAllController/tb_object_0088/_search

    /** redis **/
    "RedisController_GetRecordByScrollId": BASE_URL + '/RedisController/getRecordByScrollId',//RedisController/getRecordByScrollId

    /** 获取服务地址 **/
    "ConfigController_GetServers": BASE_URL + '/ConfigController/getServers',

    /** 资源管理 */

    "addResourceFile": BASE_URL + '/ResourceController/addFile',
    "existResourceFileByName": BASE_URL + '/ResourceController/existFileByName',
    "deleteResourceFileByName": BASE_URL + '/ResourceController/deleteFileByName',
    "getResourceFiles": BASE_URL + '/ResourceController/getFiles',
    "getResourceFileDetails": BASE_URL + '/ResourceController/getFileDetails',
    "getResourceFileDetailByFileName": BASE_URL + '/ResourceController/getFileDetailByFileName',
    "downloadByResourceFileName": BASE_URL + '/ResourceController/downloadByFileName',
    "preByResourceFileName": BASE_URL + '/ResourceController/preByFileName',


}
