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

CREATE TABLE Rent(
   id_Properties INT,
   id_Tenants INT,
   PRIMARY KEY(id_Properties, id_Tenants),
   FOREIGN KEY(id_Properties) REFERENCES Properties(id),
   FOREIGN KEY(id_Tenants) REFERENCES Tenants(id)
);

-- Insertion de données fictives dans la table Tenants
INSERT INTO Tenants (FirstName, LastName, Email, PhoneNumber)
VALUES
    ('Sophie', 'Dupont', 'sophie.dupont@email.com', '0612345678'),
    ('Pierre', 'Martin', 'pierre.martin@email.com', '0678901234'),
    ('Julie', 'Lefebvre', 'julie.lefebvre@email.com', '0623456789'),
    ('Nicolas', 'Bertrand', 'nicolas.bertrand@email.com', '0712345678'),
    ('Céline', 'Dubois', 'celine.dubois@email.com', '0789012345'),
    ('Thierry', 'Leclerc', 'thierry.leclerc@email.com', '0612345678'),
    ('Laure', 'Mercier', 'laure.mercier@email.com', '0623456789'),
    ('Antoine', 'Thomas', 'antoine.thomas@email.com', '0712345678'),
    ('Caroline', 'Dufresne', 'caroline.dufresne@email.com', '0678901234'),
    ('Luc', 'Girard', 'luc.girard@email.com', '0789012345');

-- Insertion de données fictives dans la table Landlords
INSERT INTO Landlords (FirstName, LastName, Email, PhoneNumber)
VALUES
    ('Jean', 'Roux', 'jean.roux@email.com', '0687654321'),
    ('Marie', 'Lemoine', 'marie.lemoine@email.com', '0765432190'),
    ('Éric', 'Gagnon', 'eric.gagnon@email.com', '0690123456'),
    ('Isabelle', 'Morin', 'isabelle.morin@email.com', '0754321098'),
    ('Philippe', 'Roy', 'philippe.roy@email.com', '0712345678'),
    ('Sandrine', 'Bouchard', 'sandrine.bouchard@email.com', '0787654321'),
    ('François', 'Tremblay', 'francois.tremblay@email.com', '0687654321'),
    ('Mélanie', 'Lapointe', 'melanie.lapointe@email.com', '0765432190'),
    ('Mathieu', 'Pelletier', 'mathieu.pelletier@email.com', '0690123456'),
    ('Carole', 'Lavoie', 'carole.lavoie@email.com', '0712345678');

-- Insert data part--
INSERT INTO Tenants (FirstName, LastName, Email, PhoneNumber)
VALUES
    ('Sophie', 'Dupont', 'sophie.dupont@email.com', '0612345678'),
    ('Pierre', 'Martin', 'pierre.martin@email.com', '0678901234'),
    ('Julie', 'Lefebvre', 'julie.lefebvre@email.com', '0623456789'),
    ('Nicolas', 'Bertrand', 'nicolas.bertrand@email.com', '0712345678'),
    ('Céline', 'Dubois', 'celine.dubois@email.com', '0789012345'),
    ('Thierry', 'Leclerc', 'thierry.leclerc@email.com', '0612345678'),
    ('Laure', 'Mercier', 'laure.mercier@email.com', '0623456789'),
    ('Antoine', 'Thomas', 'antoine.thomas@email.com', '0712345678'),
    ('Caroline', 'Dufresne', 'caroline.dufresne@email.com', '0678901234'),
    ('Luc', 'Girard', 'luc.girard@email.com', '0789012345');
    
INSERT INTO Landlords (FirstName, LastName, Email, PhoneNumber)
VALUES
    ('Jean', 'Roux', 'jean.roux@email.com', '0687654321'),
    ('Marie', 'Lemoine', 'marie.lemoine@email.com', '0765432190'),
    ('Éric', 'Gagnon', 'eric.gagnon@email.com', '0690123456'),
    ('Isabelle', 'Morin', 'isabelle.morin@email.com', '0754321098'),
    ('Philippe', 'Roy', 'philippe.roy@email.com', '0712345678'),
    ('Sandrine', 'Bouchard', 'sandrine.bouchard@email.com', '0787654321'),
    ('François', 'Tremblay', 'francois.tremblay@email.com', '0687654321'),
    ('Mélanie', 'Lapointe', 'melanie.lapointe@email.com', '0765432190'),
    ('Mathieu', 'Pelletier', 'mathieu.pelletier@email.com', '0690123456'),
    ('Carole', 'Lavoie', 'carole.lavoie@email.com', '0712345678');
    
