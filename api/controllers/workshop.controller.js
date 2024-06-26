const { Workshop, Registration } = require("../models/workshop.model");
exports.createWorkshop = async (req, res) => {
  try {
    const { title, description, date, link, price, instructor, image } =
      req.body;

    const workshop = new Workshop({
      title,
      description,
      date,
      link,
      price,
      instructor,
      image,
    });
    const savedWorkshop = await workshop.save();

    res.status(201).json(savedWorkshop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create workshop" });
  }
};
exports.getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: "Failed to get workshops" });
  }
};

exports.getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.workshopId);

    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    res.json(workshop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get workshop" });
  }
};
