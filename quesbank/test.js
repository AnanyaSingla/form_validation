PDFDocument = require ('pdfkit');
blobStream  = require ('blob-stream');
 
// create a document the same way as above 
doc = new PDFDocument();
 
//pipe the document to a blob 
stream = doc.pipe(blobStream());
 
// add your content to the document here, as usual 
 
// get a blob when you're done 
doc.end();
stream.on ('finish');//, ->
  // get a blob you can do whatever you like with 
  blob = stream.toBlob('application/pdf');
 
  // or get a blob URL for display in the browser 
  url = stream.toBlobURL('application/pdf');
  iframe.src = url;