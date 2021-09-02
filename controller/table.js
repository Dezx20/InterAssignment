const mongoose = require("mongoose");
const { response } = require("../app");
const nodemailer = require("nodemailer");
// const { getMaxListeners } = require("../app");

const Table = mongoose.model("tableData");

//
const getTableData = async function(req, res) {
    try{
    let recievedData;
    console.log("get-data function!")
    recievedData = await Table.find({}).limit(20);
    res.status(200).render('index',{tableData:recievedData});
    }
    catch(err){
        return res.status(500).send(err);
    }  
}

const addTableData = async function({body}, res) {
    try{
        // console.log("add-table-data req!");
    let name = body.name;
    let phone_no = body.phone_number;
    let email = body.email;
    let hobbies = body.hobbies;
    if(name && phone_no && email && hobbies){
        const dataDict = {
            name: name,
            phoneNumber: phone_no,
            email: email,
            hobbies: hobbies
        } 
        body.origin && ( dataDict.origin = body.origin)
        await Table.create(dataDict, (err, data)=>{
            if(err)
                return res.status(500).send({error: err});
        });
        res.status(200).send("Data added successfully.")
    }else{
        res.status(201).send("All fields required.");
    }
    }
    catch(err){
        return res.status(500).send(err);
    }  
}

const updateTableData = async function(req, res) {
    try{
        let id = req.params.id;
        let name = req.body.name;
        let phone_no = req.body.phone_number;
        let email = req.body.email;
        let hobbies = req.body.hobbies;
        // console.log(req.body);
        if(name && phone_no && email && hobbies){
            const dataDict = {
                name: name,
                phoneNumber: phone_no,
                email: email,
                hobbies: hobbies
            } 
            // console.log(dataDict);
            await Table.findOneAndReplace({_id:id},dataDict);
            return res.status(200).send("data updated successfully.!");
        }else{
           return res.status(201).send("All fields required for updation.");
        }
        }
        catch(err){
            return res.status(500).send(err);
        }  

}

const removeTableData = async function(req, res) {
    try{
        // console.log("remove-data called!")
    let id = req.params.id;;
    await Table.findByIdAndRemove(id);

    res.status(200).send("data removed successfully.!");
    }
    catch(err){
        return res.status(500).send(err);
    }  
}

const sendTableData = async function(req, res) {
    try{
    var data =  req.body.id;
    if(data){
    // console.log("array check:");
    // console.log(data.constructor === Array)
    if(! (data.constructor === Array))
         data = data.split(',');
    var mssg='';
    for (index = 0; index < data.length; index++) {
        var id = data[index];
        var d = await Table.findById(id);
        mssg += 'S.No: ';
        mssg += index+1;
        mssg += ',Name: ';
        mssg += d.name;
        mssg += ',Phone No: ';
        mssg += d.phoneNumber;
        mssg += ',email: ';
        mssg += d.email;
        mssg += ',Hobbies: ';
        mssg += d.hobbies;
        mssg += '\n';
    }
    // console.log(mssg);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: '2009awektoppo@gmail.com',
        to: 'dezxlexz@gmail.com',
        subject: 'Table Details.',
        text: mssg

    };

    transporter.sendMail(mailOptions, (err, data)=> {
        if(err){
            console.log('Error occured: '+err);
        }else{
            console.log('send mail successfully!');
        }
    });
    return res.send("Mail Send..");
    }else{
        res.send("Nothing selected to send!!");
    }
    }
    catch(err){
        return res.status(500).send(err);
    }  
}


module.exports = {
    sendTableData,
    addTableData,
    updateTableData,
    removeTableData,
    getTableData,
};