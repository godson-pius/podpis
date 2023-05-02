
var signaturePad;
var loader = document.getElementById('loader')
var image = document.getElementById('image')
var create = document.getElementById('create')
var file = document.getElementById('file')
var pdf = document.getElementById('pdf')
var url;

/**
 * A DomContentLoaded event to create the podpis pad.
 */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("signa");
    signaturePad = new SignaturePad(canvas);
})

/**
 * An onclick event to clear podpis area
 */
document.getElementById('clear').addEventListener("click", () => {
    signaturePad.clear();
    image.src = "";
})

/**
 * Used for blob conversion.
 * @param {*} dataURL 
 * @returns Blob
 */
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

/**
 * Used to download the signed signature
 * @param {*} dataURL 
 * @param {string} filename 
 */
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

/**
 * Used to generate random strings
 * @param {Number} length - The length of text to generate
 * @returns Number
 */
function generateName(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/**
 * An onclick event for saving signed podpis
 */
document.getElementById('save').addEventListener("click", () => {
    if (signaturePad.isEmpty()) {
        alert("Signature is empty")
    } else {
        const name = prompt("Name signature");
        if (name != null) {
          const saved = `${name}-podpis-world-brain-technology-ltd`
          var dataURL = signaturePad.toDataURL();
          download(dataURL, saved);
          alert(`Signature saved as ${saved}.png`)
        } else {
          alert('File named saved automatically!')
          const generatedName = generateName(10);
          const saved = `${generatedName} podpis-world-brain-technology-ltd`
          var dataURL = signaturePad.toDataURL();
          download(dataURL, saved);
        }
        
    }
})

// create.addEventListener("click", () => {
//     var Url = signaturePad.toDataURL();
//     image.src = Url;
//     document.getElementById('imgContainer').style.display = "block";
//     document.getElementById('dropper').style.display = "block";
// })

// document.getElementById('import').addEventListener("click", () => {
//   file.click();
// })