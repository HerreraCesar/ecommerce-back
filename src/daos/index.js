import "dotenv/config";

import { requestLogger } from "../../controllers/loggers.js";

let productsDao;
let cartsDao;
let usersDao;
let ordersDao;

requestLogger.info(`db seleccionada: ${process.env.PERSISTENCE}`);

switch (process.env.PERSISTENCE) {
  case "json":
    const { default: FilesProductsDao } = await import(
      "./products/filesProductsDao.js"
    );
    const { default: FilesCartsDao } = await import("./carts/filesCartsDao.js");
    const { default: FilesUsersDao } = await import("./users/filesUsersDao.js");
    const { default: FilesOrdersDao } = await import(
      "./orders/filesOrdersDao.js"
    );
    productsDao = new FilesProductsDao();
    cartsDao = new FilesCartsDao();
    usersDao = new FilesUsersDao();
    ordersDao = new FilesOrdersDao();
    break;

  case "mongo":
    const { default: MongoProductsDao } = await import(
      "./products/mongoProductsDao.js"
    );
    const { default: MongoCartsDao } = await import("./carts/mongoCartsDao.js");
    const { default: MongoUsersDao } = await import("./users/mongoUsersDao.js");
    const { default: MongoOrdersDao } = await import(
      "./orders/mongoOrdersDao.js"
    );
    productsDao = new MongoProductsDao();
    cartsDao = new MongoCartsDao();
    usersDao = new MongoUsersDao();
    ordersDao = new MongoOrdersDao();
    break;

  case "firebase":
    const { default: FirebaseProductsDao } = await import(
      "./products/firebaseProductsDao.js"
    );
    const { default: FirebaseCartsDao } = await import(
      "./carts/firebaseCartsDao.js"
    );
    const { default: FirebaseUsersDao } = await import(
      "./users/firebaseUsersDao.js"
    );
    const { default: FirebaseOrdersDao } = await import(
      "./orders/firebaseOrdersDao.js"
    );
    productsDao = new FirebaseProductsDao();
    cartsDao = new FirebaseCartsDao();
    usersDao = new FirebaseUsersDao();
    ordersDao = new FirebaseOrdersDao();
    break;

  default:
    const { default: MemoryProductsDao } = await import(
      "./products/memoryProductsDao.js"
    );
    const { default: MemoryCartsDao } = await import(
      "./carts/memoryCartsDao.js"
    );
    const { default: MemoryUsersDao } = await import(
      "./users/memoryUsersDao.js"
    );
    const { default: MemoryOrdersDao } = await import(
      "./orders/memoryOrdersDao.js"
    );
    productsDao = new MemoryProductsDao();
    cartsDao = new MemoryCartsDao();
    usersDao = new MemoryUsersDao();
    ordersDao = new MemoryOrdersDao();
    break;
}

export { productsDao, cartsDao, usersDao, ordersDao };
