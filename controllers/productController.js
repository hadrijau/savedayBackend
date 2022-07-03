import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc Get product by category
// @route GET /api/commerces/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const {category} = req.params
    const products = await Product.find({category});
    res.json(products);
});

// @desc Get product by user
// @route GET /api/commerces/vendeur/:idVendeur
// @access Public
const getProductsByUser = asyncHandler(async (req, res) => {
    const {idVendeur} = req.params
    const products = await Product.find({idVendeur});
    res.json(products);
});

// @desc Get product by email
// @route GET /api/commerces/email/:idVendeur
// @access Public
const getProductsByEmail = asyncHandler(async (req, res) => {
    const {emailVendeur} = req.params
    const products = await Product.find({emailVendeur});
    res.json(products);
});
// @desc Get boosted products
// @route GET /api/products/boosted
// @access Public
const getBoostedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({boosted: true});
    res.json(products);
});

// @desc Create a product
// @route POST /api/products
// @access Public
const createProduct = asyncHandler(async (req, res) => {
    const {
        title,
        category,
        description,
        prix,
        status,
        images,
        livraison,
        idVendeur,
        pseudoVendeur,
        emailVendeur,
        brand,
        poids,
        token,
        boosted
    } = req.body;

    const product = await Product.create({
        title,
        category,
        description,
        prix,
        status,
        images,
        idVendeur,
        emailVendeur,
        pseudoVendeur,
        brand,
        poids,
        livraison,
        token,
        boosted
    });

    if (product) {
        res.status(201).json({product})
    } else {
        res.status(400)
        throw new Error("Pas de produit crée")
    }
});


// @desc Update product
// @route PUT /api/products
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.id)

    const {
        title,
        category,
        description,
        prix,
        status,
        image,
        emailVendeur,
        boosted
    } = req.body

    if (product) {
        if (image != null) {
            product.images.push(image)
        }

        product.title = title || product.title
        product.category = category || product.category
        product.description = description || product.description
        product.prix = prix || product.prix
        product.status = status || product.status
        product.emailVendeur = emailVendeur || product.emailVendeur
        product.boosted = boosted || product.boosted

        const updatedProduct = await product.save();
        res.status(200).json({updatedProduct})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "User removed" })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

export { getProductsByCategory, getProductsByEmail, getBoostedProducts, getProductsByUser, getProducts, createProduct, updateProduct, deleteProduct }
