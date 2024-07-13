// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectDb } = require("../modules/dbconnect");


const signUp = async (req, res) => {
    const conn = await connectDb();
    const db = await conn.getConnection();
    const { email, pswd, name } = req.body;
    const password = pswd;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const [results] = await db.query('INSERT INTO users (email, pswd, name) VALUES (?, ?, ?)', [email, hashedPassword, name]);
        
        if (results.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to register user.', status: false });
        }

        const token = jwt.sign({ userId: results.insertId }, "key", { expiresIn: '1h' });
        res.status(201 ).json({ message: 'User registered successfully.', token, status: true, name });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error.', status: false });
        console.error(err);
    } finally {
        if (db) db.release();  // Ensure the connection is released back to the pool
    }
};


const signIn = async (req, res) => {
    const conn = await connectDb();
    const db = await conn.getConnection() ;
    const { email, pswd } = req.body;
    const password = pswd;
    console.log(`Got email:${email} And password:${password}`);

    try{
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length === 0) return res.status(401).json({ status: false, message: 'Invalid credentials.' });
        //console.log("here 2");
        const user = results[0];
        const isValidPassword = bcrypt.compareSync(password, user.pswd);
        //console.log("here 1]3");
        if (!isValidPassword) return res.status(401).json({ status: false, message: 'Invalid credentials.' });
        //console.log("here 44");
        const token = jwt.sign({ userId: user.id }, "key" , { expiresIn: '1h' });
        res.json({ token, status: true, message: `Welcome ${user.name}`, name: user.name });
    }catch(e){
        res.status(500).json({status:false,message:"Internal server error"});
        console.log(e);
    }
};

const wipeData = async (req, res) => {
    const conn = await connectDb();
    const db = await conn.getConnection();
    const userId = req.user.userId;

    try {
        await db.beginTransaction();

        await db.query('DELETE FROM expenses WHERE urs_id = ?',[userId]);

        await db.query('DELETE FROM expense_categories WHERE urs_id = ?',[userId]);

        await db.commit();
        // Format the created_at date

        res.status(200).json({ message: 'data successfully wiped', status: true, });

    } catch (err) {
        await db.rollback();
        res.status(500).json({ message: 'Internal server error.', status: false });
        console.error(err);
    } finally {
        if (db) db.release(); // Ensure the connection is released back to the pool
    }
};


module.exports = { signUp, signIn ,wipeData };
