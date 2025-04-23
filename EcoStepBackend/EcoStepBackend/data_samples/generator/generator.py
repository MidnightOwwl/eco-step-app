import sys
import argparse
from collections import namedtuple
import json
from pathlib import Path
import random
from datetime import datetime, timedelta

# Configuration
SURVEY_START_DATE = datetime.today() - timedelta(days=365)
SURVEY_END_DATE = datetime.today()

# Helper functions


def random_date(start: datetime, end: datetime):
    return datetime.fromtimestamp(random.randint(int(start.timestamp()), int(end.timestamp())))


def random_bool():
    return random.choice([1, 0])


def random_float(min_val, max_val, decimals=1):
    return round(random.uniform(min_val, max_val), decimals)


def rel_path(rel) -> Path:
    return Path(__file__).parent / rel
# Generate data


User = namedtuple("User", (
    "Id", "Name", "Email", "PasswordHash", "IsFoodMeatOk", "IsFoodPlantOk", "IsWaterOk", "IsElectricityOk", "IsCarPetrolOk", "IsCarDieselOk", "IsCarElectricOk", "IsCarHybridOk", "IsCarHydrogenOk", "IsCarMethaneOk", "IsCarPropaneOk",
                  "IsPublicTransportOk", "IsTrainOk", "IsAirplaneOk", "IsFoodWasteOk", "IsOtherWasteOk", "IsPlasticWasteOk", "IsGlassWasteOk", "IsPaperWasteOk", "IsMetalWasteOk", "IsPlasticRecycledOk", "IsGlassRecycledOk", "IsPaperRecycledOk", "IsMetalRecycledOk"))


def generate_users(num_users) -> list[User]:
    users = []
    first_names = rel_path("first_names.txt").read_text().strip().split('\n')
    last_names = rel_path("last_names.txt").read_text().strip().split('\n')

    for i in range(1, num_users + 1):
        first_name = random.choice(first_names)
        last_name = random.choice(last_names)
        user = {
            "Id": i,
            "Name": f"{first_name} {last_name}",
            "Email": f"{first_name.lower()}-{last_name.lower()}{i}@example.com",
            "PasswordHash": f"hashed_password_{i}",
            "IsFoodMeatOk": random_bool(),
            "IsFoodPlantOk": random_bool(),
            "IsWaterOk": random_bool(),
            "IsElectricityOk": random_bool(),
            "IsCarPetrolOk": random_bool(),
            "IsCarDieselOk": random_bool(),
            "IsCarElectricOk": random_bool(),
            "IsCarHybridOk": random_bool(),
            "IsCarHydrogenOk": random_bool(),
            "IsCarMethaneOk": random_bool(),
            "IsCarPropaneOk": random_bool(),
            "IsPublicTransportOk": random_bool(),
            "IsTrainOk": random_bool(),
            "IsAirplaneOk": random_bool(),
            "IsFoodWasteOk": random_bool(),
            "IsOtherWasteOk": random_bool(),
            "IsPlasticWasteOk": random_bool(),
            "IsGlassWasteOk": random_bool(),
            "IsPaperWasteOk": random_bool(),
            "IsMetalWasteOk": random_bool(),
            "IsPlasticRecycledOk": random_bool(),
            "IsGlassRecycledOk": random_bool(),
            "IsPaperRecycledOk": random_bool(),
            "IsMetalRecycledOk": random_bool()
        }
        users.append(User(**user))
    return users


Household = namedtuple('Household', ("Id", "UserId", "HouseType", "HeatingType", "ResidentCount"))


def generate_households(num_households) -> list[Household]:
    households = []
    house_types = range(5)
    heating_types = range(6)

    for i in range(1, num_households + 1):
        h = {
            "Id": i,
            "UserId": i,  # Assuming one household per user
            "HouseType": random.choice(house_types),
            "HeatingType": random.choice(heating_types),
            "ResidentCount": random.randint(1, 5)
        }
        households.append(Household(**h))
    return households


Survey = namedtuple("Survey", ("Id", "UserId", "CompletedAt", "ReportedDays"))


def generate_surveys(users: list[User], surveys_per_user) -> list[Survey]:
    surveys = []
    survey_id = 1

    for user in users:
        for _ in range(surveys_per_user):
            s = {
                "Id": survey_id,
                "UserId": user.Id,
                "CompletedAt": random_date(SURVEY_START_DATE, SURVEY_END_DATE).isoformat(),
                "ReportedDays": random_float(1.0, 14.0, 2)
            }
            surveys.append(Survey(**s))
            survey_id += 1
    return surveys


FoodData = namedtuple('FoodData', ("Id", "SurveyId", "MeatEatenKg", "PlantEatenKg"))


def generate_food_data(surveys: list[Survey]) -> list[FoodData]:
    food_data = []

    for survey in surveys:
        meat_eaten = random_float(0, 20)
        plant_eaten = random_float(0, 20)

        f = {
            "Id": survey.Id,  # Using survey ID as food data ID for simplicity
            "SurveyId": survey.Id,
            "MeatEatenKg": meat_eaten,
            "PlantEatenKg": plant_eaten
        }
        food_data.append(FoodData(**f))
    return food_data


