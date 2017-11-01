var express = require('express');
var router  = express.Router();
var multer  = require("multer");
var fs      = require('fs-extra');
var config  = require('../config.js');

function renderHomePage(err, renderData) {
  "use strict";
  var res = renderData.httpres;

  if (err) {
    res.send("query failed: " + err);
    return;
  }

  var dirList = fs.readdirSync(config.uploadRoot);
 
  res.render('index',
             {title : "Node Web Uploader",
              dirList : dirList});
}



/* GET home page. */
router.get('/', function (req, res, next) {
  renderHomePage(null, {httpres: res});
});

/* POST */
router.post('/uploadFiles', (req, res, next) => {
//console.log("HTTP POST parameters:");
  var status = "";
  var folder = "";
  var nFiles = 0;

  var tmpDest = config.uploadRoot + "/" + Date.now();

  var storage = multer.diskStorage({
    destination: tmpDest,
    filename   : function (req, file, cb) {
      console.log("Storing file: " + file.originalname);
      cb(null, file.originalname);
      nFiles++;
    }
  });

  var upload        = multer({ storage: storage });
  var uploadHandler = upload.array("filesToUpload", 100);
  var finalDest;

  uploadHandler(req, res, () => {

    if (nFiles === 0) {
      status = "Failed (no files)";
      fs.rmdirSync(tmpDest);
    } else if (req.body.destDir !== undefined && req.body.destDir !== "") {

      try {
        finalDest = config.uploadRoot + "/" + req.body.destDir;
        fs.renameSync(tmpDest, finalDest);
      } catch(e) {

        status = "Failed (cannot create folder: " + req.body.destDir + ")";
        finalDest = tmpDest;
      }
 
    } else {
      console.log("no destDir set");
      finalDest = tmpDest;
    }
   
    if (status === "") {
      status = "OK";
      folder = finalDest.substr(1);
    }
 
    res.render('uploaded', {status : status, folder : folder})
  });
});


/* POST */
router.post('/deleteDir', (req, res, next) => { 
  
  var foldersList = [];
  var htmlReport = [];
  
  foldersList = foldersList.concat(req.body.folderName);
 
  console.log(foldersList);
  
  if (foldersList !== undefined &&
      foldersList.length > 0) {
    foldersList.forEach( (d, i, l) => {
      var info = {};
      
      info.folder = d;
      
      try {
        fs.removeSync(config.uploadRoot + "/" + d); 
        info.error = undefined;
      } catch (e) {
        info.error = e;
      }
      htmlReport.push(info);
    });
  
    res.render("deleted", {info : htmlReport});
  }
});

module.exports = router;
