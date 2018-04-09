let serialNo = 0;

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
    let id = ++serialNo;
    let tableBody = document.getElementById("sgstTableBody");

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", `row${id}`);

    let newSerialElement = document.createElement("td");
    let newSerialNode = document.createTextNode(serialNo);
    newSerialElement.appendChild(newSerialNode);


    let newDescElement = document.createElement("td");

    //creating input tag
    let newDescInput = document.createElement("input");
    newDescInput.setAttribute("type", "text");
    newDescInput.setAttribute("size", "50");
    newDescInput.className = "form-control";
    newDescElement
    
    newDescElement.appendChild(newDescInput);
    
    let newHsnElement = document.createElement("td");
    //newHsnElementclassName = "col-xs-1";
    let newHsnInput = document.createElement("input");
    newHsnInput.setAttribute("type", "text");
    newHsnInput.className = "form-control";
    //newHsnElement.setAttribute("colspan", "2");
    newHsnElement.appendChild(newHsnInput);

    let newQtyElement = document.createElement("td");
    //newQtyElement.className="col-xs-1";
    let newQtyInput = document.createElement("input");
    newQtyInput.setAttribute("type", "text");
    newQtyInput.className = "form-control";
    newQtyInput.setAttribute("size", "10");
    //newQtyElement.setAttribute("colspan", "2");
    newQtyElement.appendChild(newQtyInput);

    // making a drop down
    let newUnitElement = document.createElement("td");
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
    newUnitElement.appendChild(newUnitSelect);

    let newRateElement = document.createElement("td");
    // newRateElement.class = "col-xs-1";
    let newRateInput = document.createElement("input");
    newRateInput.setAttribute("type", "text");
    newRateInput.className = "form-control";
    //newRateElement.setAttribute("colspan", "2");
    newRateElement.appendChild(newRateInput);

    let newDiscountElement = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.className = "form-control";
    newDiscountInput.setAttribute("size", "2")
    //newDiscountElement.setAttribute("colspan", "2");
    newDiscountElement.appendChild(newDiscountInput);

    let newTaxElement = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.className = "form-control";
    //newTaxElement.setAttribute("colspan", "2");
    newTaxElement.appendChild(newTaxInput);

    let newCgstRateElement = document.createElement("td");
    let newCgstRateInput = document.createElement("input");
    newCgstRateInput.setAttribute("type", "text");
    newCgstRateInput.setAttribute("size", "1");
    newCgstRateInput.setAttribute("disabled", true);
    //newCgstRateInput.className="btn btn-sm btn-disabled";
    newCgstRateElement.appendChild(newCgstRateInput);

    let newCgstAmtElement = document.createElement("td");
    let newCgstAmtInput = document.createElement("input");
    newCgstAmtInput.setAttribute("type", "text");
    newCgstAmtInput.setAttribute("size", "1");
    //newCgstAmtInput.className="btn btn-sm btn-disabled";
    newCgstAmtInput.setAttribute("disabled", true);
    newCgstAmtElement.appendChild(newCgstAmtInput);

    let newSgstRateElement = document.createElement("td");
    let newSgstRateInput = document.createElement("input");
    newSgstRateInput.setAttribute("type", "text");
    newSgstRateInput.setAttribute("size", "1");
    newSgstRateInput.setAttribute("disabled", true);
    //newSgstRateInput.className="btn btn-sm btn-disabled";
    newSgstRateElement.appendChild(newSgstRateInput);

    let newSgstAmtElement = document.createElement("td");
    let newSgstAmtInput = document.createElement("input");
    newSgstAmtInput.setAttribute("type", "text");
    newSgstAmtInput.setAttribute("size", "1");
    //newSgstAmtInput.className="btn btn-sm btn-disabled";
    newSgstAmtInput.setAttribute("disabled", true);
    newSgstAmtElement.appendChild(newSgstAmtInput);

    let newIgstRateElement = document.createElement("td");
    let newIgstRateInput = document.createElement("input");
    newIgstRateInput.setAttribute("type", "text");
    newIgstRateInput.setAttribute("size", "1");
    newIgstRateInput.setAttribute("disabled", true);
    //newIgstRateInput.className="btn btn-sm btn-disabled";
    newIgstRateElement.appendChild(newIgstRateInput);

    let newIgstAmtElement = document.createElement("td");
    let newIgstAmtInput = document.createElement("input");
    newIgstAmtInput.setAttribute("type", "text");
    newIgstAmtInput.setAttribute("size", "1");
    //newIgstAmtInput.className="btn btn-sm btn-disabled";
    newIgstAmtInput.setAttribute("disabled", true);
    newIgstAmtElement.appendChild(newIgstAmtInput);

    let newNetAmtElement = document.createElement("td");
    let newNetAmtInput = document.createElement("input");
    newNetAmtInput.setAttribute("type", "text");
    newNetAmtInput.className = "form-control";
    newNetAmtInput.setAttribute("size", "100");
    newNetAmtElement.appendChild(newNetAmtInput);
    //newNetAmtElement.setAttribute("colspan", "2");
    

    newRow.appendChild(newSerialElement);
    newRow.appendChild(newDescElement);
    newRow.appendChild(newHsnElement);
    newRow.appendChild(newQtyElement);
    newRow.appendChild(newUnitElement);
    newRow.appendChild(newRateElement);
    newRow.appendChild(newDiscountElement);
    newRow.appendChild(newTaxElement);
    newRow.appendChild(newCgstRateElement);
    newRow.appendChild(newCgstAmtElement);
    newRow.appendChild(newSgstRateElement);
    newRow.appendChild(newSgstAmtElement);
    //newRow.appendChild(newIgstRateElement);
    //newRow.appendChild(newIgstAmtElement);
    newRow.appendChild(newNetAmtElement);
    


    tableBody.appendChild(newRow);
}


