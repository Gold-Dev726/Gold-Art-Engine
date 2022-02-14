const basePath = process.cwd();
const fs = require("fs");

const buildDir = `${basePath}/build`;

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
};

const startCreating = async () => {
  let rawdata = fs.readFileSync(`${basePath}/json/_metadata.json`);
  let metadatas = JSON.parse(rawdata);

  for (let i = 0; i < metadatas.length; i++) {
    const attributes = metadatas[i].attributes;

    const tempAttributes = [];
    for (let j = 0; j < attributes.length; j++) {
      if (attributes[j].value !== "None") {
        tempAttributes.push(attributes[j]);
      }
    }

    metadatas[i].attributes = tempAttributes;

    // const data = {
    //   name: metadatas[i].name,
    //   edition: metadatas[i].edition,
    //   attributes: tempAttributes,
    // };

    fs.writeFileSync(
      `${basePath}/build/json/${i + 1}.json`,
      JSON.stringify(metadatas[i], null, 2)
    );
  }
};

buildSetup();
startCreating();
