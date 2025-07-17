const Guest = require('../../schema/classes/addGuestSchema')

// DELETE /api/guests/:id
const deleteGuest = async (req, res) => {
  try {
    const guestId = req.params.id;

    const deletedGuest = await Guest.findByIdAndDelete(guestId);

    if (!deletedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    res.status(200).json({ message: 'Guest deleted successfully', guest: deletedGuest });
  } catch (error) {
    console.error('Error deleting guest:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {deleteGuest};
