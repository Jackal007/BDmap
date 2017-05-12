define(['MyPoint', 'MyRoute'], function(MyPoint, MyRoute) {
  var create_new = function(map) {
    /*
     *这个类xxxxx
     */

    var Person = {};
    Person.map = map;

    Person.points = [];
    Person.points_size = 0;

    Person.routes = [];
    Person.routes_size = 0;

    Person.info = "";

    Person.add_info = function(info, offsetX, offsetY) {

    }

    Person.add_point = function(point) {
      Person.points.push(point);
      Person.points_size++;
    }

    Person.get_route = function() {
      for (var i = 1; i < Person.points_size; i++) {
        var route = MyRoute.create_new(Person.map, Person.points[i - 1], Person.points[i]);
        Person.routes.push(route);
        Person.routes_size++;
      }
    }

    Person.show_route = function() {
      Person.get_route();
      for (var i = 0; i < Person.routes_size; i++) {
        Person.routes[i].show();
      }
    }

    return Person;
  }

  return {
    create_new: create_new
  };
});
