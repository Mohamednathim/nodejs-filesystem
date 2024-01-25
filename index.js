import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const Port = 5000;

app.use(express.json());

const folderPath = path.join("text_files");

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

app.get("/", (req, res) => {
  res.send("Hello Everyone...😍");
});

// 1.Write API endpoint which will create a text file in a particular folder

app.post("/createTextFile", (req, res) => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getYear();
  const time = currentDate.getTime();
  const fileName = `${date}-${month}-${year}-${time}.txt`;
  const timestamp = new Date().toISOString();
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      // console.error(err);
      res.status(404).send({ message: "Failed to create text file" });
    } else {
      res
        .status(200)
        .send({ message: `Text File ${fileName} Created Successfully...👍🏻` });
    }
  });
});

// 2. Write API endpoint to retrieve all text files in that particular folder

app.get("/getAllTextFile", (req, res) => {
  const filePath = "./text_files";

  fs.readdir(filePath, (err, files) => {
    if (err) {
      // console.error(err);
      res.status(404).send({ error: "Failed to retrieve text files." });
    } else {
      res.status(200).send({ files });
    }
  });
});

app.listen(Port, () =>
  console.log(`Server is running on http://localhost:${Port}`)
);
