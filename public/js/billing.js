/*-------------------------------------------------------------------------------------------
|               Constants and initial statements necessary for table selection               |
--------------------------------------------------------------------------------------------*/

document.getElementById("igstTable").style.display = "none";
document.getElementById("recieverState").value = document.getElementById("userState").innerHTML;
let sgstSerialNo = 0;
let igstSerialNo = 0;
let taxRates = null;
let nonDigitsRegex = /[^0-9\.]/g;
let digitsRegex = /^[0-9]+\.?[0-9]*$/;
const dangerClass = "alert alert-danger";
const successClass = "alert alert-success";
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

function checkDec(el){
    var ex = /^[0-9]+\.?[0-9]*$/;
    if(ex.test(el.value)==false){
      el.value = el.value.substring(0,el.value.length - 1);
     }
   }
/*-----------------------------------------------------------------------
|               Generic Functions(Not related to billing)               |
-----------------------------------------------------------------------*/
const displayMessage = (msgString, classValue) => {
    let timeout = 2000;
    let messageDiv = document.getElementById("message");
    messageDiv.innerHTML = `<center>${msgString}</center>`;
    messageDiv.className = classValue;
    messageDiv.style.display = "block";
    let coords = messageDiv.getBoundingClientRect();
    window.scrollTo(0, 0);
    // window.alert(msgString);
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, timeout);
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}

const isNullOrUndefined = (reference) => {
    if(reference === undefined || reference === null)
        return 1;
    return 0;
}


/*-----------------------------------------------------------------------
|           Generic Functions(Related to billing)                       |
-----------------------------------------------------------------------*/

const isValidDescription = (rowRef) => {
    let desc = rowRef.childNodes[1].firstChild;
    if(desc.value == ""){
        alert("Description is empty");
        desc.focus();
        return false;
    }
    return true;
}

const billSelector = () =>{
    userState = document.getElementById("userState").innerHTML;
    recieverState = document.getElementById("recieverState").value;
    if(userState != recieverState){
        document.getElementById("sgstTable").style.display = "none";
        document.getElementById("igstTable").style.display = "block";
    }
    else{
        document.getElementById("sgstTable").style.display = "block";
        document.getElementById("igstTable").style.display = "none";
    }
}

const setHsn = (rowRef) => {
    let hsn = rowRef.childNodes[2].firstChild;
    if(!((hsn.value == "") || (hsn.value.length == 2) || (hsn.value.length == 4) || (hsn.value.length == 8))){
        alert("Invalid HSN code.");
    }
}

const setQty = (rowRef, type) => {
    let qty = rowRef.childNodes[3].firstChild;
    if(isNaN(qty.value)){
        qty.value = qty.value.replace(nonDigitsRegex, "");
        if(qty.value.split('.').length > 2)
            qty.value = qty.value.replace(/\.+$/, "");
        if(isNaN(qty.value))
            qty.value = 0;
    }
    if(qty.value != ""){
        qty.value = parseInt(qty.value);
        if(type == "sgst")
            sgstCalculator(rowRef);
        else if(type == "igst")
            igstCalculator(rowRef);
    }
    
}

const setDiscount = (rowRef, type) => {
    let discount = rowRef.childNodes[6].firstChild;

    if(isNaN(discount.value)){
        discount.value = discount.value.replace(nonDigitsRegex, "");
        if(discount.value.split('.').length > 2)
            discount.value = discount.value.replace(/\.+$/, "");
        if(isNaN(discount.value))
            discount.value = 0;
    }

    if(discount.value > 100){
        alert("Discount can't be greater than 100");
        let val = parseInt(discount.value);
        discount.value = (val / 10) - (val % 10)/10;
    }
    if(discount.value != ""){
        if(type == "sgst")
            sgstCalculator(rowRef);
        else if(type == "igst")
            igstCalculator(rowRef);
    }
}

