$(function() {
  getCars();

  $("#createCarForm").on("submit", function(e) {
    e && e.preventDefault();
    var form = $(this);
    $.ajax({
      type: "POST",
      url: "api/cars",
      data: form.serialize(),
      success: function() {
        getCars();
        $("#addCarModal").modal("toggle");
        form.find("input[type=text], input[type=number]").val("");
      }
    });
  });
});

const getCars = function() {
  let limit = $("#pageSizeInput").val();
  let page = $("#pageNumberInput").val();
  let skip = limit * (page - 1);
  console.log("RELOAD", skip, limit);
  $.get("api/cars", { skip, limit }, function(data) {
    reloadTable(data);
  });
};

const reloadTable = function(cars) {
  var table = $("#cars_table");
  table.find("tbody tr").remove();
  cars.forEach(function(car) {
    table.append(
      `<tr><td> ${car.id} </td><td> ${car.name} </td><td> ${
        car.model
      } </td><td> ${car.year} </td><td> ${car.power} </td><td></td></tr>`
    );
  });
};

const addPage = function(num) {
  let page = $("#pageNumberInput").val();
  $("#pageNumberInput").val(Number(page) + num);
  getCars();
};
