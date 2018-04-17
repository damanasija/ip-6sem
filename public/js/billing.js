let sgstSerialNo = 0;
let igstSerialNo = 0;
let taxRates = null;



document.getElementById("igstTable").style.display = "none";
document.getElementById("firmState").value = document.getElementById("userState").innerHTML;


const billSelector = () =>{
    userState = document.getElementById("userState").innerHTML;
    firmState = document.getElementById("firmState").value;
    if(userState != firmState){
        document.getElementById("sgstTable").style.display = "none";
        document.getElementById("igstTable").style.display = "block";
    }
    else{
        document.getElementById("sgstTable").style.display = "block";
        document.getElementById("igstTable").style.display = "none";
    }
}

const unsetSelectAll = () =>{
}
const states = [
    {
        "key": "AN",
        "name": "ANDAMAN AND NICOBAR ISLANDS"
    },
    {
        "key": "AP",
        "name": "ANDHRA PRADESH"
    },
    {
        "key": "AR",
        "name": "ARUNACHAL PRADESH"
    },
    {
        "key": "AS",
        "name": "ASSAM"
    },
    {
        "key": "BR",
        "name": "BIHAR"
    },
    {
        "key": "CG",
        "name": "CHANDIGARH"
    },
    {
        "key": "CH",
        "name": "CHHATTISGARH"
    },
    {
        "key": "DH",
        "name": "DADRA AND NAGAR HAVELI"
    },
    {
        "key": "DD",
        "name": "DAMAN AND DIU"
    },
    {
        "key": "DL",
        "name": "DELHI"
    },
    {
        "key": "GA",
        "name": "GOA"
    },
    {
        "key": "GJ",
        "name": "GUJARAT"
    },
    {
        "key": "HR",
        "name": "HARYANA"
    },
    {
        "key": "HP",
        "name": "HIMACHAL PRADESH"
    },
    {
        "key": "JK",
        "name": "JAMMU AND KASHMIR"
    },
    {
        "key": "JH",
        "name": "JHARKHAND"
    },
    {
        "key": "KA",
        "name": "KARNATAKA"
    },
    {
        "key": "KL",
        "name": "KERALA"
    },
    {
        "key": "LD",
        "name": "LAKSHADWEEP"
    },
    {
        "key": "MP",
        "name": "MADHYA PRADESH"
    },
    {
        "key": "MH",
        "name": "MAHARASHTRA"
    },
    {
        "key": "MN",
        "name": "MANIPUR"
    },
    {
        "key": "ML",
        "name": "MEGHALAYA"
    },
    {
        "key": "MZ",
        "name": "MIZORAM"
    },
    {
        "key": "NL",
        "name": "NAGALAND"
    },
    {
        "key": "OR",
        "name": "ODISHA"
    },
    {
        "key": "PY",
        "name": "PUDUCHERRY"
    },
    {
        "key": "PB",
        "name": "PUNJAB"
    },
    {
        "key": "RJ",
        "name": "RAJASTHAN"
    },
    {
        "key": "SK",
        "name": "SIKKIM"
    },
    {
        "key": "TN",
        "name": "TAMIL NADU"
    },
    {
        "key": "TS",
        "name": "TELANGANA"
    },
    {
        "key": "TR",
        "name": "TRIPURA"
    },
    {
        "key": "UK",
        "name": "UTTAR PRADESH"
    },
    {
        "key": "UP",
        "name": "UTTARAKHAND"
    },
    {
        "key": "WB",
        "name": "WEST BENGAL"
    }
];

