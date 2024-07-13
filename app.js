const http = require("http");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const routes = require("./router");
const {connectDb} = require("./modules/dbconnect");

app.use("/apis",routes);

const server  = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    // const categories = [
    //     { icon: "deck", color: "#0D7223", category: "Leisure" },
    //     { icon: "directions-car", color: "#953030", category: "Transport" },
    //     { icon: "health-and-safety", color: "#333793", category: "Health" },
    //     { icon: "local-grocery-store", color: "#724781", category: "Groceries" },
    //     { icon: "landscape", color: "#613A6F", category: "Land" },
    //     { icon: "family-restroom", color: "#474DD0", category: "Family" },
    //     { icon: "cast-for-education", color: "#55252D", category: "Education" },
    //     { icon: "restaurant", color: "#34006A", category: "Food" },
    //     { icon: "fitness-center", color: "#D7442E", category: "Gym" },
    //     { icon: "build", color: "#C6A019", category: "Repairs" },
    //     { icon: "equalizer", color: "#1EA283", category: "Others" }
    //   ];
      
    console.log(`Server runing on port ${PORT}`);
});
