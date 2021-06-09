//sample addition function to do unit testing on
addOfTwoNumbers = (a,b)=>{
    return a+b;
}

// will use this data in one of the end points.
var employees = [
    {
        name:"person1",
        age:25,
        role:"Developer"
    },
    {
        name:"person2",
        age:28,
        role:"TL"
    },
    {
        name:"person3",
        age:32,
        role:"Manager"
    }
]

const express = require("express");
let server = express();
const port = 3000;
server.use(express.json())
server.get("/",(req,res)=>{
    res.status(200).send("unit testing using jasmine");
})

server.post("/get-employee-role-by-name",(req,res)=>{
    let {body : data} = req
    let employee = employees.filter(emp=> emp.name == data.name)
    if(employee[0])
        res.status(200).send({role:employees[0]["role"]});
    else
        res.status(500).send({error:"No employee with the given name"});
})

let app = server.listen(port,()=>{
    console.log(`listening at ${port}`);
})



module.exports = {
    addOfTwoNumbers,
    app
}