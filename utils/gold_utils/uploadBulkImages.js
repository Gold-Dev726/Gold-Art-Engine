const path = require("path");
const basePath = process.cwd();
const fs = require("fs");
const axios = require("axios").default;

fs.readdirSync(`${basePath}/build/images`).forEach((file) => {
  // const fileStream = fs.createReadStream(`${basePath}/build/images/${file}`);
  let rawdata = fs.readFileSync(`${basePath}/build/images/${file}`);
  // fs.readFile(`${basePath}/build/images/${file}`).then((err, data) => {
  const fileObj = {
    path: `images/${file}`,
    content: rawdata.toString("base64"),
  };

  console.log(fileObj);

  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", fileObj, {
      headers: {
        "X-API-KEY":
          "H6vdLlBuEn70txDxH8fqYqldDM5bgLhbZPqEHlx4NokiU9koQ2jvWiA5eOMuVeNO",
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then(function (response) {
      const json = response.data;
      const fileName = path.parse(json.file_name).name;
      let rawdata = fs.readFileSync(`${basePath}/build/json/${fileName}.json`);
      let metadata = JSON.parse(rawdata);

      metadata.image = json.ipfs_url;

      fs.writeFileSync(
        `${base}/build/json/${fileName}.json`,
        JSON.stringify(metadata, null, 2)
      );

      console.log(`${json.file_name} uploaded & ${fileName}.json updated!`);
    })
    .catch(function (error) {
      console.error(error);
    });
});
