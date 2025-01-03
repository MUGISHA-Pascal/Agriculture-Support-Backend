import http from "http";
import app from "./app";
import { Server, Socket } from "socket.io";
import swaggerDocs from "./swagger";
import Buyer from "./models/buyer";
import Farmer from "./models/farmer";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;

io.on("connection", async (socket: Socket) => {
  console.log("A user connected");
  let farmers = await Farmer.findAll();
  let SocketRateManage = new Map();
  farmers.map((farmer) => {
    SocketRateManage.set(farmer.id, farmer.ratingCount);
  });
  socket.on(
    "rate",
    async ({ rate, farmerId }: { rate: number; farmerId: number }) => {
      const farmerSpecified = await Farmer.findOne({ where: { id: farmerId } });

      if (farmerSpecified) {
        farmerSpecified.ratingCount += rate;
        await Farmer.update(
          { ratingCount: (farmerSpecified.ratingCount += 1) },
          { where: { id: farmerId } }
        );
      }
      SocketRateManage.set(farmerId, farmerSpecified?.ratingCount);
      try {
        let AllBuyers = await Buyer.count();
        AllBuyers == 0 ? (AllBuyers = 1) : AllBuyers;
        const totalRatings = AllBuyers * 5;
        const averageRating =
          (SocketRateManage.get(farmerId) / totalRatings) * 100;
        let farmerUpdated = await Farmer.update(
          { ratingAverage: averageRating },
          { where: { id: farmerId } }
        );
        if (!farmerUpdated)
          throw new Error("error finding the farmer to be updated");
        io.emit("rating", {
          ratingAverage: farmerSpecified?.ratingAverage,
          farmerId: farmerSpecified?.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(port, () => {
  console.log("app running on port", port);
});
swaggerDocs(app, port);
