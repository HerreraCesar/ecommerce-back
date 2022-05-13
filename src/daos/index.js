import "dotenv/config";

let productsDao;
let cartsDao;

console.log("db seleccionada:", process.env.PERSISTENCE);

switch (process.env.PERSISTENCE) {
  case "json":
    const { default: FilesProductsDao } = await import(
      "./products/filesProductsDao.js"
    );
    const { default: FilesCartsDao } = await import("./carts/filesCartsDao.js");
    productsDao = new FilesProductsDao();
    cartsDao = new FilesCartsDao();
    break;

  case "mongo":
    const { default: MongoProductsDao } = await import(
      "./products/mongoProductsDao.js"
    );
    const { default: MongoCartsDao } = await import("./carts/mongoCartsDao.js");
    productsDao = new MongoProductsDao();
    cartsDao = new MongoCartsDao();
    break;

  case "firebase":
    const { default: FirebaseProductsDao } = await import(
      "./products/firebaseProductsDao.js"
    );
    const { default: FirebaseCartsDao } = await import(
      "./carts/firebaseCartsDao.js"
    );
    productsDao = new FirebaseProductsDao();
    cartsDao = new FirebaseCartsDao();
    break;

  default:
    const { default: MemoryProductsDao } = await import(
      "./products/memoryProductsDao.js"
    );
    const { default: MemoryCartsDao } = await import(
      "./carts/memoryCartsDao.js"
    );
    productsDao = new MemoryProductsDao();
    cartsDao = new MemoryCartsDao();
    break;
}

export { productsDao, cartsDao };