const addSgstItem = () => {
    let id = ++sgstSerialNo;
    let tableBody = document.getElementById("sgstTableBody");

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", `row${id}`);

    // ADDING SERIAL NO 
    let newSerialCell = document.createElement("td");
    let newSerialNode = document.createTextNode(sgstSerialNo);
    newSerialCell.appendChild(newSerialNode);

    // ADDING DESCRIPTION FIELD
    let newDescCell = document.createElement("td");
    let newDescInput = document.createElement("input");
    newDescInput.setAttribute("type", "text");
    newDescInput.setAttribute("size", "50");
    newDescInput.className = "form-control";
    newDescCell.appendChild(newDescInput);
    
    // ADDING HSN FIELD
    let newHsnCell = document.createElement("td");
    let newHsnInput = document.createElement("input");
    newHsnInput.setAttribute("type", "text");
    newHsnInput.className = "form-control";
    newHsnCell.appendChild(newHsnInput);

    // ADDING QUANTITY FIELD
    let newQtyCell = document.createElement("td");
    let newQtyInput = document.createElement("input");
    newQtyInput.setAttribute("type", "text");
    newQtyInput.className = "form-control";
    newQtyInput.setAttribute("size", "10");
    newQtyCell.appendChild(newQtyInput);

    // making a drop down
    let newUnitCell = document.createElement("td");
    let newUnitSelect = document.createElement("select");
    newUnitSelect.className = "btn btn-sm";
    //dropdown list options
    let pcOption = document.createElement("option");
    pcOption.setAttribute("value", "PCS");
    pcOption.appendChild(document.createTextNode("PCS"));
    
    let kgOption = document.createElement("option");
    kgOption.setAttribute("value", "KG");
    kgOption.appendChild(document.createTextNode("KG"));
    
    let ltrOption = document.createElement("option");
    ltrOption.setAttribute("value", "LTR");
    ltrOption.appendChild(document.createTextNode("LTR"));

    let unitOption = document.createElement("option");
    unitOption.setAttribute("value", "UNIT");
    unitOption.appendChild(document.createTextNode("UNIT"));

    //appending these options to select element
    newUnitSelect.appendChild(pcOption);
    newUnitSelect.appendChild(kgOption);
    newUnitSelect.appendChild(ltrOption);
    newUnitSelect.appendChild(unitOption);
    newUnitCell.appendChild(newUnitSelect);

    // ADDING NEW RATE FIELD
    let newRateCell = document.createElement("td");
    let newRateInput = document.createElement("input");
    newRateInput.setAttribute("type", "text");
    newRateInput.className = "form-control";
    newRateCell.appendChild(newRateInput);


    let newDiscountCell = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.className = "form-control";
    newDiscountInput.setAttribute("size", "2")
    newDiscountCell.appendChild(newDiscountInput);

    let newTaxCell = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.className = "form-control";
    //newTaxElement.setAttribute("colspan", "2");
    newTaxCell.appendChild(newTaxInput);

    let newCgstRateCell = document.createElement("td");
    let newCgstRateInput = document.createElement("input");
    newCgstRateInput.setAttribute("type", "text");
    newCgstRateInput.setAttribute("size", "4");
    //newCgstRateInput.setAttribute("disabled", true);
    newCgstRateInput.className="form-control";
    newCgstRateCell.appendChild(newCgstRateInput);

    let newCgstAmtCell = document.createElement("td");
    let newCgstAmtInput = document.createElement("input");
    newCgstAmtInput.setAttribute("type", "text");
    newCgstAmtInput.setAttribute("size", "1");
    //newCgstAmtInput.className="btn btn-sm btn-disabled";
    newCgstAmtInput.setAttribute("disabled", true);
    newCgstAmtCell.appendChild(newCgstAmtInput);

    let newSgstRateCell = document.createElement("td");
    let newSgstRateInput = document.createElement("input");
    newSgstRateInput.setAttribute("type", "text");
    newSgstRateInput.setAttribute("size", "1");
    //newSgstRateInput.setAttribute("disabled", true);
    //newSgstRateInput.className="btn btn-sm btn-disabled";
    newSgstRateCell.appendChild(newSgstRateInput);

    let newSgstAmtCell = document.createElement("td");
    let newSgstAmtInput = document.createElement("input");
    newSgstAmtInput.setAttribute("type", "text");
    newSgstAmtInput.setAttribute("size", "1");
    //newSgstAmtInput.className="btn btn-sm btn-disabled";
    newSgstAmtInput.setAttribute("disabled", true);
    newSgstAmtCell.appendChild(newSgstAmtInput);

    let newNetAmtCell = document.createElement("td");
    let newNetAmtInput = document.createElement("input");
    newNetAmtInput.setAttribute("type", "text");
    newNetAmtInput.className = "form-control";
    newNetAmtInput.setAttribute("size", "100");
    newNetAmtCell.appendChild(newNetAmtInput);
    //newNetAmtElement.setAttribute("colspan", "2");

    let newDeleteCell = document.createElement("td");
    let newDeleteButton = document.createElement("button");
    newDeleteButton.className = "btn btn-danger btn-sm";
    let deleteIcon = document.createElement("span");
    deleteIcon.className = "glyphicon glyphicon-trash";
    newDeleteButton.appendChild(document.createTextNode("Delete"));
    newDeleteButton.appendChild(deleteIcon);
    //the arguements in the deleteSgstItem() functions send a reference of this row to this function;
    newDeleteButton.setAttribute("onclick", `deleteSgstItem(row${sgstSerialNo})`);
    newDeleteCell.appendChild(newDeleteButton);
    

    newRow.appendChild(newSerialCell);
    newRow.appendChild(newDescCell);
    newRow.appendChild(newHsnCell);
    newRow.appendChild(newQtyCell);
    newRow.appendChild(newUnitCell);
    newRow.appendChild(newRateCell);
    newRow.appendChild(newDiscountCell);
    newRow.appendChild(newTaxCell);
    newRow.appendChild(newCgstRateCell);
    newRow.appendChild(newCgstAmtCell);
    newRow.appendChild(newSgstRateCell);
    newRow.appendChild(newSgstAmtCell);
    newRow.appendChild(newNetAmtCell);
    newRow.appendChild(newDeleteCell);
    
    tableBody.appendChild(newRow);
}