const setTaxRate = (rowRef, index, type) => {
    let taxRate = rowRef.childNodes[index].firstChild;
    if(taxRate.value == "-" || taxRate.value < 0){
        taxRate.value = 0;
    }
    let maxTaxRate = 0;
    if(type == "cgst" || type == "sgst") {
        if(taxRate.value > 15){
            alert("Tax Rate (CGST) can't be more than 15% as Total tax (CGST + SGST) can't be greater than 30%.")
            let val = parseInt(taxRate.value);
            taxRate.value = (val / 10) - (val % 10)/10;
        }
    } else {
        if(taxRate.value > 30){
            alert("Tax Rate (IGST) can't be more than 30%.")
            let val = parseInt(taxRate.value);
            taxRate.value = (val / 10) - (val % 10)/10;
        }
    }
    if(isNaN(taxRate.value)){
        taxRate.value = taxRate.value.replace(nonDigitsRegex, "");
        if(taxRate.value.split('.').length > 2)
            taxRate.value = taxRate.value.replace(/\.+$/, "");
        if(isNaN(taxRate.value))
            taxRate.value = 0;
    }
    if(taxRate.value != ""){
        if(type == "sgst")
            sgstCalculator(rowRef);
        else
            igstCalculator(rowRef);
    }
}

const setRatePerItem = (rowRef, type) => {
    let ratePerItem = rowRef.childNodes[5].firstChild;    
    if(isNaN(ratePerItem.value)){
        ratePerItem.value = ratePerItem.value.replace(nonDigitsRegex, "");
        if(ratePerItem.value.split('.').length > 2)
            ratePerItem.value = ratePerItem.value.replace(/\.+$/, "");
        if(isNaN(ratePerItem.value))
            ratePerItem.value = 0;
    }

    if(ratePerItem.value == "-" || ratePerItem.value < 0){
        ratePerItem.value = 0;
    }
    if(ratePerItem.value > 10000000){
        alert("Can't generate tax on an amount of 10M in one single entity");
        let val = parseInt(ratePerItem.value);
        ratePerItem.value = (val / 10) - (val % 10)/10;
    }
    if(ratePerItem.value != ""){
        if(type == "sgst")
            sgstCalculator(rowRef);
        else
            igstCalculator(rowRef);
    }
}

const isValidBuyer = () => {
    let name = document.getElementById("recieverName");
    let gstin = document.getElementById("recieverGSTIN");
    let address = document.getElementById("recieverAddress");
    let city = document.getElementById("recieverCity");
    let pin = document.getElementById("recieverPin");

    if(name.value == ""){
        window.alert("Recipient's name can't be empty!");
        name.focus();
        return false;
    }
    if(!isNaN(name.value)){
        alert("Recipient's name can't contain a number.")
        name.focus();
        return false;
    }
    if(name.value.length > 40){
        name.value = name.value.replace(/^([a-zA-Z0-9]){3,5}$/);
        name.focus();
        return false;
    }
    if(gstin.value == ""){
        alert("Recipient's GSTIN can't be empty!");
        gstin.focus();
        return false;
    }
    if(gstin.value.length != 15){
        alert("Invalid recipient GSTIN");
        gstin.focus();
        return false;
    }
    if(address.value == ""){
        alert("Invalid recpient's address.");
        address.focus();
        return false;
    }
    if(city.value == ""){
        alert("Invalid city name.");
        city.focus();
        return false;
    }
    if(pin.value.length != 6 || pin.value == ""){
        alert("Invalid pin.");
        pin.focus();
        return false;
    }
    return true;
}

const sendToServer = (billObject) => {
    let bill = JSON.stringify(billObject);
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/bills", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function() {
        if(this.status == 200){
            if(this.responseText == "OK"){
                alert("Bill submitted to server");
            }
        }
    }
    xhr.send(bill);
}


/*--------------------------------------------------------------------------------
|           Functions for CGST + SGST calculation, updation and deletion         |
--------------------------------------------------------------------------------*/

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
    newHsnInput.setAttribute("onblur", `setHsn(${rowId})`);
    newHsnInput.className = "form-control";
    newHsnCell.appendChild(newHsnInput);

    // ADDING QUANTITY FIELD
    let newQtyCell = document.createElement("td");
    let newQtyInput = document.createElement("input");
    newQtyInput.setAttribute("type", "text");
    newQtyInput.setAttribute("oninput", `setQty(${rowId}, "sgst")`);
    newQtyInput.setAttribute("onblur", `sgstCalculator(${rowId})`);
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
    newRateInput.setAttribute("oninput", `setRatePerItem(${rowId}, "sgst")`);
    newRateInput.setAttribute("onblur", `sgstCalculator(${rowId})`);    
    newRateInput.setAttribute("size", "35");
    newRateInput.className = "form-control";
    newRateCell.appendChild(newRateInput);

    // ADDING DISCOUNT FIELD
    let newDiscountCell = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.setAttribute("size", "1");
    newDiscountInput.setAttribute("oninput", `setDiscount(${rowId}, "sgst")`);
    newDiscountInput.setAttribute("onblur", `sgstCalculator(${rowId})`);
    newDiscountInput.className = "form-control decimal";
    newDiscountCell.appendChild(newDiscountInput);

    let newTaxCell = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.setAttribute("size", "30");
    newTaxInput.setAttribute("disabled", true);   
    newTaxInput.className = "form-control";
    newTaxCell.appendChild(newTaxInput);

    let newCgstRateCell = document.createElement("td");
    let newCgstRateInput = document.createElement("input");
    newCgstRateInput.setAttribute("type", "text");
    newCgstRateInput.setAttribute("size", "10");
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
    newNetAmtInput.setAttribute("disabled", true);
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

    document.getElementById("sgstSubmit").disabled = false;
}

