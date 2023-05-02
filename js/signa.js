
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
 * An onclick event for saving signed podpis
 */
document.getElementById('save').addEventListener("click", () => {
    if (signaturePad.isEmpty()) {
        alert("Signature is empty")
    } else {
        const name = prompt("Name signature");
        if (name != null) {
          var dataURL = signaturePad.toDataURL();
          download(dataURL, name);
          alert(`Signature saved as ${name}.png`)
        } else {
          alert('File named automatically!')
          const generatedName = generateName(10);
          var dataURL = signaturePad.toDataURL();
          download(dataURL, generatedName);
        }
        
    }
})

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

// create.addEventListener("click", () => {
//     var Url = signaturePad.toDataURL();
//     image.src = Url;
//     document.getElementById('imgContainer').style.display = "block";
//     document.getElementById('dropper').style.display = "block";
// })

// document.getElementById('import').addEventListener("click", () => {
//   file.click();
// })