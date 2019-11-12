const owners = require('../../Backend/api/models/owner')
let mogooseConn = require('../../Backend/mongoose.js.js')
var dateforamt = require('dateformat')
const fs = require('fs')
const mongoose = require('mongoose')
// mogooseConn();

function handle_request(msg, callback){
  let filename = null
  let binaryData = null
  let base64String = null

  owners
    .find({
      email: msg.email
    })
    .then(results => {
      // let query= res[0].image;
      if (
        results[0].image === null ||
        results[0].image === [] ||
        typeof results[0].image === 'undefined'
      ) {
        console.log('No records found!')
      } else {
        console.log(results[0].image)
        console.log(__dirname.split('/services')[0] + '/public/profilepics/' + results[0].image);
        binaryData = fs.readFileSync(
          __dirname.split('/kafka-backend')[0] + '/Backend/public/profilepics/' + results[0].image
        )
        console.log(binaryData)
        base64String = new Buffer(binaryData).toString('base64')
        console.log('Successfully fetched data from DB')
        callback(null,base64String);
        // console.log(JSON.stringify(results[0]));
        // res.writeHead(200, {
        //   'Content-Type': 'image/png'
        // })
        // res.end(base64String)
      }
    })
    .catch(err => {
      console.log('Error occured while fetching image from DB.')
      callback(err,"Error");
    //   res.writeHead(400, {
    //     'Content-Type': 'text/plain'
    //   })
    //   res.end('Error occured while fetching data from DB')
    })
    // owners
    // .update(
    //   { email: msg.email },
    //   {
    //     $set: {
    //       address2: msg.address2,
    //       address1: msg.address1,
    //       phone: msg.phone
    //     }
    //   }
    // )
    // .then(response => {
    //   console.log('response' + response)
    //   callback(null,response);
    // })
    // .catch(err => {
    //   console.log('Error occured while upating contact details in DB' + err)
    //   callback(err,"Error");
    // })
        
}

exports.handle_request = handle_request;