const deleteSgstItem = (rowReference) => {
    let sgstTableBody = document.getElementById("sgstTableBody");
    sgstTableBody.removeChild(rowReference);
    sgstSerialNo--;
    setSgstIds();
    if(sgstSerialNo == 0){
        document.getElementById("sgstSubmit").disabled = true;        
    }
    populateSgstValues();    
}

const setSgstIds = () => {
    let sgstTableBody = document.getElementById("sgstTableBody");
    for(let i = 0; i < sgstTableBody.childElementCount; i++){
        let rowRef = `sgstrow${i + 1}`;
        sgstTableBody.childNodes[i].id = rowRef;
        sgstTableBody.childNodes[i].childNodes[0].innerText = i + 1;
        sgstTableBody.childNodes[i].childNodes[2].firstChild.setAttribute('onblur', `setHsn(${rowRef})`);

        // FOR QUANITITY CELLS
        sgstTableBody.childNodes[i].childNodes[3].firstChild.setAttribute('oninput', `setQty(${rowRef}, "sgst")`);
        sgstTableBody.childNodes[i].childNodes[3].firstChild.setAttribute('onblur', `sgstCalculator(${rowRef})`);

        // FOR RATE PER ITEM CELLS
        sgstTableBody.childNodes[i].childNodes[5].firstChild.setAttribute('oninput', `setRatePerItem(${rowRef}, "sgst")`);
        sgstTableBody.childNodes[i].childNodes[5].firstChild.setAttribute('onblur', `sgstCalculator(${rowRef})`);

        // FOR DISCOUNT CELLS
        sgstTableBody.childNodes[i].childNodes[6].firstChild.setAttribute('oninput', `setDiscount(${rowRef}, "sgst")`);
        sgstTableBody.childNodes[i].childNodes[6].firstChild.setAttribute('onblur', `sgstCalculator(${rowRef})`);

        // FOR CGST TAX CELLS
        sgstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('oninput', `setTaxRate(${rowRef}, 8, "sgst")`);
        sgstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('onblur', `sgstCalculator(${rowRef})`);

        // FOR DELETE CELLS
        sgstTableBody.childNodes[i].childNodes[13].firstChild.setAttribute('onclick', `deleteSgstItem(${rowRef})`);
           
    }
}

const sgstCalculator = (rowRef) => {
    let quantity       = rowRef.childNodes[3].firstChild;
    let ratePerItem    = rowRef.childNodes[5].firstChild;
    let discount       = rowRef.childNodes[6].firstChild;
    let taxableValue   = rowRef.childNodes[7].firstChild;
    let cgstRate       = rowRef.childNodes[8].firstChild;
    let cgstAmt        = rowRef.childNodes[9].firstChild;
    let sgstRate       = rowRef.childNodes[10].firstChild;
    let sgstAmt        = rowRef.childNodes[11].firstChild;
    let netAmt         = rowRef.childNodes[12].firstChild;

    // Default values for each field
    if(quantity.value == "")
        quantity.value = 1;
    if(discount.value == "")
        discount.value = 0;
    if(cgstRate.value == "")
        cgstRate.value = 0;
    if(ratePerItem.value == "")
        ratePerItem.value = 0;

    sgstRate.value = cgstRate.value;

    taxableValue.value = roundTo(quantity.value * (ratePerItem.value * (1 - discount.value/100 )), 2);
    cgstAmt.value = roundTo(taxableValue.value*(cgstRate.value)/100, 2);
    sgstAmt.value = roundTo(taxableValue.value*(sgstRate.value)/100, 2);
    netAmt.value = roundTo(parseFloat(cgstAmt.value) + parseFloat(sgstAmt.value) + parseFloat(taxableValue.value), 2 );
    populateSgstValues();
}

