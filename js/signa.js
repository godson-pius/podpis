
var signaturePad;
var loader = document.getElementById('loader')
var image = document.getElementById('image')
var create = document.getElementById('create')
var file = document.getElementById('file')
var pdf = document.getElementById('pdf')
var url;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("signa");
    signaturePad = new SignaturePad(canvas);
})

document.getElementById('clear').addEventListener("click", () => {
    signaturePad.clear();
    image.src = "";
})

document.getElementById('save').addEventListener("click", () => {
    if (signaturePad.isEmpty()) {
        alert("Signature is empty")
    } else {
        const name = prompt("Name signature");
        if (name) {
          var dataURL = signaturePad.toDataURL();
          download(dataURL, name);
        }
        alert(`Signature saved as ${name}.png`)
    }
})

const preview = (e) => {
  var filename = file.files[0]
  let fileExt = filename.name.split('.').pop();

  if (fileExt == 'docx' || fileExt == 'doc' || fileExt == 'xlsx') {
    alert(`Converting ${fileExt} to pdf...`)
    var formData = new FormData()
    //Adding required parameters
    formData.append("inputFile", filename);
    formData.append("outputFormat", "pdf");
    formData.append("conversionParameters", "{}");
    formData.append("async", "false");

    var request = new XMLHttpRequest();
    request.open('POST', 'https://api2.docconversionapi.com/jobs/create', true);
    request.responseType = 'json';

    //Please, paste your AppId and SecretKey values here
    request.setRequestHeader("X-ApplicationID", '15722f40-b900-4577-943c-d0160de057f8');
    request.setRequestHeader("X-SecretKey", 'b3a867c9-1334-4984-af63-ff3636b489a5');

    request.onload = function () {
        if (request.status == 200) {
          console.log(request)
          document.getElementById('pdf').src = request.response.outputFileName
        } else {
          alert('Could not convert')
        }
    }
    request.send(formData);
  } else {
    // document.getElementById('preview').src = URL.createObjectURL(filename)
  // document.getElementById('pdf').preventDefault();
  document.getElementById('pdf').src = URL.createObjectURL(filename)
  }
  
}

create.addEventListener("click", () => {
    var Url = signaturePad.toDataURL();
    image.src = Url;
    document.getElementById('imgContainer').style.display = "block";
    document.getElementById('dropper').style.display = "block";
})

document.getElementById('import').addEventListener("click", () => {
  file.click();
})

function download(dataURL, filename) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
      window.open(dataURL);
    } else {
      var blob = dataURLToBlob(dataURL);
      var url = window.URL.createObjectURL(blob);
  
      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;
  
      document.body.appendChild(a);
      a.click();
  
      window.URL.revokeObjectURL(url);
    }
  }

  function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
  
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
  
    return new Blob([uInt8Array], { type: contentType });
  }

  const btn = document.getElementById('convert').addEventListener('click', () => {
    loader.setAttribute('class', 'placeholder col-2 p-3 bg-success rounded-pill');
      var input = document.getElementById('fileInput').value;
      if (input === '') {
        alert('Provide file!')
      } else {
        var formData = new FormData();
        var inputFile = document.getElementById('fileInput').files[0];
    
        //Adding required parameters
        formData.append("inputFile", inputFile);
        formData.append("outputFormat", "pdf");
        formData.append("conversionParameters", "{}");
        formData.append("async", "false");
    
        var request = new XMLHttpRequest();
        request.open('POST', 'https://api2.docconversionapi.com/jobs/create', true);
        request.responseType = 'json';
    
        //Please, paste your AppId and SecretKey values here
        request.setRequestHeader("X-ApplicationID", '15722f40-b900-4577-943c-d0160de057f8');
        request.setRequestHeader("X-SecretKey", 'b3a867c9-1334-4984-af63-ff3636b489a5');
    
        request.onload = function () {
            if (request.status == 200) {
              loader.style.display = "none";
              var downloadLink = document.createElement('a');
              downloadLink.setAttribute('href', request.response.fileDownloadUrl);
              downloadLink.setAttribute('download', 'converted');
              downloadLink.setAttribute('class', 'border shadow btn btn-success border-light');
              downloadLink.innerHTML ='Dowload Converted File';
              document.getElementById('main').appendChild(downloadLink);
              console.log(request.response);
            } else {
              loader.removeAttribute('class');
              loader.setAttribute('class', 'col-2 text-light mt-3 p-3 bg-danger');
              loader.innerHTML = 'Could not convert';
            }
        }
    
        request.send(formData);
      }
  })


