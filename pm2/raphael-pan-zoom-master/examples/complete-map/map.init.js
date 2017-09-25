

jQuery(function ($) {
    var inDetails = false;
    var container = $("#map");
    var w =600;
    var h =400;
    var paper = Raphael('map', w, h);
    var panZoom = paper.panzoom({ initialZoom: 1, initialPosition: { x: 120, y: 70} });
	  var isHandling = false;

    panZoom.enable();
    paper.safari();


    Raphael.fn.connection = function (obj1, obj2, line, bg) {
        if (obj1.line && obj1.from && obj1.to) {
            line = obj1;
            obj1 = line.from;
            obj2 = line.to;
        }
        var bb1 = obj1.getBBox(),
            bb2 = obj2.getBBox(),
            p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
            {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
            {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
            {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
            {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
            {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
            {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
            {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
            d = {}, dis = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 4; j < 8; j++) {
                var dx = Math.abs(p[i].x - p[j].x),
                    dy = Math.abs(p[i].y - p[j].y);
                if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                    dis.push(dx + dy);
                    d[dis[dis.length - 1]] = [i, j];
                }
            }
        }
        if (dis.length == 0) {
            var res = [0, 4];
        } else {
            res = d[Math.min.apply(Math, dis)];
        }
        var x1 = p[res[0]].x,
            y1 = p[res[0]].y,
            x4 = p[res[1]].x,
            y4 = p[res[1]].y;
        dx = Math.max(Math.abs(x1 - x4) / 2, 10);
        dy = Math.max(Math.abs(y1 - y4) / 2, 10);
        var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
            y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
            x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
            y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
        var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
        if (line && line.line) {
            line.bg && line.bg.attr({path: path});
            line.line.attr({path: path}).toBack();
        } else {
            var color = typeof line == "string" ? line : "#000";
            return {
                bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
                line: this.path(path).attr({stroke: color, fill: "none"}),
                from: obj1,
                to: obj2
            };
        }
    };

    var treeJson = {
    "name": "flare",
    "children": [{
        "name": "analytics",
        "children": [{
            "name": "cluster",
            "children": [{
                "name": "AgglomerativeCluster",
                "size": 3938
            }, {
                "name": "CommunityStructure",
                "size": 3812
            }, {
                "name": "HierarchicalCluster",
                "size": 6714
            }, {
                "name": "MergeEdge",
                "size": 743
            }]
        },
        {
            "name": "cluster",
            "children": [{
                "name": "AgglomerativeCluster",
                "size": 3938
            }, {
                "name": "CommunityStructure",
                "size": 3812
            }, {
                "name": "HierarchicalCluster",
                "size": 6714
            }, {
                "name": "MergeEdge",
                "size": 743
            }, {
                "name": "MergeEdge",
                "size": 743
            }]
        },
        {
            "name": "cluster",
            "children": [{
                "name": "AgglomerativeCluster",
                "size": 3938
            }, {
                "name": "CommunityStructure",
                "size": 3812
            }, {
                "name": "HierarchicalCluster",
                "size": 6714
            }, {
                "name": "MergeEdge",
                "size": 743
            }]
        }
      ]
      }]}




    var nodes =[];
    var r =10;

    function createTree(treeJson,x,y){

      //创建自己
      if(!x)x=300/2;
      if(!y)y=300/2;
      treeJson.x =x;
      treeJson.y =y;
      var color = "red";


      var node =paper.ellipse(treeJson.x , treeJson.y, r, r);
      node.attr({'fill':"#fff",'stroke':"steelblue",'stroke-width':1.5})

      var text =paper.text(treeJson.x , treeJson.y,treeJson.name)
      var bbox=text.getBBox();
      text.attr({"x":treeJson.x+bbox.width/2+r+2}).toFront()
      //创建子树

      if(treeJson.children){

       for (var i =0 ;i<treeJson.children.length;i++){

         var ty=treeJson.y+(i*100);
         var cNode = createTree(treeJson.children[i],treeJson.x+150,ty);
         var line = paper.connection(node,cNode, "#ccc")
         connections.push(line);
        }


      }



      return node;

    }







    var  connections = [];

    var RootNode = {

    }
  createTree(treeJson );
    // var shapes = [  paper.ellipse(190, 100, r, r),
    //                 paper.ellipse(290, 100, r,r),
    //                 paper.ellipse(290, 180, r,r),
    //                 paper.ellipse(290, 280, r, r)
    //               ];




    // connections.push(paper.connection(shapes[0], shapes[1], "#000"));
    // connections.push(paper.connection(shapes[0], shapes[2], "#000", "#fff|5"));
    // connections.push(paper.connection(shapes[0], shapes[3], "#000", "#fff"));










});