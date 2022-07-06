import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    prix: {
        type: String
    },
    poids: {
        type: String
    },
    boosted: {
        type: Boolean,
    },
    livraison: {
        type: String,
    },
    status: {
        type: String,
    },
    images: {
        type: Array,
    },
    idVendeur: {
        type: mongoose.Schema.Types.ObjectId
    },
    pseudoVendeur: {
        type: String
    },
    emailVendeur: {
        type: String
    },
    brand: {
        type: String,
    },
    token: {
        type: String
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
