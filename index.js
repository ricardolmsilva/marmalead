function showSuggestionDescriptions() {
  const elementsToSearch = ".marmameter-dot";
  const elements = document.querySelectorAll(elementsToSearch);
  const id = "code_meter_list";

  elements.forEach((dot) => {
    const attributeKey = "data-original-title";
    const attributeValue = dot.getAttribute(attributeKey).split(" ")[1];

    if (dot.lastElementChild?.id !== id) {
      dot.style.marginRight = "20px";
      dot.style.width = "70px";
      dot.style.height = "50px";
      dot.style.borderRadius = "3px";
      const span = document.createElement("div");
      span.textContent = attributeValue;
      span.setAttribute("id", id);
      dot.appendChild(span);
    } else {
      console.log("exist");
      dot.lastElementChild.textContent = attributeValue;
    }
  });
}

function addListOfKeywords() {
  const table = document.querySelector("#listTable_container");
  const firstColumnCells = table.querySelectorAll("td.dt-left");
  let keywords = [];
  firstColumnCells.forEach((k) => keywords.push(k.textContent));

  const id = "code_keyworkds_list";

  if (table.previousElementSibling.id !== id) {
    console.log("don't exists");

    const paragraph = document.createElement("p");
    paragraph.setAttribute("id", id);
    paragraph.textContent = keywords.join(", ");
    paragraph.style.background = "rgba(0,0,0,0.1)";
    paragraph.style.padding = "20px 10px";
    paragraph.style.width = "95%";
    paragraph.style.marginBottom = "30px";
    paragraph.style.display = "flex";
    paragraph.style.justifyContent = "center";

    table.insertAdjacentHTML("beforebegin", paragraph.outerHTML);
  } else {
    console.log("already exists");
    table.previousElementSibling.textContent = keywords.join(", ");
  }
}

function addObserver(target, methods, condition) {
  // Define the function to be run when the element is displayed
  function elementDisplayed() {
    console.log("The element changed");
    methods.forEach((method) => method());
  }

  // Create an observer to watch for changes to the target element
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // Check if the display style was changed
      if (condition) {
        elementDisplayed();
      }
    });
  });

  // Observe the target element for changes to its style attribute
  observer.observe(target, {
    attributes: true,
    attributeFilter: ["style"],
    childList: true,
  });
}

var listTable = document.getElementById("listTable");
addObserver(listTable, [addListOfKeywords], listTable.style.display !== "none");

var stormView = document.getElementById("fs_suggestions");
addObserver(
  stormView,
  [showSuggestionDescriptions],
  stormView.childNodes.length > 0
);