const populateSgstValues = () => {
    let table = document.getElementById("sgstTableBody");
    let taxableTotal = document.getElementById("sgstTotalTaxable");
    let taxTotal = document.getElementById("sgstTotalTax");
    let invoiceTotal = document.getElementById("sgstInvoiceTotal");
    let totalGross = 0;
    let totalTax = 0;
    let totalNet = 0;

    for(let i = 0; i < table.childElementCount; i++){
        let row = table.childNodes[i];
        if(row.childNodes[7].firstChild.value !=  "")
            totalGross += parseFloat(row.childNodes[7].firstChild.value);
        if(row.childNodes[8].firstChild.value != "")
            totalTax += parseFloat(row.childNodes[9].firstChild.value);
        if(row.childNodes[12].firstChild.value != "")
            totalNet += parseFloat(row.childNodes[12].firstChild.value);
    }
    taxableTotal.value = totalGross;
    taxTotal.value = totalTax*2;
    invoiceTotal.value = totalNet;
}

const isSgstValid = () => {
    if(!isValidBuyer()){
        return false;
    }
    let table = document.getElementById("sgstTableBody");
    if(table.childElementCount == 0){
        alert("Can't submit empty reciept");
        return false;
    }
    let n = table.childElementCount;
    for(let i = 0; i < n; i++){
        let rowRef = table.childNodes[i];
        if(!isValidDescription(rowRef)){
            return false;
        }
        setHsn(rowRef);
        sgstCalculator(rowRef);
    }
    let invoiceTotal = document.getElementById("sgstInvoiceTotal");
    if(invoiceTotal.value == 0){
        alert("Can't submit bill with empty total invoice amount.");
        return false;
    }
    return window.confirm("Are you sure the data is correct?");
}

const generateSgstBill = () =>{
    // VALIDATE ALL FIELDS
    if(!isSgstValid()){
        return;
    }

    let user = {
        company_name: document.getElementById("userCompanyName").innerHTML,
        gstin: document.getElementById("userGstin").innerHTML,
        city: document.getElementById("userCity").innerHTML,
        pin: document.getElementById("userPin").innerHTML,
        state: document.getElementById("userState").innerHTML,
        country: document.getElementById("userCountry").innerHTML
    }
    // INVOICE DATES AND TIMES ARE ADDED BY tHE SERVER
    let invoice = {
        type: "intra-state",
    }
    let items = [];
    let table = document.getElementById("sgstTableBody");
    for(let i = 0; i < table.childElementCount; i++) {
        let row = table.childNodes[i];
        let item = {};
        item["sr"] = row.childNodes[0].innerHTML;
        item["description"] = row.childNodes[1].firstChild.value;
        item["hsn"] = row.childNodes[2].firstChild.value;
        item["quantity"] = row.childNodes[3].firstChild.value;
        item["unit"] = row.childNodes[4].firstChild.value;
        item["ratePerItem"] = row.childNodes[5].firstChild.value;
        item["discount"] = row.childNodes[6].firstChild.value;
        item["taxableValue"] = row.childNodes[7].firstChild.value;
        item["cgstRate"] = row.childNodes[8].firstChild.value;
        item["cgstAmount"] = row.childNodes[9].firstChild.value;
        item["sgstRate"] = row.childNodes[10].firstChild.value;
        item["sgstAmount"] = row.childNodes[11].firstChild.value;
        item["netAmount"] = row.childNodes[12].firstChild.value;
        items.push(item);
    }
    let totals = {
        total_taxable_amount: document.getElementById("sgstTotalTaxable").value,
        total_tax: document.getElementById("sgstTotalTax").value,
        invoice_total: document.getElementById("sgstInvoiceTotal").value,
    }
    let bill = {
        user: user,
        invoice: invoice,
        items: items,
        totals: totals
    }
    sendToServer(bill);
}

