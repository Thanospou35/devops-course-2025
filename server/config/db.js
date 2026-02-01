import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    // Ajouter le nom de la base de données à l'URI si nécessaire
    let mongoURI = process.env.MONGODB_URI;
    if (mongoURI.includes('/?')) {
      mongoURI = mongoURI.replace('/?', '/todoapp?');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    console.log(`📦 Base de données: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Erreur de connexion MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
