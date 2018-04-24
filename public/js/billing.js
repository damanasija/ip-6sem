let sgstSerialNo = 0;
let igstSerialNo = 0;
let taxRates = null;
let alphabetsRegex = /[a-z]/gi;
const dangerClass = "alert alert-danger";
const successClass = "alert alert-success";

const displayMessage = (msgString, classValue) => {
    let timeout = 2000;
    let messageDiv = document.getElementById("message");
    messageDiv.innerHTML = `<center>${msgString}</center>`;
    messageDiv.className = classValue;
    messageDiv.style.display = "block";
    window.scrollTo(0, messageDiv.offsetTop);
    
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, timeout);
    
}

const isNullOrUndefined = (reference) => {
    if(reference === undefined || reference === null)
        return 1;
    return 0;
}

document.getElementById("igstTable").style.display = "none";
document.getElementById("firmState").value = document.getElementById("userState").innerHTML;

const setTaxRate = (rowRef, index, type) => {
    taxRate = rowRef.childNodes[index].firstChild;
    if(taxRate.value == "-" || taxRate.value < 0){
        taxRate.value = 0;
        let msgString = `<strong>Tax Rates</strong> can't be a <strong>negative</strong> value. 
        (at row: <strong>${rowRef.id.replace(/\w{4}row/g,"")}</strong>)`;
        displayMessage(msgString, dangerClass);
    }
    if(taxRate.value > 30){
        taxRate.value = 0;
        let msgString = `<strong>Tax Rates</strong> can't be greater than <strong>30%</strong>.
        (at row: <strong>${rowRef.id.replace(/\w{4}row/g,"")}</strong>)`;
        displayMessage(msgString, dangerClass);
    }
    if(isNaN(taxRate.value)){
        taxRate.value = taxRate.value.replace(alphabetsRegex, "");
        let msgString =  `<strong>Tax Rates</strong> are <strong>numeric</strong> values.
        (at row: <strong>${rowRef.id.replace(/\w{4}row/g,"")}</strong>)`;
        displayMessage(msgString, dangerClass);
    }
    if(taxRate.value != ""){
        taxRate.value = parseInt(taxRate.value);
        if(type == "sgst")
            sgstCalculator(rowRef);
        else
            igstCalculator(rowRef);
    }
}


const sgstCalculator = (rowRef) =>{    
    let quantity = rowRef.childNodes[3].firstChild;
    let ratePerItem = rowRef.childNodes[5].firstChild;
    let discount = rowRef.childNodes[6].firstChild;
    let taxableValue = rowRef.childNodes[7].firstChild;
    let cgstRate = rowRef.childNodes[8].firstChild;
    let cgstAmt = rowRef.childNodes[9].firstChild;
    let sgstRate = rowRef.childNodes[10].firstChild;
    let sgstAmt = rowRef.childNodes[11].firstChild;
    let netAmt = rowRef.childNodes[12].firstChild;


    // Default values for each field
    if(quantity.value == "")
        quantity.value = 1;
    if(discount.value == "")
        discount.value = 0;
    if(cgstRate.value == "")
        cgstRate.value = 0;
    sgstRate.value = cgstRate.value;


    //sgstValidator(rowRef);
    taxableValue.value = quantity.value * (ratePerItem.value * (1 - discount.value/100 ));
    cgstAmt.value = taxableValue.value*(cgstRate.value)/100;
    sgstAmt.value = taxableValue.value*(sgstRate.value)/100;
    netAmt.value = parseInt(cgstAmt.value) + parseInt(sgstAmt.value) + parseInt(taxableValue.value);
    // if(isNullOrUndefined(discount.value)){
    //     discount.value = 0;
    // }
}

const sgstValidator = (rowRef) => {
    console.log("validated");
}


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
    let rowId = `sgstrow${id}`;
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", rowId);

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
    newRateInput.setAttribute("oninput", `sgstCalculator(${rowId})`);
    newRateInput.setAttribute("size", "35");
    newRateInput.className = "form-control";
    newRateCell.appendChild(newRateInput);


    let newDiscountCell = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.setAttribute("size", "2");    
    newDiscountInput.className = "form-control";
    newDiscountCell.appendChild(newDiscountInput);

    let newTaxCell = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.setAttribute("size", "30");    
    newTaxInput.className = "form-control";
    newTaxCell.appendChild(newTaxInput);

    let newCgstRateCell = document.createElement("td");
    let newCgstRateInput = document.createElement("input");
    newCgstRateInput.setAttribute("type", "text");
    newCgstRateInput.setAttribute("size", "15");
    newCgstRateInput.setAttribute("oninput", `setTaxRate(${rowId}, 8, "sgst")`);
    newCgstRateInput.setAttribute("onblur", `sgstCalculator(${rowId})`);
    newCgstRateInput.className="form-control";
    newCgstRateCell.appendChild(newCgstRateInput);

    let newCgstAmtCell = document.createElement("td");
    let newCgstAmtInput = document.createElement("input");
    newCgstAmtInput.setAttribute("type", "text");
    newCgstAmtInput.setAttribute("size", "5");
    newCgstAmtInput.setAttribute("style" , "color:red;");
    newCgstAmtInput.className="btn btn-default";
    newCgstAmtInput.setAttribute("disabled", true);
    newCgstAmtCell.appendChild(newCgstAmtInput);

    let newSgstRateCell = document.createElement("td");
    let newSgstRateInput = document.createElement("input");
    newSgstRateInput.setAttribute("type", "text");
    newSgstRateInput.setAttribute("size", "15");
    newSgstRateInput.setAttribute("disabled", true);
    newSgstRateInput.className="form-control";
    newSgstRateCell.appendChild(newSgstRateInput);

    let newSgstAmtCell = document.createElement("td");
    let newSgstAmtInput = document.createElement("input");
    newSgstAmtInput.setAttribute("type", "text");
    newSgstAmtInput.setAttribute("size", "5");
    newSgstAmtInput.className="btn btn-default";
    newSgstAmtInput.setAttribute("style" , "color:red;");
    newSgstAmtInput.setAttribute("disabled", true);
    newSgstAmtCell.appendChild(newSgstAmtInput);

    let newNetAmtCell = document.createElement("td");
    let newNetAmtInput = document.createElement("input");
    newNetAmtInput.setAttribute("type", "text");
    newNetAmtInput.className = "form-control";
    newNetAmtInput.setAttribute("size", "80");
    newNetAmtInput.setAttribute("style" , "color:#006400;");
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
    newDeleteButton.setAttribute("onclick", `deleteSgstItem(${rowId})`);
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
        let rowRef = `sgstrow${i + 1}`;
        sgstTableBody.childNodes[i].id = rowRef;
        sgstTableBody.childNodes[i].childNodes[0].innerText = i + 1;
        sgstTableBody.childNodes[i].childNodes[13].firstChild.setAttribute('onclick', `deleteSgstItem(${rowRef})`);
        sgstTableBody.childNodes[i].childNodes[5].firstChild.setAttribute('oninput', `sgstCalculator(${rowRef})`);
        sgstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('oninput', `setTaxRate(${rowRef}, 8, "sgst")`);
        sgstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('onblur', `sgstCalculator(${rowRef})`);        
    }
}



