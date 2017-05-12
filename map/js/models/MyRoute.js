define(['Person', 'MyPoint'], function(Person, MyPoint) {

  var create_new = function(map, startPoint, endPoint) {

    var MyRoute = {};
    MyRoute.map = map;
    MyRoute.startPoint = startPoint;
    MyRoute.endPoint = endPoint;
    MyRoute.duration = 0;
    MyRoute.distance = 0
    MyRoute.path = {};
    MyRoute.velocity = 0;
    MyRoute.info = "";

    MyRoute.add_info = function(info, offsetX, offsetY) {
      var p_len = MyRoute.path.length;
      var point = MyRoute.path[parseInt(p_len / 2)];
      console.log(MyRoute.path[1]);
      console.log(MyRoute.startPoint.point);
      var opts = {
        position: point,
        offset: new BMap.Size(offsetX, offsetY)
      }
      var label = new BMap.Label(info, opts);
      MyRoute.map.addOverlay(label);
    }

    MyRoute.show = function() {
      //get distance ``
      MyRoute.getDistance();
      setTimeout(function() {
        console.log("distance:" + MyRoute.distance);
        //get time
        MyRoute.duration = MyRoute.endPoint.arrival - MyRoute.startPoint.arrival;
        console.log("duration:" + MyRoute.duration);
        //calculate the velocity
        MyRoute.velocity = (MyRoute.distance / MyRoute.duration) * 3.6;
        console.log("velocity:" + MyRoute.velocity);

        //pain the path on the map
        var color = 'black';
        if (MyRoute.velocity < 5) {
          color = '#f4ea29'; //黄色
        } else if (MyRoute.velocity < 20 && MyRoute.velocity > 5) {
          color = '#FF4500'; //橘色
        } else if (MyRoute.velocity > 20) {
          color = '#d81e06'; //红色
        }
        MyRoute.map.addOverlay(new BMap.Polyline(MyRoute.path, {
          strokeColor: color,
          enableClicking: false
        }));
        MyRoute.add_info("长度：" + MyRoute.distance / 1000 + "km", 0, 0);
        MyRoute.add_info("速度：" + MyRoute.velocity + "km/h", 0, 20);
      }, 1000);
    }

    MyRoute.getDistance = function() {
      var transit = new BMap.DrivingRoute(MyRoute.map, {
        // renderOptions: {
        //   map: MyRoute.map
        // },
        onSearchComplete: function(results) {
          var plan = results.getPlan(0);
          MyRoute.distance = plan.getDistance(false);
          MyRoute.path = plan.getRoute(0).getPath();
        }
        // onPolylinesSet: function() {}
      });
      transit.search(MyRoute.startPoint, MyRoute.endPoint);
    }

    return MyRoute;
  }
  return {
    create_new: create_new
  };
});
