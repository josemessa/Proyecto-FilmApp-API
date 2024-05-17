const jwt = require("jsonwebtoken");

const tokenGenerator = (payload, isRefresh) => {
  if (isRefresh) {
    return jwt.sign(payload, process.env.TOKENREFRESCO, {
      expiresIn: "60min",
    });
  }
  return jwt.sign(payload, process.env.TOKEN, { expiresIn: "30min" });
};

function generatePDF(data) {
  const doc = new PDFDocument();

  doc.fontSize(20).text("Datos de la respuesta", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(JSON.stringify(data, null, 2));

  doc.end();
  return doc;
}

module.exports = tokenGenerator;
