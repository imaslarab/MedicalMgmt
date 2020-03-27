DROP TABLE Users CASCADE CONSTRAINTS;
DROP TABLE Employee CASCADE CONSTRAINTS;
DROP TABLE Admin CASCADE CONSTRAINTS;
DROP TABLE Doctor CASCADE CONSTRAINTS;
DROP TABLE Patient CASCADE CONSTRAINTS;
DROP TABLE Appointment CASCADE CONSTRAINTS;
DROP TABLE Diagnosis CASCADE CONSTRAINTS;
DROP TABLE Prescription CASCADE CONSTRAINTS;
DROP TABLE VisitDetail CASCADE CONSTRAINTS;
DROP TABLE BillingInfo_Billed CASCADE CONSTRAINTS;

CREATE TABLE Users(
userID CHAR(11),
name CHAR(40),
email CHAR(40),
password CHAR(40),
phone CHAR(11),
PRIMARY KEY (userID),
UNIQUE (email));

INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000001', 'Clara Lee', 'claral@gmail.com', 'clara123', '3472101835');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000002', 'Alex Blunt', 'alexb@gmail.com', 'alex123', '5512101835');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000003', 'Noah Johnson', 'noahj@gmail.com', 'noah123', '3472301846');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000004', 'Mason Smith', 'masons@gmail.com', 'mason123', '3472918768');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000005', 'Olivia Green', 'oliviag@gmail.com', 'olivia123', '3480129835');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000006', 'Jacob Wilson', 'jacobw@gmail.com', 'jacob123', '3652867564');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000007', 'Michael Miller', 'michaelm@gmail.com', 'michael123', '5526871743');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000008', 'James Brown', 'jamesb@gmail.com', 'james123', '9862863476');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000009', 'Daniel Jones', 'danielj@gmail.com', 'daniel123', '1987698245');
INSERT INTO Users(userID, name, email, password, phone) VALUES ('5120000010', 'Mia Davis', 'miad@gmail.com', 'mia123', '6652756834');

CREATE TABLE Employee(
userID CHAR(11),
PRIMARY KEY (userID),
FOREIGN KEY (userID) REFERENCES Users (userID));

INSERT INTO Employee(userID) VALUES ('5120000001');
INSERT INTO Employee(userID) VALUES ('5120000002');
INSERT INTO Employee(userID) VALUES ('5120000003');
INSERT INTO Employee(userID) VALUES ('5120000004');
INSERT INTO Employee(userID) VALUES ('5120000005');


CREATE TABLE Admin(
userID CHAR(11),
PRIMARY KEY (userID),
FOREIGN KEY (userID) REFERENCES Employee (userID));

INSERT INTO Admin(userID) VALUES ('5120000001');
INSERT INTO Admin(userID) VALUES ('5120000002');

CREATE TABLE Doctor(
doctorID CHAR(11),
speciality CHAR(100),
PRIMARY KEY (doctorID),
FOREIGN KEY (doctorID) REFERENCES Employee (userID));

INSERT INTO Doctor(doctorID, speciality) VALUES ('5120000003', 'INTERNAL MEDICINE, Urology');
INSERT INTO Doctor(doctorID, speciality) VALUES ('5120000004', 'SURGERY, NEUROLOGY');
INSERT INTO Doctor(doctorID, speciality) VALUES ('5120000005', 'EMERGENCY MEDICINE, SURGERY');

CREATE TABLE Patient(
patientID CHAR(11),
address CHAR(100),
PRIMARY KEY (patientID),
FOREIGN KEY (patientID) REFERENCES Users (userID));

INSERT INTO Patient(patientID, address) VALUES ('5120000006', '175 Freedom St, Brookline, MA');
INSERT INTO Patient(patientID, address) VALUES ('5120000007', '75 Elm St, Worcester, MA');
INSERT INTO Patient(patientID, address) VALUES ('5120000008', '258 St Paul St, Brookline, MA');
INSERT INTO Patient(patientID, address) VALUES ('5120000009', '32 Dwight St, Brookline, MA');
INSERT INTO Patient(patientID, address) VALUES ('5120000010', '86 Marshall St, Somerville, MA');

CREATE TABLE Appointment(
doctorID CHAR(11),
patientID CHAR(11),
appoint_date DATE,
PRIMARY KEY (patientID, doctorID, appoint_date),
FOREIGN KEY (patientID) REFERENCES Patient (patientID),
FOREIGN KEY (doctorID) REFERENCES Doctor (doctorID));

INSERT INTO Appointment(doctorID, patientID, appoint_date) VALUES ('5120000003', '5120000006', TO_DATE('2019/08/10', 'yyyy/mm/dd'));
INSERT INTO Appointment(doctorID, patientID, appoint_date) VALUES ('5120000004', '5120000007', TO_DATE('2019/08/10', 'yyyy/mm/dd'));
INSERT INTO Appointment(doctorID, patientID, appoint_date) VALUES ('5120000005', '5120000008', TO_DATE('2019/08/11', 'yyyy/mm/dd'));
INSERT INTO Appointment(doctorID, patientID, appoint_date) VALUES ('5120000004', '5120000009', TO_DATE('2019/08/12', 'yyyy/mm/dd'));
INSERT INTO Appointment(doctorID, patientID, appoint_date) VALUES ('5120000005', '5120000010', TO_DATE('2019/08/13', 'yyyy/mm/dd'));

CREATE TABLE Diagnosis(
diagnosisID CHAR(11),
description CHAR(200),
PRIMARY KEY (diagnosisID));

