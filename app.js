const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "public"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//object that contains all details of the user
let user = {
    username: "Daman",
    company_name: "DA Inc.",
    country: "INDIA",
    address: "2940B, Sunny Lane",
    city: "RAJPURA",
    state: "PUNJAB",
    pin_code: "140401",
    company_phone: "8558045416",
    email: "daman.asij@gmail.com",
    website: "www.gmail.com",
    gstin: "123415",
    logo: null,
}

//an array of key value pairs of states in india
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
]


//get routes
app.get("/", (req, res) => {
    res.render("about");
});

app.get("/signup", (req, res) => {
    res.render("signup", {states : states});
});
 
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/bills/new", (req, res) => {
    invoiceNo = Date + "0001";
    res.render("newBill",{user: user, states: states, invoiceNo: invoiceNo});
});


app.get("*", (req, res) => {
    res.send("404 Page Not Found.");
});


//post routes
app.post("/newUser", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


app.listen(3000, () => {
    console.log(`Server is started`);
});