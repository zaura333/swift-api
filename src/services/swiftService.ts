import Bank from "../../models/bank";
import Town from "../../models/town";
import Country from "../../models/country";
import { Op } from "sequelize";

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
    return null;
  }

  const country = await Country.findByPk(bank.iso2);

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
  const country = await Country.findOne({
    where: { iso2 },
  });
  if (!country) {
    return null;
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
