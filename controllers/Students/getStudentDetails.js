const Student = require('../../schema/Students/addStudentSchema');

const getStudentDetails = async (req, res) => {
    try {
        const { studentId } = req.query; 

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const student = await Student.findOne({ studentId }).select('-password');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ student });
    } catch (error) {
        console.error('Error fetching student:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getStudentDetails };