const deleteSgstItem = (rowReference) => {
    let sgstTableBody = document.getElementById("sgstTableBody");
    sgstTableBody.removeChild(rowReference);
    sgstSerialNo--;
    setSgstIds();
}

const setSgstIds = () => {
    let sgstTableBody = document.getElementById("sgstTableBody");
    for(let i = 0; i < sgstTableBody.childElementCount; i++){
        sgstTableBody.childNodes[i].id = `row${i + 1}`;
        sgstTableBody.childNodes[i].childNodes[0].innerText = i + 1;
        sgstTableBody.childNodes[i].childNodes[13].firstChild.setAttribute('onclick', `deleteSgstItem(row${i + 1})`);
    }
}



const addIgstItem = () => {
    let id = ++igstSerialNo;
    let tableBody = document.getElementById("igstTableBody");

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", `row${id}`);

    let newSerialCell = document.createElement("td");
    let newSerialNode = document.createTextNode(igstSerialNo);
    newSerialCell.appendChild(newSerialNode);


    let newDescCell = document.createElement("td");

    //creating input tag
    let newDescInput = document.createElement("input");
    newDescInput.setAttribute("type", "text");
    newDescInput.setAttribute("size", "50");
    newDescInput.className = "form-control";

    
    newDescCell.appendChild(newDescInput);
    
    let newHsnCell = document.createElement("td");
    //newHsnElementclassName = "col-xs-1";
    let newHsnInput = document.createElement("input");
    newHsnInput.setAttribute("type", "text");
    newHsnInput.className = "form-control";
    //newHsnElement.setAttribute("colspan", "2");
    newHsnCell.appendChild(newHsnInput);

    let newQtyCell = document.createElement("td");
    //newQtyElement.className="col-xs-1";
    let newQtyInput = document.createElement("input");
    newQtyInput.setAttribute("type", "text");
    newQtyInput.className = "form-control";
    newQtyInput.setAttribute("size", "10");
    //newQtyElement.setAttribute("colspan", "2");
    newQtyCell.appendChild(newQtyInput);

    // making a drop down
    let newUnitCell = document.createElement("td");
    let newUnitSelect = document.createElement("select");
    newUnitSelect.className = "btn btn-sm";
    //newUnitSelect.className = "form-control";
    //dropdown list options
    let pcOption = document.createElement("option");
    pcOption.setAttribute("value", "Pcs");
    pcOption.appendChild(document.createTextNode("Pcs"));
    
    let kgOption = document.createElement("option");
    kgOption.setAttribute("value", "Kg");
    kgOption.appendChild(document.createTextNode("Kg"));
    
    let ltrOption = document.createElement("option");
    ltrOption.setAttribute("value", "Ltr");
    ltrOption.appendChild(document.createTextNode("Ltr"));
    

    //appending these options to select element
    newUnitSelect.appendChild(pcOption);
    newUnitSelect.appendChild(kgOption);
    newUnitSelect.appendChild(ltrOption);
    //newUnitElement.setAttribute("colspan", "2");
    newUnitCell.appendChild(newUnitSelect);

    let newRateCell = document.createElement("td");
    // newRateElement.class = "col-xs-1";
    let newRateInput = document.createElement("input");
    newRateInput.setAttribute("type", "text");
    newRateInput.className = "form-control";
    //newRateElement.setAttribute("colspan", "2");
    newRateCell.appendChild(newRateInput);

    let newDiscountCell = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.className = "form-control";
    newDiscountInput.setAttribute("size", "2")
    //newDiscountElement.setAttribute("colspan", "2");
    newDiscountCell.appendChild(newDiscountInput);

    let newTaxCell = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.className = "form-control";
    //newTaxElement.setAttribute("colspan", "2");
    newTaxCell.appendChild(newTaxInput);

    let newIgstRateCell = document.createElement("td");
    let newIgstRateInput = document.createElement("input");
    newIgstRateInput.setAttribute("type", "text");
    newIgstRateInput.setAttribute("size", "1");
    newIgstRateInput.setAttribute("disabled", true);
    //newIgstRateInput.className="btn btn-sm btn-disabled";
    newIgstRateCell.appendChild(newIgstRateInput);

    let newIgstAmtCell = document.createElement("td");
    let newIgstAmtInput = document.createElement("input");
    newIgstAmtInput.setAttribute("type", "text");
    newIgstAmtInput.setAttribute("size", "1");
    //newIgstAmtInput.className="btn btn-sm btn-disabled";
    newIgstAmtInput.setAttribute("disabled", true);
    newIgstAmtCell.appendChild(newIgstAmtInput);

    let newNetAmtCell = document.createElement("td");
    let newNetAmtInput = document.createElement("input");
    newNetAmtInput.setAttribute("type", "text");
    newNetAmtInput.className = "form-control";
    newNetAmtInput.setAttribute("size", "100");
    newNetAmtCell.appendChild(newNetAmtInput);
    //newNetAmtElement.setAttribute("colspan", "2");
    

    newRow.appendChild(newSerialCell);
    newRow.appendChild(newDescCell);
    newRow.appendChild(newHsnCell);
    newRow.appendChild(newQtyCell);
    newRow.appendChild(newUnitCell);
    newRow.appendChild(newRateCell);
    newRow.appendChild(newDiscountCell);
    newRow.appendChild(newTaxCell);
    newRow.appendChild(newIgstRateCell);
    newRow.appendChild(newIgstAmtCell);
    newRow.appendChild(newNetAmtCell);
    // APPENDING THE NEWLY CREATED ROW TO THE TABLEBODY
    tableBody.appendChild(newRow);
}
