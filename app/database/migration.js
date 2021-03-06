import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";


dotenv.config();

let DATABASE_URL;

if (process.env.NODE_ENV === "test") {
    DATABASE_URL = process.env.DATABASE_URL_TEST;
} else {
    DATABASE_URL = process.env.DATABASE_URL;
}

const pool = new Pool({
    connectionString: DATABASE_URL
});

pool.on('connect', () => {});

const adminPass = bcrypt.hashSync(process.env.ADMIN_PASS, 8);


export const createTables = async() => {
    try {
        const queries = `
        CREATE TABLE IF NOT EXISTS
            users (
                id TEXT NOT NULL,
                firstname VARCHAR(120) NOT NULL,
                lastname VARCHAR(120) NOT NULL,
                email VARCHAR(120) UNIQUE NOT NULL,
                password VARCHAR(120) NOT NULL,
                address VARCHAR(120),
                isadmin BOOLEAN
            );
        CREATE TABLE IF NOT EXISTS
            cars (
                id TEXT NOT NULL,
                ownerid TEXT NOT NULL,
                createdon VARCHAR(120) NOT NULL,
                state VARCHAR(120) NOT NULL,
                status VARCHAR(120) NOT NULL,
                type VARCHAR(120) NOT NULL,
                manufacturer VARCHAR(120) NOT NULL,
                model VARCHAR(120) NOT NULL,
                price  float8 NOT NULL,
                photo TEXT NOT NULL
            );
        CREATE TABLE IF NOT EXISTS
            orders (
                id TEXT NOT NULL,
                ownerid TEXT NOT NULL,
                createdon TEXT NOT NULL,
                carid TEXT NOT NULL,
                status VARCHAR(120) NOT NULL,
                price float8 NOT NULL
            );
        CREATE TABLE IF NOT EXISTS
            flags (
                id TEXT NOT NULL,
                ownerid TEXT NOT NULL,
                carid TEXT NOT NULL,
                reason VARCHAR(200) NOT NULL,
                description TEXT NOT NULL
            );
        INSERT INTO 
            users (id, firstName, lastName, email, password, address, isAdmin)
            VALUES('7bfc05ce-c15c-433c-be5f-69687e6b9369', 'admin', 'admin',
            'admin@automart.com', '${adminPass}', 'Kigali', true);
        INSERT INTO 
            users (id, firstName, lastName, email, password, address, isAdmin)
            VALUES('7bfc05ce-c15c-433c', 'user', 'user',
            'user@automart.com', '${adminPass}', 'Kigali', false);
        INSERT INTO 
            cars (id, ownerid, createdon, state, status,
                type, manufacturer, model, price, photo)
            VALUES('7bfc05ce-c15c', '7bfc05ce-c15c-433c-be5f-69687e6b9369',
             'Tue, Jully 18, 2020 5:03 AM', 'new', 'available', 'car',
              'ford', 'CS', 23, 
              'https://github.com/Malaba6/Auto-Mart/blob/develop/UI/img/ford.jpg');
        INSERT INTO 
          cars (id, ownerid, createdon, state, status, type,
             manufacturer, model, price, photo)
          VALUES('7bfc05ce-c15ccc', '7bfc05ce-c15ccc',
           'Tue, Jun 18, 2020 5:03 AM',
           'used', 'available', 'van', 'Toyota', 'Hiace 2018', 18,
           'https://res.cloudinary.com/eubule/image/upload/s--jjyDY0jS--/v1596695991/toyota-hiace.jpg');
        INSERT INTO 
            cars (id, ownerid, createdon, state, status, type,
                 manufacturer, model, price, photo)
            VALUES('7bfc05ce', '7bfc05ce-c15c-433c-be5f-69687e6b9369',
             'Tue, Jun 18, 20120 5:03 AM',
            'used', 'available', 'car', 'BMW', 'M2 2021', 35,
             'https://res.cloudinary.com/eubule/image/upload/s--wMvHzkte--/v1596695989/sony.jpg');
        INSERT INTO 
            cars (id, ownerid, createdon, state, status, type,
                 manufacturer, model, price, photo)
            VALUES('7bfc05ce-rudi', '7bfc05ce-c15c-433c-be5f-69687e6b9369',
             'Tue, Jun 18, 2020 5:03 AM', 'used', 'available', 'pickup',
              'MG Extended', '2019', 24,
            'https://res.cloudinary.com/eubule/image/upload/s--NnmmxP6V--/v1596695990/mg.jpg');
        INSERT INTO 
            cars (id, ownerid, createdon, state, status, type,
                manufacturer, model, price, photo)
            VALUES('7bfc05ce-rudi', '7bfc05ce-c15c-433c-be5f-69687e6b9369',
            'Tue, Jun 18, 2020 5:03 AM', 'used', 'available', 'car',
            'Volkswagen', 'Beetle 2012', 36,
             'https://res.cloudinary.com/eubule/image/upload/s--pdv3zN7T--/v1596697518/VW_1302__282013-09-15_2307_Spu_29.jpg');
        INSERT INTO 
             cars (id, ownerid, createdon, state, status, type,
                  manufacturer, model, price, photo)
             VALUES('7bfc05ce-rudi', '7bfc05ce-c15c-433c-be5f-69687e6b9369',
              'Tue, Jun 18, 2020 5:03 AM', 'used', 'available', 'car',
               'Volkswagen', 'Touareg 2015', 33,
             'https://res.cloudinary.com/eubule/image/upload/s--prCMPv55--/v1596697518/2015-Volkswagen-Touareg-TDI-111-876x535.jpg.jpg');
        INSERT INTO 
            orders (id, ownerid, createdon, carid, status, price)
            VALUES('7bfc05ce-c15aar', '7bfc05ce-c15c-433c-be5f-69687e6b9369',
            'Tue, Jun 18, 2019 5:03 AM', '7bfc05ce-c15ccc', 'available', 12000);
        INSERT INTO 
            orders (id, ownerid, createdon, carid, status, price)
            VALUES('7bfc05ce-c15vbr', '7bfc05ce-c15c-433c', 'Tue, Jun 18, 2019 5:03 AM',
            '7bfc05ce-rud', 'sold', 12000);`;


        const p = await pool.query(queries);
        pool.end();
    } catch (err) {
        await pool.end()
    }
}

createTables();