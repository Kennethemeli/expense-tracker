// controllers/expenseController.js
const { connectDb } = require("../modules/dbconnect");


const getCategories = async (req, res) => {
    const db = await connectDb();
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// const addExpense = async (req, res) => {
//     const db =await connectDb();
//     const { amount, category, date, notes } = req.body;
//     const userId = req.user.userId;

//     db.query(
//         'INSERT INTO expenses (user_id, amount, category, date, notes) VALUES (?, ?, ?, ?, ?)',
//         [userId, amount, category, date, notes],
//         (err, results) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.status(201).json({ message: 'Expense added successfully.' });
//         }
//     );
// };

const deleteExpense = async (req, res) => {
    const conn = await connectDb();
    const db = await conn.getConnection();
    const { id} = req.body;
    const userId = req.user.userId; // Assuming the user ID is attached to the request object

    // Validate comment
    if (!id) {
        return res.status(400).json({ message: 'Expense not found.', status: false });
    }

    try {
        // Check if category ID exists
        const [categoryResults] = await db.query('SELECT id FROM expenses WHERE id = ? AND urs_id = ?', [id, userId]);
        if (categoryResults.length === 0) {
            return res.status(400).json({ message: 'Expense has already been deleted.', status: false });
        }

        // Add expense to the expenses table
        const [insertResults] = await db.query('DELETE FROM expenses WHERE id = ? AND urs_id = ?', [id,userId]);
        
        if (insertResults.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to delete expense.', status: false });
        }

        res.status(201).json({ message: ' successfully.', status: true });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error.', status: false });
        console.error(err);
    } finally {
        if (db) db.release(); // Ensure the connection is released back to the pool
    }
};
const addExpense = async (req, res) => {
    console.log("got this one ");
    const conn = await connectDb();
    const db = await conn.getConnection();
    const { category_id, comment, amount } = req.body;
    const userId = req.user.userId; // Assuming the user ID is attached to the request object
    console.log(userId);

    // Validate comment
    if (!comment || comment.trim() === '') {
        return res.status(400).json({ message: 'Comment is required and cannot be empty.', status: false });
    }

    try {
        // Check if category ID exists
        const [categoryResults] = await db.query('SELECT id FROM expense_categories WHERE id = ? AND (urs_id = ? OR urs_id = 0)', [category_id, userId]);
        if (categoryResults.length === 0) {
            return res.status(400).json({ message: 'Invalid category ID.', status: false });
        }

        // Add expense to the expenses table
        const [insertResults] = await db.query('INSERT INTO expenses (urs_id, e_comment, price, category_id, created_at) VALUES (?, ?, ?, ?, NOW())', [userId, comment, amount, category_id]);
        
        if (insertResults.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to add expense.', status: false });
        }

        res.status(201).json({ message: 'Expense added successfully.', status: true });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error.', status: false });
        console.error(err);
    } finally {
        if (db) db.release(); // Ensure the connection is released back to the pool
    }
};

const getExpenses =async (req, res) => {
    const db =await connectDb();
    const userId = req.user.userId;

    db.query('SELECT * FROM expenses WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getExpensesByCategory = async (req, res) => {
    const conn = await connectDb();
    const db = await conn.getConnection();
    const { categoryId } = req.params;
    const userId = req.user.userId;

    try {
        const [results] = await db.query(
            `SELECT e.id, e.e_comment AS comment , e.price, e.created_at, 
                    c.category_name, c.color, c.icon 
             FROM expenses e
             JOIN expense_categories c ON e.category_id = c.id
             WHERE e.category_id = ? AND e.urs_id = ? AND (c.urs_id = ? OR c.urs_id = 0) ORDER BY id DESC`,
            [categoryId, userId, userId]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: 'No expenses found for this category.', status: false });
        }

        // Format the created_at date
        const formattedResults = results.map(result => {
            const date = new Date(result.created_at);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            return {
                ...result,
                date: formattedDate
            };
        });

        res.status(200).json({ message: 'Expenses retrieved successfully.', status: true, data: formattedResults });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error.', status: false });
        console.error(err);
    } finally {
        if (db) db.release(); // Ensure the connection is released back to the pool
    }
};

const getExpensesSummary = async (req, res) => {
    console.log("got req");
    const conn = await connectDb();
    const db = await conn.getConnection();
    const userId = req.user.userId; // Assuming the user ID is attached to the request object

    try {
        const query = `
            SELECT 
                ec.id AS category_id,
                ec.category_name,
                ec.color,
                ec.icon,
                COUNT(e.id) AS value,
                SUM(e.price) AS total_amount,
                (SUM(e.price) / (SELECT SUM(price) FROM expenses WHERE urs_id = ?) * 100) AS percentage
            FROM 
                expense_categories ec
            JOIN 
                expenses e ON ec.id = e.category_id
            WHERE
                e.urs_id = ?
            GROUP BY 
                ec.id, ec.category_name, ec.color, ec.icon
            HAVING 
                COUNT(e.id) > 0;
        `;

        const [results] = await db.query(query, [userId, userId]);

        res.status(200).json({ data: results, status: true });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error.', status: false });
        console.error(err);
    } finally {
        if (db) db.release();  // Ensure the connection is released back to the pool
    }
};


module.exports = { getCategories, addExpense, getExpenses , getExpensesSummary , getExpensesByCategory , deleteExpense};