INSERT INTO Diagnosis(diagnosisID, description) VALUES ('0000001', 'laparoscopic gastric bypass');
INSERT INTO Diagnosis(diagnosisID, description) VALUES ('0000002', 'allergies');
INSERT INTO Diagnosis(diagnosisID, description) VALUES ('0000003', 'moyamoya disease');
INSERT INTO Diagnosis(diagnosisID, description) VALUES ('0000004', 'Vitreous hemorrhage');
INSERT INTO Diagnosis(diagnosisID, description) VALUES ('0000005', 'stenosis secondary to metallic stent extensive granulation and inflammatory tissue changes');
INSERT INTO Diagnosis(diagnosisID, description) VALUES ('0000006', 'Umbilical hernia');
INSERT INTO Diagnosis(diagnosisID, description) VALUES ('0000007', 'Urinary Retention');


CREATE TABLE Prescription(
prescriptionID CHAR(11),
description CHAR(200),
PRIMARY KEY (prescriptionID));

INSERT INTO Prescription(prescriptionID, description) VALUES ('0000001', 'gastric bypass surgery');
INSERT INTO Prescription(prescriptionID, description) VALUES ('0000002', 'Ortho Tri-Cyclen ');
INSERT INTO Prescription(prescriptionID, description) VALUES ('0000003', 'vascular bypass surgery or cerebral revascularization');
INSERT INTO Prescription(prescriptionID, description) VALUES ('0000004', 'Vitrectomy');
INSERT INTO Prescription(prescriptionID, description) VALUES ('0000005', 'Tracheostomy');
INSERT INTO Prescription(prescriptionID, description) VALUES ('0000006', 'Umbilical Hernia Repair');
INSERT INTO Prescription(prescriptionID, description) VALUES ('0000007', 'catheterization, treating prostate enlargement, and surgery');


CREATE TABLE VisitDetail(
diagnosisID CHAR(11),
prescriptionID CHAR(11),
doctorID CHAR(11),
patientID CHAR(11),
appoint_date DATE,
PRIMARY KEY (patientID, doctorID, appoint_date, diagnosisID, prescriptionID),
FOREIGN KEY (patientID, doctorID, appoint_date) REFERENCES Appointment (patientID, doctorID, appoint_date),
FOREIGN KEY (diagnosisID) REFERENCES Diagnosis (diagnosisID),
FOREIGN KEY (prescriptionID) REFERENCES Prescription (prescriptionID));

INSERT INTO VisitDetail(diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('0000001', '0000001', '5120000003', '5120000006', TO_DATE('2019/08/10', 'yyyy/mm/dd'));
INSERT INTO VisitDetail(diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('0000002', '0000002', '5120000005', '5120000010', TO_DATE('2019/08/13', 'yyyy/mm/dd'));
INSERT INTO VisitDetail(diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('0000004', '0000004', '5120000004', '5120000007', TO_DATE('2019/08/10', 'yyyy/mm/dd'));
INSERT INTO VisitDetail(diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('0000003', '0000003', '5120000004', '5120000009', TO_DATE('2019/08/12', 'yyyy/mm/dd'));
INSERT INTO VisitDetail(diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('0000005', '0000005', '5120000005', '5120000008', TO_DATE('2019/08/11', 'yyyy/mm/dd'));


CREATE TABLE BillingInfo_Billed(
billingID CHAR(11),
bill_date DATE,
bill_description CHAR(200),
amount REAL,
method CHAR(20),
diagnosisID CHAR(11),
prescriptionID CHAR(11),
doctorID CHAR(11),
patientID CHAR(11),
appoint_date DATE,
PRIMARY KEY (billingID, patientID, doctorID, appoint_date, diagnosisID, prescriptionID),
FOREIGN KEY (patientID, doctorID, appoint_date, diagnosisID, prescriptionID) REFERENCES VisitDetail (patientID, doctorID, appoint_date, diagnosisID, prescriptionID));

INSERT INTO BillingInfo_Billed(billingID, bill_date, bill_description, amount, method, diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('4213565', TO_DATE('2019/08/10', 'yyyy/mm/dd'), 'billing for appointment', 130.00, 'debit card', '0000001', '0000001', '5120000003', '5120000006', TO_DATE('2019/08/10', 'yyyy/mm/dd'));
INSERT INTO BillingInfo_Billed(billingID, bill_date, bill_description, amount, method, diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('4213763', TO_DATE('2019/08/13', 'yyyy/mm/dd'), 'billing for appointment', 288.65, 'credit card', '0000002', '0000002', '5120000005', '5120000010', TO_DATE('2019/08/13', 'yyyy/mm/dd'));
INSERT INTO BillingInfo_Billed(billingID, bill_date, bill_description, amount, method, diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('4213568', TO_DATE('2019/08/10', 'yyyy/mm/dd'), 'billing for appointment', 165.88, 'credit card', '0000004', '0000004', '5120000004', '5120000007', TO_DATE('2019/08/10', 'yyyy/mm/dd'));
INSERT INTO BillingInfo_Billed(billingID, bill_date, bill_description, amount, method, diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('4213666', TO_DATE('2019/08/12', 'yyyy/mm/dd'), 'billing for appointment', 320.12, 'credit card', '0000003', '0000003', '5120000004', '5120000009', TO_DATE('2019/08/12', 'yyyy/mm/dd'));
INSERT INTO BillingInfo_Billed(billingID, bill_date, bill_description, amount, method, diagnosisID, prescriptionID, doctorID, patientID, appoint_date) VALUES ('4213590', TO_DATE('2019/08/11', 'yyyy/mm/dd'), 'billing for appointment', 230.00, 'credit card', '0000005', '0000005', '5120000005', '5120000008', TO_DATE('2019/08/11', 'yyyy/mm/dd'));
