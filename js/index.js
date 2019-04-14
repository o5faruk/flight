const jqxhr = $.get("api/cars", { skip: 0, limit: 20 }, function(data) {
  reloadTable(data);
});

const reloadTable = function(cars) {
  var table = $("#cars_table");
  table.find("tbody tr").remove();
  cars.forEach(function(car) {
    table.append(`<tr><td> ${car.id} </td><td> ${car.name} </td><td> ${car.model} </td><td> ${car.year} </td><td> ${car.power} </td><td></td></tr>`);
  });
};
