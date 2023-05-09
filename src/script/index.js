const fs = require('fs/promises');
const zlib = require('zlib');

const zipcodeJa = require('zipcode-ja');

const main = async () => {
  for (let upper = 100000; upper < 999999; upper++) {
    const data = [];
    let hasData = false;
    for (let i = 0; i < 10; i++) {
      const d = zipcodeJa[`${upper}${i}`];
      if (d != null) {
        data[i] = d.address;
        hasData = true;
      } else {
        data[i] = [];
      }
    }

    if (!hasData) {
      continue;
    }
    // await fs.writeFile(
    //   `./node_modules/zipcode_gz/${('0000000' + upper).slice(-7)}.json.gz`,
    //   zlib.gzipSync(JSON.stringify(data)),
    // );

    fs.writeFile(`./node_modules/zipcode_gz/${('000000' + upper).slice(-6)}.json`, JSON.stringify(data));
    console.log(upper);
  }
};

main();
