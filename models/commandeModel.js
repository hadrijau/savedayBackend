import mongoose from "mongoose";

const commandeSchema = mongoose.Schema({
    title: {
        type: String,
    },
    categorie: {
        type: String,
    },
    description: {
        type: String,
    },
    livraison: {
        type: String,
    },
    moyenPaiement: {
        type: String,
    },
    poids: {
        type: String
    },
    status: {
        type: String,
    },
    prixProtectionAcheteur: {
        type: Number
    },
    emailVendeur: {
        type: String
    },
    pseudoVendeur: {
        type: String
    },
    total: {
        type: Number
    },
    prix: {
        type: Number
    },
    image: {
        type: String,
    },
    vendeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    acheteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

const Commande = mongoose.model("Commande", commandeSchema);

export default Commande;
