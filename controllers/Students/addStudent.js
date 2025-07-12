const Student = require('../../schema/Students/addStudentSchema');
// const AddStudentValidation = require('../../validation/Students/addValidation')
const bcrypt = require('bcryptjs');

exports.addStudent = async (req, res) => {
    try {
        const { name, studentId, password, technology, batch, role } = req.body;

        //validation
        // const { error } = AddStudentValidation.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        //verification
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(409).json({ message: 'Student ID already exists' });
        }

        //new student
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            name,
            studentId,
            password: hashedPassword,
            technology,
            batch,
            role
        });

        await newStudent.save();

        //response
        return res.status(201).json({
            message: 'Student added successfully',
            student: {
                name: newStudent.name,
                studentId: newStudent.studentId,
                technology: newStudent.technology,
                batch: newStudent.batch,
                role : newStudent.role,
            }
        });
    } catch (error) {
        console.error('Error adding student:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
