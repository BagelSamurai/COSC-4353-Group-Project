const PDFDocument = require("pdfkit");
const Volunteer = require("../models/User");
const Event = require("../models/Events");
const VolunteerHistory = require("../models/VolunteerHistory");

exports.generateVolunteerReport = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    const events = await Event.find();
    const history = await VolunteerHistory.find().sort({ eventDate: 1 });

    const format = req.query.format || "pdf";

    if (format === "pdf") {
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="volunteer_participation_report.pdf"'
      );

      doc.pipe(res);

      // Title
      doc
        .fontSize(20)
        .text("Volunteer Participation Report", { align: "center" });
      doc.moveDown(2);

      // 🟦 Section: Volunteer List
      doc.fontSize(16).text("Volunteer List", { underline: true });
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

      doc.addPage();

      // 🟩 Section: Event List
      doc.fontSize(16).text("Event List", { underline: true });
      doc.moveDown();

      if (events.length === 0) {
        doc.fontSize(12).text("No events found.");
      } else {
        events.forEach((e, index) => {
          doc
            .fontSize(14)
            .fillColor("green")
            .text(`Event ${index + 1}`, { underline: true });
          doc.fillColor("black").fontSize(12);
          doc.text(`Event Name: ${e.eventName}`);
          doc.text(`Description: ${e.description}`);
          doc.text(`Location: ${e.location}`);
          doc.text(`Required Skills: ${e.skills.join(", ") || "None"}`);
          doc.text(`Urgency: ${e.urgency}`);
          doc.text(`Event Date: ${new Date(e.date).toLocaleDateString()}`);
          doc.moveDown();
        });
      }

      doc.addPage();

      // 🟪 Section: Volunteer History
      doc.fontSize(16).text("Volunteer History", { underline: true });
      doc.moveDown();

      if (history.length === 0) {
        doc.fontSize(12).text("No participation records found.");
      } else {
        history.forEach((h, index) => {
          doc
            .fontSize(14)
            .fillColor("purple")
            .text(`Record ${index + 1}`, { underline: true });
          doc.fillColor("black").fontSize(12);
          doc.text(`Event Name: ${h.eventName}`);
          doc.text(`Description: ${h.eventDescription}`);
          doc.text(`Location: ${h.location}`);
          doc.text(`Required Skills: ${h.requiredSkills.join(", ") || "None"}`);
          doc.text(`Urgency: ${h.urgency}`);
          doc.text(`Event Date: ${new Date(h.eventDate).toLocaleDateString()}`);
          doc.text(`Status: ${h.participationStatus}`);
          doc.moveDown();
        });
      }

      doc.end();
    } else {
      res.status(400).json({ error: "Unsupported format" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error generating report",
      error: err.message,
    });
  }
};
