CREATE DATABASE if not exists RentalAgencyDb;
USE RentalAgencyDb;



CREATE TABLE Tenants(
   id INT AUTO_INCREMENT,
   FirstName VARCHAR(50),
   LastName VARCHAR(50),
   Email VARCHAR(50),
   PhoneNumber INT,
   PRIMARY KEY(id)
);

CREATE TABLE Landlords(
   id INT AUTO_INCREMENT,
   FirstName VARCHAR(50),
   LastName VARCHAR(50),
   Email VARCHAR(50),
   PhoneNumber INT,
   PRIMARY KEY(id)
);

CREATE TABLE Properties(
   id INT AUTO_INCREMENT,
   Address VARCHAR(255),
   City VARCHAR(50),
   ZipCode INT,
   NumberOfBedrooms INT,
   NumberOfBathrooms INT,
   Rent DECIMAL(10,2),
   id_Landlords INT NOT NULL,
   Image VARCHAR(255),
   PRIMARY KEY(id),
   FOREIGN KEY(id_Landlords) REFERENCES Landlords(id)
);

CREATE TABLE Leases(
   id INT AUTO_INCREMENT,
   LeaseStart DATE,
   LeaseEnd DATE,
   MonthlyRent INT,
   SecurityDeposit INT,
   id_Properties INT NOT NULL,
   id_Tenants INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Properties) REFERENCES Properties(id),
   FOREIGN KEY(id_Tenants) REFERENCES Tenants(id)
);

CREATE TABLE Payments(
   id INT AUTO_INCREMENT,
   Amount INT,
   PaymentDate DATE,
   id_Leases INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Leases) REFERENCES Leases(id)
);

CREATE TABLE Amenities(
   id INT AUTO_INCREMENT,
   AmenitieName VARCHAR(50),
   State VARCHAR(50),
   id_Properties INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Properties) REFERENCES Properties(id)
);

CREATE TABLE Reviews(
   id INT AUTO_INCREMENT,
   Message VARCHAR(255),
   Rate INT,
   id_Tenants INT NOT NULL,
   id_Properties INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Tenants) REFERENCES Tenants(id),
   FOREIGN KEY(id_Properties) REFERENCES Properties(id)
);

CREATE TABLE users ( 
    user_id int auto_increment primary key,
    user_created datetime,
    user_name varchar(100) unique,
    user_email varchar(100) unique,
    user_role varchar(100),
    user_pass varchar(100)
);
