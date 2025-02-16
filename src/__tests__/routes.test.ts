import request from 'supertest';
import express from 'express';
import routes from '../routes/routes';
import * as service from '../services/swiftService';

const app = express();
app.use(express.json());
app.use('/api', routes);

jest.mock('../services/swiftService');

describe('GET endpoints', () => {
  it('should get swift codes by country code', async () => {
    const mockResponse = {
      countryISO2: 'AL',
      countryName: 'ALBANIA',
      swiftCodes: [
        {
          address: 'HYRJA 3 RR. DRITAN HOXHA ND. 11 TIRANA, TIRANA, 1023',
          bankName: 'UNITED BANK OF ALBANIA SH.A',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'AAISALTRXXX',
        },
        {
          address: 'VASO PASHA 8  TIRANA, TIRANA, 1019',
          bankName: 'CREDINS BANK S.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'CDISALTRXXX',
        },
        {
          address: 'TIRANA, TIRANA',
          bankName: 'BANKA OTP ALBANIA SH.A',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'CRBAALTRXXX',
        },
        {
          address: 'HYRJA 1 RRUGA E KAVAJES NDERTESA 27 TIRANA, TIRANA, 1001',
          bankName: 'AMERICAN BANK OF INVESTMENTS S.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'EMPOALTRXXX',
        },
        {
          address:
            'H. 15 RRUGA DRITAN HOXHA, NJESIA BASHKIAKE 11 TIRANA, TIRANA, 1023',
          bankName: 'PROCREDIT BANK SH. A. ALBANIA (FORMERLY FEFAD BANK)',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'FEFAALTRXXX',
        },
        {
          address:
            'TWIN TOWERS NO.2 BLVD.DESHMORET E KOMBIT TIRANA, TIRANA, 1010',
          bankName: 'FIRST INVESTMENT BANK-ALBANIA SH.A',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'FINVALTRXXX',
        },
        {
          address: 'BLVD DESHMORET E KOMBIT 3  TIRANA, TIRANA, 1001',
          bankName: 'MINISTRY OF FINANCE OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'MIFBALTRXXX',
        },
        {
          address: 'RRUGA E VILAVE, LUNDER 1  TIRANA, TIRANA, 1045',
          bankName: 'BANKA KOMBETARE TREGTARE SH.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'NCBAALTXXXX',
        },
        {
          address:
            'TWIN TOWERS 1ST TOWER BLVD.DESHMORET E KOMBIT TIRANA, TIRANA, 1010',
          bankName: 'BANKA OTP ALBANIA SH.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'PUPPALTRXXX',
        },
        {
          address: "RR 'DESHMORET E 4 SHKURTIT' 6  TIRANA, TIRANA, 1010",
          bankName: 'RAIFFEISEN BANK SH.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'SGSBALTXXXX',
        },
        {
          address:
            "POSTAVE DREJTORIA E PERGJITHSHME E RR.'RESHIT COLLAKU' 4 TIRANA, TIRANA, 1005",
          bankName: 'POSTA SHQIPTARE SH.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'SHQHALT1XXX',
        },
        {
          address: 'SHESHI SKONDERBEJ 1  TIRANA, TIRANA, 1001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'STANALTRXXX',
        },
        {
          address: 'IBRAHIM RUGOVA STR  TIRANA, TIRANA, 1019',
          bankName: 'TIRANA BANK',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'TIRBALTRXXX',
        },
        {
          address:
            'FLOOR 13 BULVARDI ZOGU I, KATESH PERBALLE STACIONIT TE TRENIT TIRANA, TIRANA, 1016',
          bankName: 'UNION BANK SH.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'UNALALTRXXX',
        },
        {
          address: 'RRUGA ISMAIL QEMALI 27  TIRANA, TIRANA, 1001',
          bankName: 'INTESA SANPAOLO BANK ALBANIA SH.A.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'USALALTRXXX',
        },
        {
          address: 'ELBASAN, ELBASAN, 3001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: false,
          swiftCode: 'STANALT1ELX',
        },
        {
          address: 'GJIROKASTER, GJIROKASTER, 6001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: false,
          swiftCode: 'STANALT1GJX',
        },
        {
          address: 'KORCE, KORCE, 7000',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: false,
          swiftCode: 'STANALT1KOX',
        },
        {
          address: 'LUSHNJE, FIER, 9001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: false,
          swiftCode: 'STANALT1LUX',
        },
        {
          address: 'SHKODER, SHKODER, 4001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: false,
          swiftCode: 'STANALT1SHX',
        },
        {
          address: 'TIRANA, TIRANA, 1001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: false,
          swiftCode: 'STANALT1SPX',
        },
        {
          address: 'ISH KOMBINATI USHQIMOR KAVAJA STREET TIRANA, TIRANA, 1001',
          bankName: 'BRITISH AMERICAN TOBACCO - ALBANIA SH.P.K.',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'BATSALT1XXX',
        },
        {
          address: 'SHESHI SKENDERBEJ 1  TIRANA, TIRANA, 1001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'STANALTSXXX',
        },
        {
          address:
            'AP 3, KATI 1, FLOOR 3 RRUGA NIKOLLA TUPE 1, NJESIA BASHKIAKE 5 TIRANA, TIRANA, 1001',
          bankName: 'ALBANIAN SECURITIES REGISTER ALREG',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'RSTAALTTXXX',
        },
        {
          address: 'TIRANA, TIRANA, 1001',
          bankName: 'BANK OF ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'STANALTAXXX',
        },
        {
          address:
            'PALLATI DONIKA, FLOOR KATI 3 RR. FADIL RADA TIRANA, TIRANA, 1001',
          bankName: 'PAYSERA ALBANIA',
          countryISO2: 'AL',
          isHeadquarter: true,
          swiftCode: 'PYALALT2XXX',
        },
      ],
    };
    (service.getCountryCodes as jest.Mock).mockResolvedValue(mockResponse);
    (service.getCode as jest.Mock).mockResolvedValue(mockResponse);

    const response = await request(app).get('/api/swift-codes/AL');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should return 404 for invalid country code', async () => {
    (service.getCountryCodes as jest.Mock).mockRejectedValue(
      new Error('Country not found')
    );
    const response = await request(app).get('/api/swift-codes/XX');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Country not found' });
  });

  it('should get swift code details for branch', async () => {
    const mockResponse = {
      address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
      bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
      countryISO2: 'PL',
      countryName: 'POLAND',
      isHeadquarter: false,
      swiftCode: 'TPEOPLPWP45',
    };
    (service.getCode as jest.Mock).mockResolvedValue(mockResponse);
    const response = await request(app).get('/api/swift-codes/TPEOPLPWP45');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should get swift code details for headquarter', async () => {
    const mockResponse = {
      address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
      bankName: 'PEKAO TFI S.A.',
      countryISO2: 'PL',
      countryName: 'POLAND',
      isHeadquarter: true,
      swiftCode: 'TPEOPLPWXXX',
      branches: [
        {
          id: 979,
          createdAt: '2025-02-16T13:04:34.596Z',
          updatedAt: '2025-02-16T13:04:34.596Z',
          swiftCode: 'TPEOPLPWXXX',
          codeType: 'BIC11',
          bankName: 'PEKAO TFI S.A.',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1010,
          createdAt: '2025-02-16T13:04:35.028Z',
          updatedAt: '2025-02-16T13:04:35.028Z',
          swiftCode: 'TPEOPLPWAAS',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1011,
          createdAt: '2025-02-16T13:04:35.043Z',
          updatedAt: '2025-02-16T13:04:35.043Z',
          swiftCode: 'TPEOPLPWARW',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1012,
          createdAt: '2025-02-16T13:04:35.058Z',
          updatedAt: '2025-02-16T13:04:35.058Z',
          swiftCode: 'TPEOPLPWASZ',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1013,
          createdAt: '2025-02-16T13:04:35.073Z',
          updatedAt: '2025-02-16T13:04:35.073Z',
          swiftCode: 'TPEOPLPWAUS',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1014,
          createdAt: '2025-02-16T13:04:35.088Z',
          updatedAt: '2025-02-16T13:04:35.088Z',
          swiftCode: 'TPEOPLPWB15',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1015,
          createdAt: '2025-02-16T13:04:35.102Z',
          updatedAt: '2025-02-16T13:04:35.102Z',
          swiftCode: 'TPEOPLPWBOW',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1016,
          createdAt: '2025-02-16T13:04:35.116Z',
          updatedAt: '2025-02-16T13:04:35.116Z',
          swiftCode: 'TPEOPLPWCHI',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1017,
          createdAt: '2025-02-16T13:04:35.130Z',
          updatedAt: '2025-02-16T13:04:35.130Z',
          swiftCode: 'TPEOPLPWDA2',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1018,
          createdAt: '2025-02-16T13:04:35.145Z',
          updatedAt: '2025-02-16T13:04:35.145Z',
          swiftCode: 'TPEOPLPWDUS',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1019,
          createdAt: '2025-02-16T13:04:35.160Z',
          updatedAt: '2025-02-16T13:04:35.160Z',
          swiftCode: 'TPEOPLPWEKO',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1020,
          createdAt: '2025-02-16T13:04:35.174Z',
          updatedAt: '2025-02-16T13:04:35.174Z',
          swiftCode: 'TPEOPLPWKOM',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1021,
          createdAt: '2025-02-16T13:04:35.190Z',
          updatedAt: '2025-02-16T13:04:35.190Z',
          swiftCode: 'TPEOPLPWKON',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1022,
          createdAt: '2025-02-16T13:04:35.205Z',
          updatedAt: '2025-02-16T13:04:35.205Z',
          swiftCode: 'TPEOPLPWKOP',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1023,
          createdAt: '2025-02-16T13:04:35.219Z',
          updatedAt: '2025-02-16T13:04:35.219Z',
          swiftCode: 'TPEOPLPWMEG',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1024,
          createdAt: '2025-02-16T13:04:35.233Z',
          updatedAt: '2025-02-16T13:04:35.233Z',
          swiftCode: 'TPEOPLPWOBP',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1025,
          createdAt: '2025-02-16T13:04:35.248Z',
          updatedAt: '2025-02-16T13:04:35.248Z',
          swiftCode: 'TPEOPLPWODO',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1026,
          createdAt: '2025-02-16T13:04:35.262Z',
          updatedAt: '2025-02-16T13:04:35.262Z',
          swiftCode: 'TPEOPLPWODP',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1027,
          createdAt: '2025-02-16T13:04:35.275Z',
          updatedAt: '2025-02-16T13:04:35.275Z',
          swiftCode: 'TPEOPLPWOST',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1028,
          createdAt: '2025-02-16T13:04:35.289Z',
          updatedAt: '2025-02-16T13:04:35.289Z',
          swiftCode: 'TPEOPLPWPAD',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1029,
          createdAt: '2025-02-16T13:04:35.304Z',
          updatedAt: '2025-02-16T13:04:35.304Z',
          swiftCode: 'TPEOPLPWPDA',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1030,
          createdAt: '2025-02-16T13:04:35.318Z',
          updatedAt: '2025-02-16T13:04:35.318Z',
          swiftCode: 'TPEOPLPWPDS',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1031,
          createdAt: '2025-02-16T13:04:35.331Z',
          updatedAt: '2025-02-16T13:04:35.331Z',
          swiftCode: 'TPEOPLPWPOS',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1032,
          createdAt: '2025-02-16T13:04:35.346Z',
          updatedAt: '2025-02-16T13:04:35.346Z',
          swiftCode: 'TPEOPLPWSEN',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1033,
          createdAt: '2025-02-16T13:04:35.359Z',
          updatedAt: '2025-02-16T13:04:35.359Z',
          swiftCode: 'TPEOPLPWSGD',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1034,
          createdAt: '2025-02-16T13:04:35.373Z',
          updatedAt: '2025-02-16T13:04:35.373Z',
          swiftCode: 'TPEOPLPWSGF',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1035,
          createdAt: '2025-02-16T13:04:35.387Z',
          updatedAt: '2025-02-16T13:04:35.387Z',
          swiftCode: 'TPEOPLPWSGK',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1036,
          createdAt: '2025-02-16T13:04:35.401Z',
          updatedAt: '2025-02-16T13:04:35.401Z',
          swiftCode: 'TPEOPLPWSIN',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1037,
          createdAt: '2025-02-16T13:04:35.416Z',
          updatedAt: '2025-02-16T13:04:35.416Z',
          swiftCode: 'TPEOPLPWSRR',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1038,
          createdAt: '2025-02-16T13:04:35.429Z',
          updatedAt: '2025-02-16T13:04:35.429Z',
          swiftCode: 'TPEOPLPWSTW',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1039,
          createdAt: '2025-02-16T13:04:35.443Z',
          updatedAt: '2025-02-16T13:04:35.443Z',
          swiftCode: 'TPEOPLPWZRO',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1040,
          createdAt: '2025-02-16T13:04:35.457Z',
          updatedAt: '2025-02-16T13:04:35.457Z',
          swiftCode: 'TPEOPLPWOEP',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1041,
          createdAt: '2025-02-16T13:04:35.471Z',
          updatedAt: '2025-02-16T13:04:35.471Z',
          swiftCode: 'TPEOPLPWP20',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1042,
          createdAt: '2025-02-16T13:04:35.485Z',
          updatedAt: '2025-02-16T13:04:35.485Z',
          swiftCode: 'TPEOPLPWP25',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1043,
          createdAt: '2025-02-16T13:04:35.500Z',
          updatedAt: '2025-02-16T13:04:35.500Z',
          swiftCode: 'TPEOPLPWP30',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1044,
          createdAt: '2025-02-16T13:04:35.513Z',
          updatedAt: '2025-02-16T13:04:35.513Z',
          swiftCode: 'TPEOPLPWP35',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1045,
          createdAt: '2025-02-16T13:04:35.527Z',
          updatedAt: '2025-02-16T13:04:35.527Z',
          swiftCode: 'TPEOPLPWP40',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1046,
          createdAt: '2025-02-16T13:04:35.542Z',
          updatedAt: '2025-02-16T13:04:35.542Z',
          swiftCode: 'TPEOPLPWP45',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1047,
          createdAt: '2025-02-16T13:04:35.559Z',
          updatedAt: '2025-02-16T13:04:35.559Z',
          swiftCode: 'TPEOPLPWP50',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1048,
          createdAt: '2025-02-16T13:04:35.576Z',
          updatedAt: '2025-02-16T13:04:35.576Z',
          swiftCode: 'TPEOPLPWP55',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1049,
          createdAt: '2025-02-16T13:04:35.590Z',
          updatedAt: '2025-02-16T13:04:35.590Z',
          swiftCode: 'TPEOPLPWP60',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1050,
          createdAt: '2025-02-16T13:04:35.604Z',
          updatedAt: '2025-02-16T13:04:35.604Z',
          swiftCode: 'TPEOPLPWP65',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1051,
          createdAt: '2025-02-16T13:04:35.618Z',
          updatedAt: '2025-02-16T13:04:35.618Z',
          swiftCode: 'TPEOPLPWPAE',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1052,
          createdAt: '2025-02-16T13:04:35.632Z',
          updatedAt: '2025-02-16T13:04:35.632Z',
          swiftCode: 'TPEOPLPWPFI',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1053,
          createdAt: '2025-02-16T13:04:35.645Z',
          updatedAt: '2025-02-16T13:04:35.645Z',
          swiftCode: 'TPEOPLPWPOD',
          codeType: 'BIC11',
          bankName: 'PEKAO TOWARZYSTWO FUNDUSZY  INWESTYCYJNYCH SPOLKA AKCYJNA',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
        {
          id: 1055,
          createdAt: '2025-02-16T13:04:35.674Z',
          updatedAt: '2025-02-16T13:04:35.674Z',
          swiftCode: 'TPEOPLPWZRA',
          codeType: 'BIC11',
          bankName: 'PEKAO TFI S.A.',
          address: 'FOREST ZUBRA 1, FLOOR 1 WARSZAWA, MAZOWIECKIE, 01-066',
          iso2: 'PL',
          townId: 9,
        },
      ],
    };
    (service.getCode as jest.Mock).mockResolvedValue(mockResponse);
    const response = await request(app).get('/api/swift-codes/TPEOPLPWXXX');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('should return 404 when SWIFT code does not exist', async () => {
    (service.getCode as jest.Mock).mockRejectedValue(
      new Error('Swift code not found')
    );

    const response = await request(app).get('/api/swift-codes/12345678901');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Swift code not found' });
  });

  it('should return 400 for invalid code format (not 2 or 11 char length)', async () => {
    (service.getCode as jest.Mock).mockResolvedValue(null);
    const response = await request(app).get('/api/swift-codes/INVALID');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error:
        'Invalid code format. Please type 11-character SWIFT code or ISO2 country code.',
    });
  });
});

describe('POST endpoints', () => {
  it('should return 400 for missing required fields', async () => {
    (service.postCode as jest.Mock).mockResolvedValue(null);
    const response = await request(app).post('/api/swift-codes').send({
      address: 'TESTTOWN;TESTPROVINCE',
      bankName: 'TEST',
      countryName: 'POLAND',
      isHeadquarter: true,
      swiftCode: '12345678XXX',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Missing required fields.',
    });
  });

  it('should return 400 for invalid country code', async () => {
    (service.postCode as jest.Mock).mockRejectedValue(
      new Error('Country not found')
    );
    const response = await request(app).post('/api/swift-codes').send({
      address: 'TESTTOWN;TESTPROVINCE',
      bankName: 'TEST',
      countryISO2: 'Invalid',
      countryName: 'POLAND',
      isHeadquarter: true,
      swiftCode: '12345678XXX',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Country not found',
    });
  });

  it('should return 400 for invalid country code', async () => {
    (service.postCode as jest.Mock).mockRejectedValue(
      new Error('Invalid address format')
    );
    const response = await request(app).post('/api/swift-codes').send({
      address: 'TESTTOWN, TESTPROVINCE',
      bankName: 'TEST',
      countryISO2: 'PL',
      countryName: 'POLAND',
      isHeadquarter: true,
      swiftCode: '12345678XXX',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid address format',
    });
  });

  it('should return 400 for invalid country code', async () => {
    (service.postCode as jest.Mock).mockRejectedValue(
      new Error('Swift code already exists')
    );
    const response = await request(app).post('/api/swift-codes').send({
      address: 'TESTTOWN; TESTPROVINCE',
      bankName: 'TEST',
      countryISO2: 'PL',
      countryName: 'POLAND',
      isHeadquarter: true,
      swiftCode: 'TPEOPLPWAAS',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Swift code already exists',
    });
  });

  it('should return 201 for successfully created SWIFT code', async () => {
    (service.postCode as jest.Mock).mockResolvedValue({
      message: 'Swift code added successfully.',
    });
    const response = await request(app).post('/api/swift-codes').send({
      address: 'TESTTOWN; testprovince',
      bankName: 'TEST',
      countryISO2: 'pL',
      countryName: 'poland',
      isHeadquarter: false,
      swiftCode: '12345678901',
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Swift code added successfully.',
    });
  });
});

describe('DELETE endpoints', () => {
  it('should return 201 for successfully deleted SWIFT code', async () => {
    (service.deleteCode as jest.Mock).mockResolvedValue({
      message: 'Swift code deleted successfully.',
    });
    const response = await request(app).delete('/api/swift-codes/12345678901');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Swift code deleted successfully.',
    });
  });

  it('should return 404 for SWIFT code not found', async () => {
    (service.deleteCode as jest.Mock).mockRejectedValue(
      new Error('Swift code not found')
    );
    const response = await request(app).delete('/api/swift-codes/12345678901');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Swift code not found',
    });
  });
});