INSERT INTO Properties (Address, City, ZipCode, NumberOfBedrooms, NumberOfBathrooms, Rent, id_Landlords)
VALUES
    ('1 Rue de la Liberté', 'Paris', 75001, 2, 1, 1500.00, 1),
    ('123 Avenue des Roses', 'Marseille', 13001, 3, 2, 2000.00, 2),
    ('456 Rue de la Paix', 'Lyon', 69001, 1, 1, 1200.00, 3),
    ('789 Boulevard du Soleil', 'Nice', 06001, 4, 2, 2500.00, 4),
    ('234 Rue de la Mer', 'Bordeaux', 33001, 2, 1, 1600.00, 5),
    ('76 Avenue des Champs', 'Toulouse', 31001, 3, 2, 1800.00, 6),
    ('980 Boulevard du Mont', 'Lille', 59001, 2, 1, 1400.00, 7),
    ('123 Rue de la Forêt', 'Strasbourg', 67001, 1, 1, 1100.00, 8),
    ('456 Avenue de la Rivière', 'Nantes', 44001, 2, 1, 1300.00, 9),
    ('23 Rue des Montagnes', 'Montpellier', 34001, 3, 2, 1900.00, 10);
    
    

INSERT INTO Leases (LeaseStart, LeaseEnd, MonthlyRent, SecurityDeposit, id_Properties, id_Tenants)
VALUES
    ('2023-01-15', '2024-01-14', 1500, 2000, 1, 1),
    ('2023-02-20', '2024-02-19', 2000, 2500, 2, 2),
    ('2023-03-10', '2024-03-09', 1200, 1500, 3, 3),
    ('2023-04-05', '2024-04-04', 2500, 3000, 4, 4),
    ('2023-05-20', '2024-05-19', 1600, 2000, 5, 5),
    ('2023-06-15', '2024-06-14', 1800, 2500, 6, 6),
    ('2023-07-10', '2024-07-09', 1400, 1800, 7, 7),
    ('2023-08-25', '2024-08-24', 1100, 1500, 8, 8),
    ('2023-09-30', '2024-09-29', 1300, 1800, 9, 9),
    ('2023-10-12', '2024-10-11', 1900, 2500, 10, 10);
    
    
INSERT INTO Payments (Amount, PaymentDate, id_Leases)
VALUES
    (1500, '2023-01-15', 1),
    (2000, '2023-02-20', 2),
    (1200, '2023-03-10', 3),
    (2500, '2023-04-05', 4),
    (1600, '2023-05-20', 5),
    (1800, '2023-06-15', 6),
    (1400, '2023-07-10', 7),
    (1100, '2023-08-25', 8),
    (1300, '2023-09-30', 9),
    (1900, '2023-10-12', 10);

INSERT INTO Reviews (Message, Rate, id_Tenants, id_Properties)
VALUES
    ('Great place to live! Very spacious and well-maintained.', 5, 1, 1),
    ('The location is excellent. I love the neighborhood.', 4, 2, 2),
    ('The parking situation could be better, but the apartment is nice.', 3, 3, 3),
    ('The view from the apartment is breathtaking! Highly recommended.', 5, 4, 4),
    ('A very cozy and comfortable place. I really enjoy living here.', 4, 5, 5),
    ('The gym in the building is a great addition. Love the amenities.', 5, 6, 6),
    ('The apartment is in a convenient location. Good value for the rent.', 4, 7, 7),
    ('The landlord is very responsive and takes care of maintenance quickly.', 5, 8, 8),
    ('Nice and quiet neighborhood. Im happy with my choice.', 4, 9, 9),
    ('The property has a beautiful garden. Peaceful and serene.', 5, 10, 10);
