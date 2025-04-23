INSERT INTO "User" ("Id", "Name", "Email", "PasswordHash", "IsFoodMeatOk", "IsFoodPlantOk", "IsWaterOk", "IsElectricityOk", "IsCarPetrolOk", "IsCarDieselOk", "IsCarElectricOk", "IsCarHybridOk", "IsCarHydrogenOk", "IsCarMethaneOk", "IsCarPropaneOk", "IsPublicTransportOk", "IsTrainOk", "IsAirplaneOk", "IsFoodWasteOk", "IsOtherWasteOk", "IsPlasticWasteOk", "IsGlassWasteOk", "IsPaperWasteOk", "IsMetalWasteOk", "IsPlasticRecycledOk", "IsGlassRecycledOk", "IsPaperRecycledOk", "IsMetalRecycledOk") VALUES
(1, 'Nevaeh Hall', 'nevaeh-hall1@example.com', 'hashed_password_1', 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0),
(2, 'Nicole Phillips', 'nicole-phillips2@example.com', 'hashed_password_2', 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1),
(3, 'Claire Mitchell', 'claire-mitchell3@example.com', 'hashed_password_3', 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0),
(4, 'Amanda Scott', 'amanda-scott4@example.com', 'hashed_password_4', 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0),
(5, 'Alexis Martinez', 'alexis-martinez5@example.com', 'hashed_password_5', 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);

INSERT INTO "Household" ("Id", "UserId", "HouseType", "HeatingType", "ResidentCount") VALUES
(1, 1, 4, 1, 2),
(2, 2, 2, 4, 2),
(3, 3, 4, 2, 2),
(4, 4, 1, 5, 5),
(5, 5, 3, 3, 1);

INSERT INTO "Survey" ("Id", "UserId", "CompletedAt", "ReportedDays") VALUES
(1, 1, '2024-09-22T09:31:45', 4.14),
(2, 2, '2024-05-12T13:26:11', 6.06),
(3, 3, '2024-09-06T04:57:16', 11.58),
(4, 4, '2024-12-14T09:48:44', 8.18),
(5, 5, '2025-02-10T08:47:28', 7.17);

INSERT INTO "FoodData" ("Id", "SurveyId", "MeatEatenKg", "PlantEatenKg") VALUES
(1, 1, 2.0, 12.7),
(2, 2, 8.6, 8.6),
(3, 3, 3.3, 6.9),
(4, 4, 17.0, 3.5),
(5, 5, 16.4, 5.4);

INSERT INTO "ResourceData" ("Id", "SurveyId", "WaterConsumptionL", "ElectricityConsumptionKWtH") VALUES
(1, 1, 16742.0, 140.9),
(2, 2, 8645.0, 418.3),
(3, 3, 16356.0, 500.0),
(4, 4, 3425.0, 564.4),
(5, 5, 7695.0, 599.9);

INSERT INTO "TransportData" ("Id", "SurveyId", "PublicTransportDistanceKm", "AirplaneDistanceKm", "TrainDistanceKm", "CarDistanceKmPetrol", "CarDistanceKmDiesel", "CarDistanceKmElectric", "CarDistanceKmHybrid", "CarDistanceKmHydrogen", "CarDistanceKmMethane", "CarDistanceKmPropane") VALUES
(1, 1, 105.0, 1221.0, 84.0, 294.0, 185.0, 274.0, 172.0, 84.0, 252.0, 228.0),
(2, 2, 86.0, 331.0, 73.0, 292.0, 28.0, 251.0, 276.0, 228.0, 299.0, 204.0),
(3, 3, 100.0, 762.0, 48.0, 104.0, 275.0, 45.0, 67.0, 229.0, 156.0, 57.0),
(4, 4, 59.0, 830.0, 213.0, 24.0, 117.0, 154.0, 213.0, 255.0, 71.0, 54.0),
(5, 5, 100.0, 48.0, 33.0, 97.0, 92.0, 81.0, 212.0, 175.0, 282.0, 231.0);

INSERT INTO "WasteData" ("Id", "SurveyId", "FoodWasteKg", "OtherWasteKg", "PlasticWasteKg", "GlassWasteKg", "PaperWasteKg", "MetalWasteKg", "PlasticRecycledPercent", "GlassRecycledPercent", "PaperRecycledPercent", "MetalRecycledPercent") VALUES
(1, 1, 2.3, 5.0, 1.6, 1.1, 3.6, 0.2, 33.0, 70.0, 39.0, 46.0),
(2, 2, 2.8, 5.3, 2.1, 1.0, 1.4, 0.7, 69.0, 34.0, 77.0, 34.0),
(3, 3, 1.1, 5.2, 1.5, 0.4, 1.1, 1.3, 33.0, 73.0, 44.0, 94.0),
(4, 4, 3.8, 1.5, 0.5, 1.4, 1.4, 0.2, 41.0, 71.0, 47.0, 45.0),
(5, 5, 2.8, 5.3, 1.2, 1.5, 3.9, 0.5, 31.0, 54.0, 36.0, 48.0);

