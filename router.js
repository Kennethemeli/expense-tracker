const router = require("express").Router();

// import controllers for the routes 
const { signUp, signIn , wipeData } = require('./routes/authentication');
const { deleteExpense,getCategories, addExpense, getExpenses , getExpensesSummary,getExpensesByCategory} = require('./routes/manageExpense');

// import authentication middleware
const authenticateToken = require('./modules/auth');


router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/wipe-data', authenticateToken, wipeData) ;
router.get('/expense-categories', authenticateToken, getCategories);
router.post('/add-expense', authenticateToken, addExpense);
router.post('/delete-expense', authenticateToken, deleteExpense);
router.get('/expenses', authenticateToken, getExpenses);
router.get('/expenses-category/:categoryId', authenticateToken, getExpensesByCategory);
router.get('/expenses-summary', authenticateToken, getExpensesSummary);


// export all the routes 
module.exports = router;