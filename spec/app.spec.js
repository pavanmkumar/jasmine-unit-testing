const request  = require("request");
const {addOfTwoNumbers:addition} = require("../app");

//testing a sample addition function
describe("Checking addition of 2 numbers : ",()=>{
    it("add of a+b=c",()=>{
        let result = addition(5,4);
        console.log(result);
        expect(result).toEqual(9);
    })
})

describe("Handling unit test on Rest APIs",()=>{
    var server;
    beforeAll(()=>{
        server = require("../app")['app'];
    })
    afterAll(()=>{
        server.close();
    })
    describe("Unit test on GET /",()=>{
        let data = {};
        beforeAll(done=>{
            request.get("http://localhost:3000",(err,res,body)=>{
                data.status = res.statusCode;
                data.body = body;
                done();
            })
        })
        it("testing get",()=>{
            expect(data.status).toBe(200);
            expect(data.body).toBe("unit testing using jasmine");
        })
    })

    describe("1st Unit test on POST /",()=>{
        let data = {};
        beforeAll(done=>{
            let postData = {
                url: "http://localhost:3000/get-employee-role-by-name",
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({name:"person1"})
            }
            request.post(postData,(err,res,body)=>{
                data.status = res.statusCode;
                data.body = JSON.parse(body);
                done();
            })
        })
        it("testing post request",()=>{
            expect(data.status).toBe(200);
            expect(data.body.role).toBe("Developer");
        })
    })

    describe("2nd Unit test on POST /",()=>{
            it("testing post request",()=>{
                let postData = {
                    url: "http://localhost:3000/get-employee-role-by-name",
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({name:"person4"})
                }
                request.post(postData,(err,res,body)=>{
                    body = JSON.parse(body);
                    expect(res.statusCode).toBe(500);
                    expect(body.error).toBe("No employee with the given name");
                })
        })
    })

})