import Buyer from "./buyer";
import Crop from "./crop";
import Farmer from "./farmer";
import Order from "./order";

Farmer.hasMany(Crop, { foreignKey: "farmerId", onDelete: "CASCADE" });
Crop.belongsTo(Farmer, { foreignKey: "farmerId" });

Buyer.hasMany(Order, { foreignKey: "buyerId", onDelete: "CASCADE" });
Order.belongsTo(Buyer, { foreignKey: "buyerId" });

Farmer.hasMany(Order, { foreignKey: "farmerId", onDelete: "CASCADE" });
Order.belongsTo(Farmer, { foreignKey: "farmerId" });

export default { Buyer, Order, Crop, Farmer };