/*-------------------------------------------------------------------------
|           Functions for IGST calculation, updation and deletion         |
-------------------------------------------------------------------------*/

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
    newHsnInput.setAttribute("onblur", `setHsn(${rowId})`);
    newHsnInput.className = "form-control";
    newHsnInput.setAttribute("size", "30");    
    newHsnCell.appendChild(newHsnInput);

    // ADDING QUANTITY FIELD
    let newQtyCell = document.createElement("td");
    let newQtyInput = document.createElement("input");
    newQtyInput.setAttribute("type", "text");
    newQtyInput.setAttribute("oninput", `setQty(${rowId}, "igst")`);
    newQtyInput.setAttribute("onblur", `igstCalculator(${rowId})`);
    newQtyInput.className = "form-control";
    newQtyInput.setAttribute("size", "30");
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
    newRateInput.setAttribute("oninput", `setRatePerItem(${rowId}, "igst")`);
    newRateInput.setAttribute("onblur", `igstCalculator(${rowId})`);   
    newRateInput.setAttribute("size", "35");    
    newRateInput.className = "form-control";
    newRateCell.appendChild(newRateInput);

    let newDiscountCell = document.createElement("td");
    let newDiscountInput = document.createElement("input");
    newDiscountInput.setAttribute("type", "text");
    newDiscountInput.setAttribute("size", "2")  
    newDiscountInput.setAttribute("oninput", `setDiscount(${rowId}, "igst")`);
    newDiscountInput.setAttribute("onblur", `igstCalculator(${rowId})`);
    newDiscountInput.className = "form-control";
    newDiscountCell.appendChild(newDiscountInput);

    let newTaxCell = document.createElement("td");
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.setAttribute("size", "30");
    newTaxInput.setAttribute("disabled", true);       
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
    newNetAmtInput.setAttribute("size", "90");
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

    document.getElementById("igstSubmit").disabled = false;   
}

const deleteIgstItem = (rowReference) => {
    let igstTableBody = document.getElementById("igstTableBody");
    igstTableBody.removeChild(rowReference);
    igstSerialNo--;
    setIgstIds();
    if(igstSerialNo == 0){
        document.getElementById("igstSubmit").disabled = true;        
    }
    populateIgstValues();
}

const setIgstIds = () => {
    let igstTableBody = document.getElementById("igstTableBody");
    for(let i = 0; i < igstTableBody.childElementCount; i++){
        let rowRef = `igstrow${i + 1}`;
        igstTableBody.childNodes[i].id = rowRef;
        igstTableBody.childNodes[i].childNodes[0].innerText = i + 1;
        igstTableBody.childNodes[i].childNodes[2].firstChild.setAttribute('onblur', `setHsn(${rowRef})`);

        // FOR QUANITITY CELLS
        igstTableBody.childNodes[i].childNodes[3].firstChild.setAttribute('oninput', `setQty(${rowRef}, "igst")`);
        igstTableBody.childNodes[i].childNodes[3].firstChild.setAttribute('onblur', `igstCalculator(${rowRef})`);

        // FOR RATE PER ITEM CELLS
        igstTableBody.childNodes[i].childNodes[5].firstChild.setAttribute('oninput', `setRatePerItem(${rowRef}, "igst")`);
        igstTableBody.childNodes[i].childNodes[5].firstChild.setAttribute('onblur', `igstCalculator(${rowRef})`);

        // FOR DISCOUNT CELLS
        igstTableBody.childNodes[i].childNodes[6].firstChild.setAttribute('oninput', `setDiscount(${rowRef}, "igst")`);
        igstTableBody.childNodes[i].childNodes[6].firstChild.setAttribute('onblur', `igstCalculator(${rowRef})`);

        // FOR IGST TAX CELLS
        igstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('oninput', `setTaxRate(${rowRef}, 8, "igst")`);
        igstTableBody.childNodes[i].childNodes[8].firstChild.setAttribute('onblur', `igstCalculator(${rowRef})`);

        // FOR DELETE CELLS
        igstTableBody.childNodes[i].childNodes[11].firstChild.setAttribute('onclick', `deleteIgstItem(${rowRef})`);
    }
}

