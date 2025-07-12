const Admin = require('../../schema/AdminSchema');
const bcrypt = require('bcryptjs');

const addAdmin = async (req, res) => {
    try {
        console.log(req.body)
        const { AdminId, password, role } = req.body;
        const existingAdmin = await Admin.findOne({ AdminId });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin ID already exists' });
        }

        //new student
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            AdminId,
            password: hashedPassword,
            role
        });


        await newAdmin.save();

        //response
        return res.status(201).json({
            message: 'Admin added successfully',
            Admin: {
                AdminId: newAdmin.AdminId,
                role: newAdmin.role,
            }
        });
    } catch (error) {
        console.error('Error adding Admin:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { addAdmin }