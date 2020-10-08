/* 设置后台项目名称 */
const BASE_URL = '/demo_elasticsearch';
export default {


    /** Cluster */
    "Cluster": BASE_URL + '/Cluster/',
    "Cluster_Cat_Health_Format": BASE_URL + '/Cluster/_cat/health/format',
    "Cluster_AliasController_Cat_Aliases_Format": BASE_URL + '/Cluster_AliasController/_cat/aliases/format',
    "Cluster_IndexController_Cat_Indices_Format": BASE_URL + '/Cluster_IndexController/_cat/indices/format',
    "Cluster_LicenseController_License": BASE_URL + '/Cluster_LicenseController/_license',
    "Cluster_NodeController_Cat_Nodes_Format": BASE_URL + '/Cluster_NodeController/_cat/nodes/format',
    "Cluster_SegmentController_Cat_Segments_Format": BASE_URL + '/Cluster_SegmentController/_cat/segments/format',
    "Cluster_ShardController_Cat_Shards_Format": BASE_URL + '/Cluster_ShardController/_cat/shards/format',


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