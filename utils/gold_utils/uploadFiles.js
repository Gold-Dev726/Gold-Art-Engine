const FormData = require("form-data");
const fetch = require("node-fetch");
const path = require("path");
const basePath = process.cwd();
const fs = require("fs");
const axios = require("axios").default;

fs.readdirSync(`${basePath}/build/images`).forEach((file) => {
  const formData = new FormData();
  const fileStream = fs.createReadStream(`${basePath}/build/images/${file}`);
  formData.append("file", fileStream);

  let url = "https://api.nftport.xyz/v0/files";

  let options = {
    method: "POST",
    headers: {
      Authorization: "84737637-b0b5-4f51-b333-480f352e0489",
    },
    body: formData,
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
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
    .catch((err) => console.error("error:" + err));

  // let options = {
  //   method: "POST",
  //   url: "https://api.nftport.xyz/v0/files",
  //   headers: {
  //     Authorization: "84737637-b0b5-4f51-b333-480f352e0489",
  //   },
  //   data: formData,
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     const json = response.data;
  //     const fileName = path.parse(json.file_name).name;
  //     let rawdata = fs.readFileSync(`${basePath}/build/json/${fileName}.json`);
  //     let metadata = JSON.parse(rawdata);

  //     metadata.image = json.ipfs_url;

  //     fs.writeFileSync(
  //       `${base}/build/json/${fileName}.json`,
  //       JSON.stringify(metadata, null, 2)
  //     );

  //     console.log(`${json.file_name} uploaded & ${fileName}.json updated!`);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
});
