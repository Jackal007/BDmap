
require.config({
  paths: { //配置加载路径
    QW: 'libs/qwrap/qwrap-youa-debug',
    text: 'libs/require/text', //requirejs的一个文本插件
    MyPath: "models/MyPath",
    MyPoint: 'models/MyPoint',
    MyRoute: 'models/MyRoute'
  }
  // waitSeconds: 10
});

require(['MyPath', 'MyPoint', 'MyRoute'], function(MyPath, MyPoint, MyRoute) {
  //
  var map = new BMap.Map("map");
  //the center point
  var point = new BMap.Point(119.376414, 25.725794);
  //config the map
  map.centerAndZoom(point, 10);
  map.enableScrollWheelZoom(true);
  map.enableDragging();
  // 添加带有定位的导航控件
  var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);

  var paths = [];
  var input = document.getElementById("input").value;
  var line = input.split('\n');

  for (var i = 0, n = 0, path = MyPath.create_new(map); i < line.length; i++, n++) {
    if (line[i] == "@") { //"@"  means a new Path
      paths.push(path);
      path.show_route();
      path = MyPath.create_new(map);
      n = -1;
      continue;
    }
    //set point
    var pt = new BMap.Point(line[i].split(' ')[0].split(',')[0], line[i].split(' ')[0].split(',')[1]);
    var arrival = line[i].split(' ')[1];
    var point = MyPoint.create_new(map, pt, arrival);
    point.add_info(n + 1, 0, -20);
    //add it  into path
    path.add_point(point);
  }

  /*mark the start point and the end point*/
  // map.points[0].mark("start");
  // map.points[map.points_size].mark("end");
});
