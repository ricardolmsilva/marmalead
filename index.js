function showSuggestionDescriptions() {
  const prefix = "marmameter-dot";
  const search = "good";

  const elements = document.querySelectorAll(".marmameter-dot");
  elements.forEach((dot) => {
    const attributeKey = "data-original-title";
    const attributeValue = dot
      .getAttribute("data-original-title")
      .split(" ")[1];
    dot.parentElement.append(attributeValue);
  });
}

function addListOfKeyworks() {
  const table = document.querySelector("#listTable_container");
  const firstColumnCells = table.querySelectorAll("td.dt-left");
  let keywords = [];
  firstColumnCells.forEach((k) => keywords.push(k.textContent));
  table.insertAdjacentHTML("afterend", keywords.join(", "));
}

document.addEventListener("DOMContentLoaded", function () {
  addListOfKeyworks();
  showSuggestionDescriptions();
});
