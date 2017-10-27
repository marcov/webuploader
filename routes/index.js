var express = require('express');
var router  = express.Router();
var multer  = require("multer");
var fs      = require('fs');


function renderHomePage(err, renderData) {
  "use strict";
  var res = renderData.httpres;

  if (err) {
    res.send("query failed: " + err);
    return;
  }

  res.render('index',
             {title : "Node Web Uploader"});
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

  var tmpDest = './uploads/' + Date.now();

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
        finalDest = "./uploads/" + req.body.destDir;
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


module.exports = router;