const igstCalculator = (rowRef) => {
    let quantity       = rowRef.childNodes[3].firstChild;
    let ratePerItem    = rowRef.childNodes[5].firstChild;
    let discount       = rowRef.childNodes[6].firstChild;
    let taxableValue   = rowRef.childNodes[7].firstChild;
    let igstRate       = rowRef.childNodes[8].firstChild;
    let igstAmt        = rowRef.childNodes[9].firstChild;
    let netAmt         = rowRef.childNodes[10].firstChild;

    // Default values for each field
    if(quantity.value == "")
        quantity.value = 1;
    if(discount.value == "")
        discount.value = 0;
    if(igstRate.value == "")
        igstRate.value = 0;
    if(ratePerItem.value == "")
        ratePerItem.value = 0;

    taxableValue.value = roundTo(quantity.value * (ratePerItem.value * (1 - discount.value/100 )), 2);
    igstAmt.value = roundTo(taxableValue.value*(igstRate.value)/100, 2);
    netAmt.value = roundTo(parseFloat(igstAmt.value) + parseFloat(taxableValue.value), 2 );
    populateIgstValues();
}

const populateIgstValues = () => {
    let table = document.getElementById("igstTableBody");
    let taxableTotal = document.getElementById("igstTotalTaxable");
    let taxTotal = document.getElementById("igstTotalTax");
    let invoiceTotal = document.getElementById("igstInvoiceTotal");
    let totalGross = 0;
    let totalTax = 0;
    let totalNet = 0;

    for(let i = 0; i < table.childElementCount; i++){
        let row = table.childNodes[i];
        if(row.childNodes[7].firstChild.value !=  "")
            totalGross += parseFloat(row.childNodes[7].firstChild.value);
        if(row.childNodes[8].firstChild.value != "")
            totalTax += parseFloat(row.childNodes[9].firstChild.value);
        if(row.childNodes[10].firstChild.value != "")
            totalNet += parseFloat(row.childNodes[10].firstChild.value);
    }
    taxableTotal.value = totalGross;
    taxTotal.value = totalTax;
    invoiceTotal.value = totalNet;
}

const isIgstValid = () => {
    if(!isValidBuyer()){
        return false;
    }
    let table = document.getElementById("igstTableBody");
    if(table.childElementCount == 0){
        alert("Can't submit empty reciept");
        return false;
    }
    let n = table.childElementCount;
    for(let i = 0; i < n; i++){
        let rowRef = table.childNodes[i];
        if(!isValidDescription(rowRef)){
            return false;
        }
        setHsn(rowRef);
        igstCalculator(rowRef);
    }
    invoiceTotal = document.getElementById("igstInvoiceTotal");
    if(invoiceTotal.value == 0){
        alert("Can't submit bill with empty total invoice amount.");
        return false;
    }
    return window.confirm("Are you sure the data is correct?");
}

const generateIgstBill = () =>{
    // VALIDATE ALL FIELDS
    if(!isIgstValid()){
        return;
    }

    let user = {
        company_name: document.getElementById("userCompanyName").innerHTML,
        gstin: document.getElementById("userGstin").innerHTML,
        city: document.getElementById("userCity").innerHTML,
        pin: document.getElementById("userPin").innerHTML,
        state: document.getElementById("userState").innerHTML,
        country: document.getElementById("userCountry").innerHTML
    }
    // INVOICE DATES AND TIMES ARE ADDED BY tHE SERVER
    let invoice = {
        type: "inter-state",
    }
    let items = [];
    let table = document.getElementById("igstTableBody");
    for(let i = 0; i < table.childElementCount; i++) {
        let row = table.childNodes[i];
        let item = {};
        item["sr"] = row.childNodes[0].innerHTML;
        item["description"] = row.childNodes[1].firstChild.value;
        item["hsn"] = row.childNodes[2].firstChild.value;
        item["quantity"] = row.childNodes[3].firstChild.value;
        item["unit"] = row.childNodes[4].firstChild.value;
        item["ratePerItem"] = row.childNodes[5].firstChild.value;
        item["discount"] = row.childNodes[6].firstChild.value;
        item["taxableValue"] = row.childNodes[7].firstChild.value;
        item["igstRate"] = row.childNodes[8].firstChild.value;
        item["igstAmount"] = row.childNodes[9].firstChild.value;
        item["netAmount"] = row.childNodes[10].firstChild.value;
        items.push(item);
    }
    let totals = {
        total_taxable_amount: document.getElementById("igstTotalTaxable").value,
        total_tax: document.getElementById("igstTotalTax").value,
        invoice_total: document.getElementById("igstInvoiceTotal").value,
    }
    let bill = {
        user: user,
        invoice: invoice,
        items: items,
        totals: totals
    }
    sendToServer(bill);
}