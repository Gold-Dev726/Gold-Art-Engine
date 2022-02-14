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
  const namePrefix = "BrainDancer";
  const description = "Genesis Collection #10101";
  const baseUri =
    "https://gateway.pinata.cloud/ipfs/QmUMK2u7kZ8GBnHjDGtiR327V2NGzazzb5sVNPt4DmmLKw";

  for (let i = 0; i < 10101; i++) {
    let tempMetadata = {
      name: `${namePrefix} #${i}`,
      description: description,
      image: baseUri,
      // image: `${baseUri}/${shortName}.png`,
      // attributes: tempAttributes,
    };
    fs.writeFileSync(
      `${buildDir}/json/${i}`,
      JSON.stringify(tempMetadata, null, 2)
    );
  }
};

buildSetup();
startCreating();
