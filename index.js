let myLeads = []
const searchField = document.querySelector("#input-el");
const btn = document.querySelector("button");
const leads = document.querySelector(".leads");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(localStorage.length) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads, leads)
}

btn.addEventListener("click", () => {
    if(searchField.value) {
        myLeads.push(searchField.value)
        searchField.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads, leads);
    }
});


function renderLeads(leadsArr, leadsElement) {
    const leadElements = leadsArr.map(lead => renderLead(lead));
    if (leadsElement.hasChildNodes()) {
        leadsElement.replaceChildren(...leadElements)
    } else {
        leadsElement.append(...leadElements);
    }
}

function renderLead(lead) {
  const leadElement = document.createElement("div");
  const btn = renderBtn();
  leadElement.classList.add("lead");
  leadElement.innerHTML = `<a href="${lead}">${lead}</a>`;
  leadElement.appendChild(btn);
  return leadElement;
}

function renderBtn() {
    const btn = document.createElement("button");
    btn.textContent = "DELETE";
    btn.addEventListener("click", e => deleteLead(e));
    return btn;
}

function deleteLead(e) {
    const value = e.target.previousSibling.textContent;
    myLeads = myLeads.filter(element => element !== value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads, leads);
}