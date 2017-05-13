define(['MyPoint', 'MyRoute'], function(MyPoint, MyRoute) {
  var create_new = function(map) {
    console.log("carete MyPath :" + map);
    /*
     *many segment of route form a path
     */
    var MyPath = {};
    //show on this map
    MyPath.map = map;
    //
    MyPath.points = [];
    MyPath.points_size = 0;
    //
    MyPath.routes = [];
    MyPath.routes_size = 0;
    //
    MyPath.info = "";

    MyPath.add_info = function(info, offsetX, offsetY) {

    }

    MyPath.add_point = function(point) {
      console.log("add point to MyPatn " + map);
      MyPath.points.push(point);
      MyPath.points_size++;
    }

    MyPath.get_route = function() {
      console.log("MyPatn get route " + map);
      for (var i = 1; i < MyPath.points_size; i++) {
        var route = MyRoute.create_new(MyPath.map, MyPath.points[i - 1], MyPath.points[i]);
        MyPath.routes.push(route);
        MyPath.routes_size++;
      }
    }

    MyPath.show_route = function() {
      console.log("MyPatn show route " + map);
      MyPath.get_route();
      for (var i = 0; i < MyPath.routes_size; i++) {
        MyPath.routes[i].show();
      }
    }

    return MyPath;
  }

  return {
    create_new: create_new
  };
});
