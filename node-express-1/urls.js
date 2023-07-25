const urls = require('./urls');

(async () => {
  const input = process.argv[2];

  if (!input) {
    throw new Error('Missing input file');
  }
    try{
    const output = await urls.getHtml('yahoo.com');
} catch (error) {
    console.log(error);  // Print error message
}


  console.log('HTML saved to ' + output);
})();
