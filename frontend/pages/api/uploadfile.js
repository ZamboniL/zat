import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  const { destiny } = req.headers;
  form.uploadDir = destiny;
  form.keepExtensions = true;
  form.on("fileBegin", function (name, file) {
    //rename the incoming file to the file's name
    file.path = form.uploadDir + file.name;
  });
  form.parse(req, (err, fields, files) => {
    if (err) res.status(400).end();
    res.status(200).json({ fields, files });
  });
};
