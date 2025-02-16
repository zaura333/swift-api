import Bank from "../../models/bank";
import Country from "../../models/country";
import { Op } from "sequelize";
import Town from "../../models/town";

interface SwiftCodeResponse {
  address: string;
  bankName: string;
  countryISO2: string;
  countryName: string;
  isHeadquarter: boolean;
  swiftCode: string;
  branches?: Bank[];
}

interface CountryCodeResponse {
  countryISO2: string;
  countryName: string;
  swiftCodes: BankResponse[];
}

interface BankResponse {
  address: string;
  bankName: string;
  countryISO2: string;
  isHeadquarter: boolean;
  swiftCode: string;
}

export const getCode = async (code: string) => {
  const bank = await Bank.findOne({
    where: { swiftCode: code },
  });
  if (!bank) {
    throw new Error("Bank not found");
  }

  const country = await Country.findOne({where: {iso2: bank.iso2}});

  const result: SwiftCodeResponse = {
    address: bank.address,
    bankName: bank.bankName,
    // Country cannot be null due to db constaints
    countryISO2: country!.iso2,
    countryName: country!.name,
    isHeadquarter: false,
    swiftCode: bank.swiftCode,
  };

  if (bank.swiftCode.endsWith("XXX")) {
    result.isHeadquarter = true;

    const hqCode = bank.swiftCode.slice(0, 8);

    result.branches = await Bank.findAll({
      where: {
        swiftCode: {
          [Op.iLike]: `${hqCode}%`,
        },
      },
    });
  }

  return result;
};

export const getCountryCodes = async (iso2: string) => {
  const country = await Country.findOne({where: {iso2: iso2}});

  if (!country) {
    throw new Error("Country not found");
  }

  const banks = await Bank.findAll({
    where: {
      iso2,
    },
  });

  const result: CountryCodeResponse = {
    countryISO2: country.iso2,
    countryName: country.name,
    swiftCodes: [],
  };

  for (const bank of banks) {
    const isHeadquarter = bank.swiftCode.endsWith("XXX") ? true : false;

    result.swiftCodes.push({
      address: bank.address,
      bankName: bank.bankName,
      countryISO2: country.iso2,
      isHeadquarter,
      swiftCode: bank.swiftCode,
    });
  }

  return result;
};

export const postCode = async (address: string, bankName: string, countryISO2: string, swiftCode: string) => {
  const country = await Country.findOne({
    where: { iso2: countryISO2 },
  });
  if (!country) {
    throw new Error("Country not found");
  }

  // Check if address is in the correct format
  if (!address.match(/^(?:[^;]+;[^;]+(?:;[^;]+;[^;]+)?)$/)) {
    throw new Error("Invalid address format");
  }

  const addressParts = address.split(";");
  let city = addressParts[0];

  if (addressParts.length === 2) {
    city = addressParts[1];
  }

  //Check if town in database and if not add it
  const town = await Town.findOrCreate({
    where: { name: city },
    defaults: { name: city, countryId: country.id },
  });

  const bank = await Bank.findOrCreate({
    where: { swiftCode },
    defaults: {
    address,
    bankName,
    iso2: countryISO2,
    swiftCode,
    townId: town[0].id,
    }
  });

  if (!bank[1]) {
    throw new Error("Swift code already exists");
  }
};

export const deleteCode = async (code: string) => {
  const bank = await Bank.findOne({
    where: { swiftCode: code },
  });
  if (!bank) {
    throw new Error("Bank not found");
  }

  await bank.destroy();
};
