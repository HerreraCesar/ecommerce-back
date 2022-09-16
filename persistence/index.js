import "dotenv/config";

import config from "../config.js";
import { requestLogger } from "../scripts/loggers.js";

let productsDao;
let cartsDao;
let usersDao;
let ordersDao;
let messagesDao;

requestLogger.info(`db seleccionada: ${process.env.PERSISTENCE}`);

switch (config.PERSISTENCE) {
  case "json":
    const { default: FilesProductsDao } = await import(
      "./daos/products/filesProductsDao.js"
    );
    const { default: FilesCartsDao } = await import(
      "./daos/carts/filesCartsDao.js"
    );
    const { default: FilesUsersDao } = await import(
      "./daos/users/filesUsersDao.js"
    );
    const { default: FilesOrdersDao } = await import(
      "./daos/orders/filesOrdersDao.js"
    );
    const { default: FilesMessagesDao } = await import(
      "./daos/messages/filesMessagesDao.js"
    );
    productsDao = new FilesProductsDao();
    cartsDao = new FilesCartsDao();
    usersDao = new FilesUsersDao();
    ordersDao = new FilesOrdersDao();
    messagesDao = new FilesMessagesDao();
    break;

  case "mongo":
    const { default: MongoProductsDao } = await import(
      "./daos/products/mongoProductsDao.js"
    );
    const { default: MongoCartsDao } = await import(
      "./daos/carts/mongoCartsDao.js"
    );
    const { default: MongoUsersDao } = await import(
      "./daos/users/mongoUsersDao.js"
    );
    const { default: MongoOrdersDao } = await import(
      "./daos/orders/mongoOrdersDao.js"
    );
    const { default: MongoMessagesDao } = await import(
      "./daos/messages/mongoMessagesDao.js"
    );
    productsDao = new MongoProductsDao();
    cartsDao = new MongoCartsDao();
    usersDao = new MongoUsersDao();
    ordersDao = new MongoOrdersDao();
    messagesDao = new MongoMessagesDao();
    break;

  default:
    const { default: MemoryProductsDao } = await import(
      "./daos/products/memoryProductsDao.js"
    );
    const { default: MemoryCartsDao } = await import(
      "./daos/carts/memoryCartsDao.js"
    );
    const { default: MemoryUsersDao } = await import(
      "./daos/users/memoryUsersDao.js"
    );
    const { default: MemoryOrdersDao } = await import(
      "./daos/orders/memoryOrdersDao.js"
    );
    const { default: MemoryMessagesDao } = await import(
      "./daos/messages/memoryMessagesDao.js"
    );
    productsDao = new MemoryProductsDao();
    cartsDao = new MemoryCartsDao();
    usersDao = new MemoryUsersDao();
    ordersDao = new MemoryOrdersDao();
    messagesDao = new MemoryMessagesDao();
    break;
}

export { productsDao, cartsDao, usersDao, ordersDao, messagesDao };
