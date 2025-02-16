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

export const getCode = async (code: string) => {
  const bank = await Bank.findOne({
    where: { swiftCode: code },
  });
  if (!bank) {
    return null;
  }

  const town = await Town.findByPk(bank.townId);
  // Town cannot be null due to db constaints
  const country = await Country.findByPk(town!.countryId);

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
