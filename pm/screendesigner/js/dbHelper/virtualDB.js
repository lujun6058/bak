define([], function() {

    var dbs = [];
    dbs.push({
        serverName: '新装量预览服务',
        xAxis: [
            {
                id: 'field_1',
                name: 'area',
                data: [
                    '南京',
                    '无锡',
                    '徐州',
                    '常州',
                    '苏州',
                    '南通',
                    '淮安',
                    '盐城',
                    '扬州',
                    '镇江',
                    '泰州',
                    '宿迁',
                    '连云港'
                ]
            }
        ],
        yAxis: [
            {
                id: 'field_2',
                name: '3G'
            }, {
                id: 'field_3',
                name: '4G'
            }, {
                id: 'field_4',
                name: '2G'
            }
        ]
    })

    dbs.push({
        serverName: '停复机预览服务',
        xAxis: [
            {
                id: 'field_1',
                name: 'area',
                data: [
                    '南京',
                    '无锡',
                    '徐州',
                    '常州',
                    '苏州',
                    '南通',
                    '淮安',
                    '盐城',
                    '扬州',
                    '镇江',
                    '泰州',
                    '宿迁',
                    '连云港'
                ]
            }
        ],
        yAxis: [
            {
                id: 'field_2',
                name: 'running'
            }, {
                id: 'field_3',
                name: 'stoping'
            }
        ]
    })

    dbs.push({
        serverName: '峻工量预览服务',
        xAxis: [
            {
                id: 'field_1',
                name: 'area',
                data: [
                    '南京',
                    '无锡',
                    '徐州',
                    '常州',
                    '苏州',
                    '南通',
                    '淮安',
                    '盐城',
                    '扬州',
                    '镇江',
                    '泰州',
                    '宿迁',
                    '连云港'
                ]
            }
        ],
        yAxis: [
            {
                id: 'field_2',
                name: 'C_NET'
            }, {
                id: 'field_3',
                name: 'B_NET'
            }
        ]
    })

    dbs.push({
        serverName: '码号销售预览服务',
        xAxis: [
            {
                id: 'field_1',
                name: 'month',
                data: [
                    '1月',
                    '2月',
                    '3月',
                    '4月',
                    '5月',
                    '6月'
                ]
            }
        ],
        yAxis: [
            {
                id: 'field_2',
                name: '3G'
            }, {
                id: 'field_3',
                name: '4G'
            }
        ]
    })

    dbs.push({
        serverName: '指标完成率预览服务',
        xAxis: [
            {
                id: 'field_1',
                name: 'month',
                data:[
                    '长沙',
                    '株洲',
                    '湘潭',
                    '衡阳',
                    '邵阳',
                    '岳阳',
                    '常德',
                    '张家界',
                    '益阳',
                    '娄底',
                    '郴州',
                    '永州',
                    '怀化',
                    '湘西'
                ]
            }
        ],
        yAxis: [
            {
                id: 'field_2',
                name: 'VLR'
            }, {
                id: 'field_3',
                name: 'WLAN'
            }
        ]
    })

    dbs.push({
        serverName: '投诉数预览服务',
        xAxis: [],
        yAxis: [
            {
                id: 'field_2',
                name: 'network',
                data:[
                    77,
                    29,
                    70,
                    34,
                    84,
                    40,
                    13,
                    39,
                    58,
                    79,
                    61,
                    50
                   ]
            }, {
                id: 'field_3',
                name: '3G',
                data:[
                    177,
                    129,
                    170,
                    134,
                    184,
                    140,
                    113,
                    139,
                    158,
                    179,
                    161,
                    150
                ]
            }, {
                id: 'field_4',
                name: '4G',
                data:[
                    177,
                    129,
                    170,
                    134,
                    184,
                    140,
                    113,
                    139,
                    158,
                    179,
                    161,
                    150
                ]
            }
        ]
    })

    return fish.indexBy(dbs, 'serverName')

});
