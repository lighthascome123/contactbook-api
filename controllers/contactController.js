const Contact = require('../models/Contact');

exports.createAd = async (req, res) => {
  try {
    const { firstname, lastname, about, email, phone } = req.body;

    const ad = new Contact({
      firstname,
      lastname,
      about,
      email,
      phone, 
      contact: req.user._id,
    });

    const createdAd = await ad.save();
    res.status(201).json(createdAd);
  } catch (error) {
    console.error('Create ad error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const ad = await Contact.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (ad.contact.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updates = {
      firstname: req.body.firstname || ad.firstname,
      lastname: req.body.lastname || ad.lastname,
      about: req.body.about || ad.about,
      email: req.body.email || ad.email,
      phone: req.body.phone || ad.phone, // Added phone field
    };

    const updatedAd = await Contact.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedAd);
  } catch (error) {
    console.error('Update ad error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyAds = async (req, res) => {
  try {
    const ads = await Contact.find({ contact: req.user._id });
    res.json(ads);
  } catch (error) {
    console.error('Get my ads error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Contact.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(ad);
  } catch (error) {
    console.error('Get ad by id error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

 

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Contact.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (ad.contact.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Contact removed' });
  } catch (error) {
    console.error('Delete ad error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