const addIgstItem = () => {
    let id = ++serialNo;
    let tableBody = document.getElementById("igstTableBody");

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", `row${id}`);

    let newSerialElement = document.createElement("td");
    let newSerialNode = document.createTextNode(serialNo);
    newSerialElement.appendChild(newSerialNode);


    let newDescElement = document.createElement("td");

    //creating input tag
    let newDescInput = document.createElement("input");
    newDescInput.setAttribute("type", "text");
    newDescInput.setAttribute("size", "50");
    newDescInput.className = "form-control";
    newDescElement
    
    newDescElement.appendChild(newDescInput);
    
    let newHsnElement = document.createElement("td");
    //newHsnElementclassName = "col-xs-1";
    let newHsnInput = document.createElement("input");
    newHsnInput.setAttribute("type", "text");
    newHsnInput.className = "form-control";
    //newHsnElement.setAttribute("colspan", "2");
    newHsnElement.appendChild(newHsnInput);

    let newQtyElement = document.createElement("td");
    //newQtyElement.className="col-xs-1";
    let newQtyInput = document.createElement("input");
    newQtyInput.setAttribute("type", "text");
    newQtyInput.className = "form-control";
    newQtyInput.setAttribute("size", "10");
    //newQtyElement.setAttribute("colspan", "2");
    newQtyElement.appendChild(newQtyInput);

    // making a drop down
    let newUnitElement = document.createElement("td");
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
    newUnitElement.appendChild(newUnitSelect);

    let newRateElement = document.createElement("td");
    // newRateElement.class = "col-xs-1";
    let newRateInput = document.createElement("input");
    newRateInput.setAttribute("type", "text");
    newRateInput.className = "form-control";
    //newRateElement.setAttribute("colspan", "2");
    newRateElement.appendChild(newRateInput);

    let newDiscountElement = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.className = "form-control";
    newDiscountInput.setAttribute("size", "2")
    //newDiscountElement.setAttribute("colspan", "2");
    newDiscountElement.appendChild(newDiscountInput);

    let newTaxElement = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.className = "form-control";
    //newTaxElement.setAttribute("colspan", "2");
    newTaxElement.appendChild(newTaxInput);

    let newCgstRateElement = document.createElement("td");
    let newCgstRateInput = document.createElement("input");
    newCgstRateInput.setAttribute("type", "text");
    newCgstRateInput.setAttribute("size", "1");
    newCgstRateInput.setAttribute("disabled", true);
    //newCgstRateInput.className="btn btn-sm btn-disabled";
    newCgstRateElement.appendChild(newCgstRateInput);

    let newCgstAmtElement = document.createElement("td");
    let newCgstAmtInput = document.createElement("input");
    newCgstAmtInput.setAttribute("type", "text");
    newCgstAmtInput.setAttribute("size", "1");
    //newCgstAmtInput.className="btn btn-sm btn-disabled";
    newCgstAmtInput.setAttribute("disabled", true);
    newCgstAmtElement.appendChild(newCgstAmtInput);

    let newSgstRateElement = document.createElement("td");
    let newSgstRateInput = document.createElement("input");
    newSgstRateInput.setAttribute("type", "text");
    newSgstRateInput.setAttribute("size", "1");
    newSgstRateInput.setAttribute("disabled", true);
    //newSgstRateInput.className="btn btn-sm btn-disabled";
    newSgstRateElement.appendChild(newSgstRateInput);

    let newSgstAmtElement = document.createElement("td");
    let newSgstAmtInput = document.createElement("input");
    newSgstAmtInput.setAttribute("type", "text");
    newSgstAmtInput.setAttribute("size", "1");
    //newSgstAmtInput.className="btn btn-sm btn-disabled";
    newSgstAmtInput.setAttribute("disabled", true);
    newSgstAmtElement.appendChild(newSgstAmtInput);

    let newIgstRateElement = document.createElement("td");
    let newIgstRateInput = document.createElement("input");
    newIgstRateInput.setAttribute("type", "text");
    newIgstRateInput.setAttribute("size", "1");
    newIgstRateInput.setAttribute("disabled", true);
    //newIgstRateInput.className="btn btn-sm btn-disabled";
    newIgstRateElement.appendChild(newIgstRateInput);

    let newIgstAmtElement = document.createElement("td");
    let newIgstAmtInput = document.createElement("input");
    newIgstAmtInput.setAttribute("type", "text");
    newIgstAmtInput.setAttribute("size", "1");
    //newIgstAmtInput.className="btn btn-sm btn-disabled";
    newIgstAmtInput.setAttribute("disabled", true);
    newIgstAmtElement.appendChild(newIgstAmtInput);

    let newNetAmtElement = document.createElement("td");
    let newNetAmtInput = document.createElement("input");
    newNetAmtInput.setAttribute("type", "text");
    newNetAmtInput.className = "form-control";
    newNetAmtInput.setAttribute("size", "100");
    newNetAmtElement.appendChild(newNetAmtInput);
    //newNetAmtElement.setAttribute("colspan", "2");
    

    newRow.appendChild(newSerialElement);
    newRow.appendChild(newDescElement);
    newRow.appendChild(newHsnElement);
    newRow.appendChild(newQtyElement);
    newRow.appendChild(newUnitElement);
    newRow.appendChild(newRateElement);
    newRow.appendChild(newDiscountElement);
    newRow.appendChild(newTaxElement);
    // newRow.appendChild(newCgstRateElement);
    // newRow.appendChild(newCgstAmtElement);
    // newRow.appendChild(newSgstRateElement);
    // newRow.appendChild(newSgstAmtElement);
    newRow.appendChild(newIgstRateElement);
    newRow.appendChild(newIgstAmtElement);
    newRow.appendChild(newNetAmtElement);
    


    tableBody.appendChild(newRow);
}

const idSetter = (rowReference, value) => { 

    let row = document.getElementById(rowReference);

    row.childNodes[0].setAttribute("id", `sno${value}`);
    row.childNodes[1].setAttribute("id", `desc${value}`);
    row.childNodes[2].setAttribute("id", `hsn${value}`);
    row.childNodes[3].setAttribute("id", `qty${value}`);
    row.childNodes[4].setAttribute("id", `unit${value}`);
    row.childNodes[5].setAttribute("id", `rt${value}`);
    row.childNodes[6].setAttribute("id", `dscnt${value}`);
    row.childNodes[7].setAttribute("id", `taxval${value}`);
    row.childNodes[8].setAttribute("id", `cgst${value}`);
    row.childNodes[9].setAttribute("id", `sgst${value}`);
    row.childNodes[10].setAttribute("id", `igst${value}`);
    row.childNodes[11].setAttribute("id", `amt${value}`);
}