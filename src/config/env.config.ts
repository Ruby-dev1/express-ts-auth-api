import "dotenv/config"

const ENV_CONFIG = {

    //* environment

    NODE_ENV : process.env.NODE_ENV,
    PORT: process.env.PORT,

    //* Database

    DB_URI: process.env.DB_URI!!,

    //* cloudinary

    CLOUDINARY_CLOUD_NAME : "OUDINARY_CLOUD_NAME",
    CLOUDINARY_API_KEY: "CLOUDINARY_API_KEY",
    CLOUDINARY_API_SECRET: " CLOUDINARY_API_SECRET",

    //*JWT
    JWT_SECRET : process.env.JWT_SECRET!!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!!,


    //* COOKIES


    //* NODE MAILER
};


export default ENV_CONFIG;