ResourceData = namedtuple("ResourceData", ("Id", "SurveyId", "WaterConsumptionL", "ElectricityConsumptionKWtH"))


def generate_resource_data(surveys: list[Survey]) -> list[ResourceData]:
    resource_data = []

    for survey in surveys:
        r = {
            "Id": survey.Id,  # Using survey ID as resource data ID for simplicity
            "SurveyId": survey.Id,
            "WaterConsumptionL": random_float(20, 20000, 0),
            "ElectricityConsumptionKWtH": random_float(1, 600, 1)
        }
        resource_data.append(ResourceData(**r))
    return resource_data


TransportData = namedtuple("TransportData", ("Id", "SurveyId", "PublicTransportDistanceKm", "AirplaneDistanceKm", "TrainDistanceKm", "CarDistanceKmPetrol",
                           "CarDistanceKmDiesel", "CarDistanceKmElectric", "CarDistanceKmHybrid", "CarDistanceKmHydrogen", "CarDistanceKmMethane", "CarDistanceKmPropane"))


def generate_transport_data(surveys: list[Survey]) -> list[TransportData]:
    transport_data = []

    for survey in surveys:
        t = {
            "Id": survey.Id,  # Using survey ID as transport data ID for simplicity
            "SurveyId": survey.Id,
            "PublicTransportDistanceKm": random_float(0, 150, 0),
            "AirplaneDistanceKm": random_float(0, 1500, 0),
            "TrainDistanceKm": random_float(0, 300, 0),
            "CarDistanceKmPetrol": random_float(0, 300, 0),
            "CarDistanceKmDiesel": random_float(0, 300, 0),
            "CarDistanceKmElectric": random_float(0, 300, 0),
            "CarDistanceKmHybrid": random_float(0, 300, 0),
            "CarDistanceKmHydrogen": random_float(0, 300, 0),
            "CarDistanceKmMethane": random_float(0, 300, 0),
            "CarDistanceKmPropane": random_float(0, 300, 0),
        }
        transport_data.append(TransportData(**t))
    return transport_data


WasteData = namedtuple("WasteData", ("Id", "SurveyId", "FoodWasteKg", "OtherWasteKg", "PlasticWasteKg", "GlassWasteKg", "PaperWasteKg",
                       "MetalWasteKg", "PlasticRecycledPercent", "GlassRecycledPercent", "PaperRecycledPercent", "MetalRecycledPercent"))


def generate_waste_data(surveys: list[Survey]) -> list[WasteData]:
    waste_data = []

    for survey in surveys:
        w = {
            "Id": survey.Id,  # Using survey ID as waste data ID for simplicity
            "SurveyId": survey.Id,
            "FoodWasteKg": random_float(0.5, 4.0, 1),
            "OtherWasteKg": random_float(1.0, 6.0, 1),
            "PlasticWasteKg": random_float(0.5, 2.5, 1),
            "GlassWasteKg": random_float(0.3, 1.8, 1),
            "PaperWasteKg": random_float(1.0, 4.0, 1),
            "MetalWasteKg": random_float(0.2, 1.5, 1),
            "PlasticRecycledPercent": random_float(30, 95, 0),
            "GlassRecycledPercent": random_float(30, 95, 0),
            "PaperRecycledPercent": random_float(30, 95, 0),
            "MetalRecycledPercent": random_float(30, 95, 0),
        }
        waste_data.append(WasteData(**w))
    return waste_data


# Generate all data


def _format_row(row):
    result = []
    for v in row:
        if isinstance(v, str):
            result.append(f"'{v}'")
        else:
            result.append(str(v))

    return f"({', '.join(result)})"


def make_sql_insert_statement(table_name, fields, values):
    fields = ', '.join(f'"{field}"' for field in fields)
    values = ',\n'.join(_format_row(row) for row in values)
    return f"INSERT INTO \"{table_name}\" ({fields}) VALUES\n{values};"


parser = argparse.ArgumentParser(description='Survey configuration tool')
parser.add_argument('users', type=int, help='Number of users')
parser.add_argument('surveys', type=int, help='Number of surveys per user')
parser.add_argument('output_file', nargs='?', type=argparse.FileType(
    'w'), default='-', help='Output file, defaults to "-" which means stdout')

if len(sys.argv) == 1:
    parser.print_help()
    sys.exit(1)
args = parser.parse_args()

users_count = args.users
surveys_per_user = args.surveys
out_file = args.output_file

users = generate_users(users_count)
surveys = generate_surveys(users, surveys_per_user)
tables = [
    users,
    generate_households(users_count),
    surveys,
    generate_food_data(surveys),
    generate_resource_data(surveys),
    generate_transport_data(surveys),
    generate_waste_data(surveys),
]

for table in tables:
    t = type(table[0])
    name = t.__name__
    fields = t._fields
    out_file.write(make_sql_insert_statement(name, fields, table) + '\n\n')
