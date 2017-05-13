
define(['MyPath', 'MyRoute'], function(MyPath, MyRoute) {

  var create_new = function(map, point, arrival) {
    console.log("create MyPoint " + point);

    var MyPoint = {};
    //show on this map
    MyPoint.map = map;
    //BaiduMap point
    MyPoint.point = point;
    //
    MyPoint.arrival = arrival;
    //
    MyPoint.info = "";

    /* mark the point with icon*/
    MyPoint.mark = function(icon, x, y) {
      console.log("mark point " + point + " with " + icon);
      var myIcon = new BMap.Icon("routers/" + icon + ".png", new BMap.Size(x, y));
      var marker = new BMap.Marker(point, {
        icon: myIcon
      });
      MyPoint.map.addOverlay(marker);
    };

    /* add info to the point*/
    MyPoint.add_info = function(info, offsetX, offsetY) {
      console.log("add info to  point " + point + " with " + info);
      var opts = {
        position: point,
        offset: new BMap.Size(offsetX, offsetY)
      }
      var label = new BMap.Label(info, opts);
      MyPoint.map.addOverlay(label);
    };

    return MyPoint;
  };

  return {
    create_new: create_new
  };

});