const addIgstItem = () => {
    let id = ++igstSerialNo;
    let tableBody = document.getElementById("igstTableBody");
    let rowId = `igstRow${id}`;
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", rowId);

    // ADDING SERIAL NO
    let newSerialCell = document.createElement("td");
    let newSerialNode = document.createTextNode(igstSerialNo);
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
    newRateInput.setAttribute("oninput", `igstCalculator(${rowId})`);
    newRateInput.setAttribute("size", "35");    
    newRateInput.className = "form-control";
    newRateCell.appendChild(newRateInput);

    let newDiscountCell = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.setAttribute("size", "2")    
    newDiscountInput.className = "form-control";
    newDiscountCell.appendChild(newDiscountInput);

    let newTaxCell = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.setAttribute("size", "30");
    newTaxInput.className = "form-control";
    newTaxCell.appendChild(newTaxInput);

    let newIgstRateCell = document.createElement("td");
    let newIgstRateInput = document.createElement("input");
    newIgstRateInput.setAttribute("type", "text");
    newIgstRateInput.setAttribute("size", "15");
    newIgstRateInput.setAttribute("oninput", `setTaxRate(${rowId}, 8, "igst")`);
    newIgstRateInput.setAttribute("onblur", `igstCalculator(${rowId})`);
    newIgstRateInput.className="form-control";
    newIgstRateCell.appendChild(newIgstRateInput);

    let newIgstAmtCell = document.createElement("td");
    let newIgstAmtInput = document.createElement("input");
    newIgstAmtInput.setAttribute("type", "text");
    newIgstAmtInput.setAttribute("size", "5");
    newIgstAmtInput.setAttribute("style" , "color:red;");
    newIgstAmtInput.className="btn btn-default";
    newIgstAmtInput.setAttribute("disabled", true);
    newIgstAmtCell.appendChild(newIgstAmtInput);

    let newNetAmtCell = document.createElement("td");
    let newNetAmtInput = document.createElement("input");
    newNetAmtInput.setAttribute("type", "text");
    newNetAmtInput.className = "form-control";
    newNetAmtInput.setAttribute("size", "100");
    newNetAmtInput.setAttribute("style" , "color:#006400;");
    newNetAmtCell.appendChild(newNetAmtInput);
    newNetAmtCell.setAttribute("colspan", "4");
    
    let newDeleteCell = document.createElement("td");
    let newDeleteButton = document.createElement("button");
    newDeleteButton.className = "btn btn-danger btn-sm";
    let deleteIcon = document.createElement("span");
    deleteIcon.className = "glyphicon glyphicon-trash";
    newDeleteButton.appendChild(document.createTextNode("Delete"));
    newDeleteButton.appendChild(deleteIcon);
    //the arguements in the deleteIgstItem() functions send a reference of this row to this function;
    newDeleteButton.setAttribute("onclick", `deleteIgstItem(${rowId})`);
    newDeleteCell.appendChild(newDeleteButton);

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
    newRow.appendChild(newDeleteCell);

    // APPENDING THE NEWLY CREATED ROW TO THE TABLEBODY
    tableBody.appendChild(newRow);
}

const deleteIgstItem = (rowReference) => {
    let igstTableBody = document.getElementById("igstTableBody");
    igstTableBody.removeChild(rowReference);
    igstSerialNo--;
    setIgstIds();
}

const setIgstIds = () => {
    let igstTableBody = document.getElementById("igstTableBody");
    for(let i = 0; i < igstTableBody.childElementCount; i++){
        let rowRef = `igstrow${i + 1}`;
        igstTableBody.childNodes[i].id = rowRef;
        igstTableBody.childNodes[i].childNodes[0].innerText = i + 1;
        igstTableBody.childNodes[i].childNodes[13].firstChild.setAttribute('onclick', `deleteIgstItem(${rowRef})`);
        igstTableBody.childNodes[i].childNodes[5].firstChild.setAttribute('oninput', `igstCalculator(${rowRef})`);
        igstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('oninput', `setTaxRate(${rowRef}, 8, "igst")`);
        igstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('onblur', `igstCalculator(${rowRef})`);        
    }
}