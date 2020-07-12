const express = require('express');
const app = express();

const cors = require('cors')

app.use(cors())
app.use(express.json())

// const path = require('path'); //built-in
const request = require('request');
// const bodyParser = require('body-parser'); //built-in, post request
// const cors = require('cors')
const fs = require("fs");
const axios = require("axios");
const { resolve } = require('path');
const { rejects } = require('assert');

const PIC_FILE_NAME = 'picturesListFile'
const PICSUM_URL = 'https://picsum.photos/v2/list'

var picturesList = []
var currentPage = 0
// post request
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))

//Serving Files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'node_modules')));



// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//Servind Data
app.get('/', async (req, res) => {
    console.log("Someone has come into the server");
    try {
        if (fs.existsSync(`${PIC_FILE_NAME}.jsonj`)) {
            //check if the file exist and if he have the pictures
            console.log("The file exists.");
            
            fs.readFileSync(`${PIC_FILE_NAME}.json`, function(err, data) {
                if(data == '' /*|| data.toJSON == []*/) {
                    console.log("the file is empty :-(");
                    //need to fill the file in pic
                }
                else {
                    // console.log(data.toString());
                    let dd = JSON.parse(data);
                    console.log(dd)
                }
            });

        } else {
            //create a new file to save the pictures
            console.log('The file does not exist.');

            await createPicFile()
            //need to fill the file in pic
            // getPicturesFromPicsum()
            await fetchFromPicsum()
            .then(data => console.log("data: ", data))
            // console.log("pictureList: ", picturesList) 

        }
    } catch (err) {
        console.error(err);
    }
    
   
    res.json(picturesList);
    // .then(res => res.json())
    // .then(picArray => picArray.forEach(element => {
        // let { id , download_url } = element
        // let pic = new Picture;
        // pic.id = id;
        // pic.src = download_url;
        // pic.likeNum = 0;
        // picturesList.push(pic);
    // })),
    // res.send("Hello from server")
    // console.log(picturesList)
    // res.json(picturesList);
})


// function getPicturesFromPicsum() {
//         console.log("get pics")
//         request.get(`${PICSUM_URL}?page=${currentPage}`, function (error, response, body) {
        
//         if (!error && response.statusCode == 200) {

//             let picArray = JSON.parse(body)            
//             picArray.forEach(element => {
//                 console.log(element)
//                 let { id , download_url } = element
//                 let pic = {};
//                 pic.id = id;
//                 pic.download_url = download_url;
//                 pic.likeNum = 0;
//                 picturesList.push(pic);
//             })
//             picturesList = picArray
//             console.log(picturesList);
//             console.log(picArray);
//         }
        
//     });
// }

function fetchFromPicsum() {
    return new Promise ((resolve, reject) => {
            request.get(`${PICSUM_URL}?page=${currentPage}`, function (error, response, body) {
                console.log("-------------------------");
                // console.log(body);
                resolve(body);
                // if (error) {
                //     reject(error)
                // }

        
                // if (!error && response.statusCode == 200) {
                //     let picArray = JSON.parse(body)            
                //     picArray.forEach(element => {
                //         console.log(element)
                //         let { id , download_url } = element
                //         let pic = {};
                //         pic.id = id;
                //         pic.download_url = download_url;
                //         pic.likeNum = 0;
                //         picturesList.push(pic);
                //     })
                //     picturesList = picArray
                //     console.log(picturesList);
                //     console.log(picArray);
                //     resolve(body)
                // } else {
                //     reject(error)
                // }
                
            });
    })
}

function createPicFile() {
    return new Promise((resolve, reject) => {
        try {
            fs.appendFile(`${PIC_FILE_NAME}.json`, '' , function (error) {
                if (error) 
                    throw error;
                resolve('Created new pictures file!');
              });
        } catch(err) {
            reject(err)
        }
    })  
}

// app.get('/countries', function (req, res) {
//     let countries;
//     request.get('https://restcountries.eu/rest/v2/all', function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             // console.log(body) // Show the HTML for the Google homepage. 
//             console.log('Countries')
//             countries = JSON.parse(body)
//         }
//         //console.log("countries from the server");
//         res.send(countries);
//     });
// })

// app.post('/saveCustomerDetails', function (req, res) {
//     const customerDetails = req.body;
//     console.log(customerDetails)
//     if (customerDetails.firstName == "" ||
//         customerDetails.lastName == "" ||
//         customerDetails.country == "" ||
//         customerDetails.email == "") {
//         res.send('400');
//     } else {
//         customerList.push(customerDetails);
//         res.send('200');
//     }
// })

const port = 8000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})