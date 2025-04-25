const PDFDocument = require("pdfkit");
const Volunteer = require("../models/User");
const Event = require("../models/Event");
const VolunteerHistory = require("../models/VolunteerHistory");

exports.generateVolunteerReport = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    const events = await Event.find();
    const histories = await VolunteerHistory.find();

    const format = req.query.format || "pdf";

    if (format !== "pdf") {
      return res.status(400).json({ error: "Unsupported format" });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="volunteer_participation_report.pdf"'
    );
    doc.pipe(res);

    doc.fontSize(20).text("Volunteer Participation Report", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).text("Volunteer List", { underline: true });
    doc.moveDown();
    if (volunteers.length === 0) {
      doc.fontSize(12).text("No volunteers found.");
    } else {
      volunteers.forEach((v, i) => {
        doc.fontSize(14).fillColor("blue").text(`Volunteer ${i + 1}`, { underline: true });
        doc.fillColor("black").fontSize(12);
        doc.text(`Name: ${v.fullName}`);
        doc.text(`Skills: ${v.skills?.join(", ") || "None"}`);
        doc.text(`Experience: ${v.experienceLevel}`);
        doc.text(`Availability: ${v.availability?.join(", ") || "Not specified"}`);
        doc.moveDown();
      });
    }

    doc.addPage();

    doc.fontSize(16).text("Volunteer History", { underline: true });
    doc.moveDown();
    if (histories.length === 0) {
      doc.fontSize(12).text("No volunteer history found.");
    } else {
      histories.forEach((h, i) => {
        doc.fontSize(14).fillColor("purple").text(`History ${i + 1}`, { underline: true });
        doc.fillColor("black").fontSize(12);
        doc.text(`Event Name: ${h.eventName}`);
        doc.text(`Description: ${h.eventDescription}`);
        doc.text(`Location: ${h.location}`);
        doc.text(`Required Skills: ${h.requiredSkills?.join(", ") || "None"}`);
        doc.text(`Urgency: ${h.urgency}`);
        doc.text(`Event Date: ${new Date(h.eventDate).toLocaleDateString()}`);
        doc.text(`Participation Status: ${h.participationStatus}`);
        doc.moveDown();
      });
    }

    doc.addPage();

    doc.fontSize(16).text("Event List", { underline: true });
    doc.moveDown();
    if (events.length === 0) {
      doc.fontSize(12).text("No events found.");
    } else {
      events.forEach((e, i) => {
        doc.fontSize(14).fillColor("green").text(`Event ${i + 1}`, { underline: true });
        doc.fillColor("black").fontSize(12);
        doc.text(`Event Name: ${e.eventName}`);
        doc.text(`Description: ${e.description}`);
        doc.text(`Location: ${e.location}`);
        doc.text(`Required Skills: ${e.skills?.join(", ") || "None"}`);
        doc.text(`Urgency: ${e.urgency}`);
        doc.text(`Event Date: ${new Date(e.date).toLocaleDateString()}`);
        doc.moveDown();
      });
    }

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Error generating report", error: err.message });
  }
};
