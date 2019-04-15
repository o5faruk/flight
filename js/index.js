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
  $.get("api/cars", { skip, limit }, function(data) {
    reloadTable(data);
  });
};

const actionButtons = function(id) {
  return `<button class="btn btn-secondary float-right" onclick="edit(${id})">Edit</button><button class="btn btn-danger mr-3 float-right" onclick="del(${id})">Delete</button>`;
};

const reloadTable = function(cars) {
  var table = $("#cars_table");
  table.find("tbody tr").remove();
  cars.forEach(function(car) {
    table.append(
      `<tr><td> ${car.id} </td><td> ${car.name} </td><td> ${
        car.model
      } </td><td> ${car.year} </td><td> ${
        car.power
      } </td><td style="max-width:200px">${actionButtons(car.id)}</td></tr>`
    );
  });
};

const addPage = function(num) {
  let page = $("#pageNumberInput").val();
  $("#pageNumberInput").val(Number(page) + num);
  getCars();
};

const del = function(id) {
  $.ajax({
    type: "DELETE",
    url: "api/cars/" + id,
    success: function() {
      getCars();
    }
  });
};

const edit = function(id) {
  $.ajax({
    type: "GET",
    url: "api/cars/" + id,
    success: function(data) {
      console.log(data);
    }
  });
};
