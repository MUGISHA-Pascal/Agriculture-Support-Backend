import http from "http";
import app from "./app";
import { Server, Socket } from "socket.io";
import swaggerDocs from "./swagger";
import Buyer from "./models/buyer";
import Farmer from "./models/farmer";
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT;
io.on("connection", async (socket: Socket) => {
  let farmers = await Farmer.findAll();
  let SocketRateManage = new Map();
  farmers.map((farmer) => {
    SocketRateManage.set(farmer.id, farmer.rating);
  });
  //issue fixing rating
  socket.on(
    "rate",
    async ({ rate, farmerId }: { rate: number; farmerId: number }) => {
      const farmerSpecified = await Farmer.findOne({ where: { id: farmerId } });
      // farmerSpecified?.rating ? farmerSpecified.rating++ : farmerSpecified?.rating;
      SocketRateManage.set(farmerId, farmerSpecified?.rating);
      try {
        const AllBuyers = await Buyer.count();
        const totalRatings = AllBuyers * 5;
        // const averageRating = ( / totalRatings) * 100;
      } catch (error) {
        console.log(error);
      }
    }
  );
});
server.listen(port, () => {
  console.log("app running on port", port);
});
swaggerDocs(app, port);
