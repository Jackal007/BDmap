﻿
require.config({
  paths: { //配置加载路径
    QW: 'libs/qwrap/qwrap-youa-debug',
    text: 'libs/require/text', //requirejs的一个文本插件
    Person: "models/Person",
    MyPoint: 'models/MyPoint',
    MyRoute: 'models/MyRoute'
  }
  // waitSeconds: 10
});

require(['Person', 'MyPoint', 'MyRoute'], function(Person, MyPoint, MyRoute) {
  var map = new BMap.Map("map");
  //the center point
  var point = new BMap.Point(119.376414, 25.725794);
  //config the map
  map.centerAndZoom(point, 15);
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

  var persons = [];
  var input = document.getElementById("input").value;
  var line = input.split('\n');

  for (var i = 0, person = Person.create_new(map); i < line.length; i++) {
    if (line == "@") { //"@"  means a new person
      persons.push(person);
      person.show_route();
      person = Person.create_new(map);
      continue;
    }
    //set point
    var pt = new BMap.Point(line[i].split(' ')[0].split(',')[0], line[i].split(' ')[0].split(',')[1]);
    //set arrival time
    var arrival = line[i].split(' ')[1];
    //package into myPoint
    var point = MyPoint.create_new(map, pt, arrival);
    point.add_info("到达时间：" + point.arrival + "秒", 0, 0);
    point.add_info(i + 1, 0, -20);
    person.add_point(point);
  }
  console.log(persons);
  /*mark the start point and the end point*/
  // map.points[0].mark("start");
  // map.points[map.points_size].mark("end");


});