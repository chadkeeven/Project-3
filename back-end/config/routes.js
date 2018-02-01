const router = require('express').Router();

const passport = require('passport');

const request = require('request');

const rtdUser = process.env.rtdUser || require('./env.js').rtdUser;
const rtdPassword = process.env.rtdPassword || require('./env.js').rtdPassword;

let lastUsed = Date.now();
let isActive = false;


//will start up the interval function to make api calls.  this is where the 'do the things' function will be called;
let updateTrips = ()=>{
	setInterval(()=>{
	//will let functions know the updater is running and not to run it again
	isActive = true;
// make API route call and parse data
	let rightNow = Date.now();
	//if nobody's been here in 15 minutes, turn it off!
	if((rightNow-lastUsed)>900000){
		//lets functions know that the updater is not running and to restart it
		isActive = false;
		clearInterval(updateTrips);
	}
}, 90000);};


//keeps server awake and updating data only as long as people are requesting.  If it isn't already updating, it will start it up again!
let keepActive = (req, res, next)=>{
	lastUsed = Date.now();
	if(!isActive) updateTrips();
	return next();
};

router.get('/', (req,res)=>{
	res.send("Server is working!");
});





module.exports = router;