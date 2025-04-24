const PDFDocument = require("pdfkit");
const { Parser } = require("json2csv");
const fs = require("fs");
const Volunteer = require("../models/User");
const Event = require("../models/Events");

exports.generateVolunteerReport = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    const events = await Event.find();

    const format = req.query.format || "pdf";

    if (format === "pdf") {
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="volunteer_report.pdf"'
      );

      doc.pipe(res);

      doc
        .fontSize(20)
        .text("Volunteer Participation Report", { align: "center" });
      doc.moveDown();

      if (volunteers.length === 0) {
        doc.fontSize(12).text("No volunteers found.");
      } else {
        volunteers.forEach((v, index) => {
          doc
            .fontSize(14)
            .fillColor("blue")
            .text(`Volunteer ${index + 1}`, { underline: true });
          doc.fillColor("black").fontSize(12);
          doc.text(`Name: ${v.fullName}`);
          doc.text(`Skills: ${v.skills.join(", ") || "None"}`);
          doc.text(`Experience: ${v.experienceLevel}`);
          doc.text(
            `Availability: ${v.availability?.join(", ") || "Not specified"}`
          );
          doc.moveDown();
        });
      }

      doc.end();
    } else {
      res.status(400).json({ error: "Unsupported format" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error generating report", error: err.message });
  }
};
