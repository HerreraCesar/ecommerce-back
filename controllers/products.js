import { productAsDto } from "../persistence/dtos/productDTO.js";
import { productsDao as products } from "../persistence/index.js";
import uniqid from "uniqid";

const getProducts = async (req, res, next) => {
  try {
    if (req.query.id) {
      let productId = req.query.id;
      let data = await products.getById(productId);
      res.json(productAsDto(data));
    } else {
      let data = await products.getAll();
      res.json(productAsDto(data));
    }
  } catch (error) {
    next(error);
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    let category = req.params.category;
    let data = await products.getByCategory(category);
    res.json(productAsDto(data));
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    let timestamp = new Date().valueOf();
    let id = uniqid();
    let newProduct = { ...req.body, id, timestamp };
    let data = await products.add(newProduct);
    res.json({
      message: "Producto añadido exitosamente",
      data: productAsDto(data),
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let productId = req.params.id;
    let updatedProduct = req.body;
    let data = await products.updateById(productId, updatedProduct);
    res.json({
      message: "Producto actualizado correctamente",
      "old data": productAsDto(data.old),
      "new data": productAsDto(data.new),
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    let productId = req.params.id;
    let data = await products.deleteById(productId);
    res.json({
      message: "Producto eliminado correctamente",
      data: productAsDto(data),
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
