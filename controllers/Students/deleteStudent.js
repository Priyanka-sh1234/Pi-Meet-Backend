const Student = require('../../schema/Students/addStudentSchema');

const deleteStudent = async (req, res) => {
  try {
    const { StudentId } = req.params;

    if (!StudentId) {
      return res.status(400).json({ message: 'StudentId is required.' });
    }

    const deletedStudent = await Student.findOneAndDelete({ studentId: StudentId.trim()});

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    return res.status(200).json({
      message: 'Student deleted successfully.',
      deletedStudent: {
        name: deletedStudent.name,
        StudentId: deletedStudent.studentId,
        role: "Student"
      }
    });
  } catch (error) {
    console.error('Error deleting Student:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { deleteStudent };
