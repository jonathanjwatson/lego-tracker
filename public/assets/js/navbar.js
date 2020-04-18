$(document).ready(function () {
  $("#lego-search-button").on("click", function (event) {
    event.preventDefault();
    console.log("search button");
    const searchTerm = $("#lego-search-bar").val();
    console.log(searchTerm);
    window.location.replace(`/search/${searchTerm}`);
  });
});
