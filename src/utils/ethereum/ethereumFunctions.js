import { ethers } from 'ethers';
import axios from 'axios';

const abiJsonTime = require('./abi/contractReferrals.json');
const abiJsonRef = require('./abi/contractReferralsInfo.json');
const abiRefForCliam = require('./abi/ref_claim.json');
const abiRefForNick = require('./abi/referralNick.json');
const abiRefForChargeVesting = require('../../contracts/abi/ChargeVesting.json');
const abiRefForTaskManager = require('../../contracts/abi/TaskManager.json');
const abiRefForEmployeeManager = require('../../contracts/abi/EmployeeManager.json');
const abiRefForEmployeeRateModel = require('../../contracts/abi/EmployeeRateModel.json');
const abiRefForERC20 = require('../../contracts/abi/ERC20.json');

export const getContract = (chainId, provider, isFetchTime) => {
  let address;
  let abi;

  if (isFetchTime) {
    address =
      chainId === 56
        ? '0xc1F5844Fd72722ba6E932659E8Ce7Ada58747f5e'
        : '0x4293FC008Dd197B0e211ed45bC2E7f67167Fe6a1';

    abi = abiJsonTime;
  } else {
    address =
      chainId === 56
        ? '0x73462a03b38e9226adb9ccbf54a8a67a8e45dc0e'
        : '0x9263127e9bb8f0d2392896d235fefaf291e739fa';

    abi = abiJsonRef;
  }

  return new ethers.Contract(address, abi, provider);
};

export const getWeb3Provider = async () => {
  try {
    // const urlRpc = "https://app-test.airdrop-hunter.site/rpcs";
    // const response = await fetch(urlRpc);
    //
    // if (!response.ok) {
    //     console.log("Network response was not ok");
    // }
    //
    // const data = await response.json();

    const data = {
      56: 'https://bsc-dataseed3.ninicoin.io',
      137: 'https://1rpc.io/matic'
    };

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getWeb3Contract = (chainId, web3, isFetchTime) => {
  let address;
  let abi;

  if (isFetchTime) {
    address =
      chainId === 56
        ? '0xc1F5844Fd72722ba6E932659E8Ce7Ada58747f5e'
        : '0x4293FC008Dd197B0e211ed45bC2E7f67167Fe6a1';

    abi = abiJsonTime;
  } else {
    address =
      chainId === 56
        ? '0x73462a03b38e9226adb9ccbf54a8a67a8e45dc0e'
        : '0x9263127e9bb8f0d2392896d235fefaf291e739fa';

    abi = abiJsonRef;
  }

  return new web3.eth.Contract(abi, address);
};

export const getProvider = async (chainId) => {
  try {
    // const urlRpc = "https://app-test.airdrop-hunter.site/rpcs";
    // const response = await fetch(urlRpc);

    // if (!response.ok) {
    //     console.log("Network response was not ok");
    // }

    // const data = await response.json();

    const data = {
      56: 'https://bsc-dataseed3.ninicoin.io',
      137: 'https://1rpc.io/matic'
    };

    const url = data[chainId];

    return new ethers.providers.JsonRpcProvider(url);
  } catch (err) {
    console.log(err);
  }
};

export const fetchTime = async () => {
  const providerBsc = await getProvider(56);
  const providerPolygon = await getProvider(137);

  const contractBsc = getContract(56, providerBsc, true);
  const contractPolygon = getContract(137, providerPolygon, true);

  const updateTimeBSC = await contractBsc.UpdateTime();
  const updateTimePolygon = await contractPolygon.UpdateTime();

  return { bsc: updateTimeBSC.toString(), polygon: updateTimePolygon.toString() };
};

const fetchReferralsFromApi = async () => {
  const url = 'https://api-cube.airdrop-hunter.site/ref/list/';

  try {
    const res = await axios.get(url);

    // return testObj.result;

    return res.data.result;
  } catch (err) {
    throw new Error(`Error with fetching ref array from api: ${err.toString()}`);
  }
};

const makeOldArr = (apiRes) => {
  const { ref, i } = apiRes;

  const result = {};

  Object.keys(ref).forEach((refAddr) => {
    const idArr = ref[refAddr].i;

    const array = [];

    idArr.forEach((idIndex) => {
      array.push(i[idIndex]);
    });

    result[refAddr] = array;
  });

  return result;
};

export const fetchReferrals = async () => {
  const startTime = new Date().getTime(); // Запомнить текущее время

  console.log('Завис');

  const referralsResult = await fetchReferralsFromApi();

  console.log(
    `[${new Date().toLocaleTimeString()}] Запрос данных API выполнен, прошло ${(new Date().getTime() - startTime) / 1000} секунд`
  );

  console.log(referralsResult);

  console.log('Отзавис');

  console.log(
    `[${new Date().toLocaleTimeString()}] Перед макингом ${(new Date().getTime() - startTime) / 1000} секунд`
  );

  const refArr = makeOldArr(referralsResult);

  console.log(
    `[${new Date().toLocaleTimeString()}] После ${(new Date().getTime() - startTime) / 1000} секунд`
  );

  console.log(refArr);

  return refArr;
};

export const getRefContractForClaim = (chainId, signer) => {
  const address = '0x842ed5f2acB2EC1Ea786c7d4F9De3BBC88192DBf';

  return new ethers.Contract(address, abiRefForCliam, signer);
};

export const getRefContractForNickRead = async () => {
  const provider = await getProvider(137);
  const address = '0x3C57a2cE1442E0A6678B060A372A10B963675CC4';

  return new ethers.Contract(address, abiRefForNick, provider);
};

export const getRefContractForChargeVesting = (chainId, signer, cb) => {
  let address;
  switch (chainId) {
    case 1337:
      address = '0xb6057e08a11da09a998985874FE2119e98dB3D5D';
      cb(address);
      return new ethers.Contract(address, abiRefForChargeVesting, signer);
    case 31337:
      address = '0x61A3Ae286188e82d6E27567348F6a23f21939D9D';
      cb(address);
      return new ethers.Contract(address, abiRefForChargeVesting, signer);
    default:
      throw new Error('RPC-ERROR: at function getRefContractForChargeVesting');
  }
};

export const getRefContractForTaskManager = (chainId, signer) => {
  switch (chainId) {
    case 1337:
      return new ethers.Contract(
        '0x519b05b3655F4b89731B677d64CEcf761f4076f6',
        abiRefForTaskManager,
        signer
      );
    case 31337:
      return new ethers.Contract(
        '0x9a2d01D2E297ff9824Ca7fF00E141561443D05d9',
        abiRefForTaskManager,
        signer
      );
    default:
      throw new Error('RPC-ERROR: at function getRefContractForTaskManager');
  }
};

export const getRefContractForEmployeeManager = (chainId, signer) => {
  switch (chainId) {
    case 1337:
      return new ethers.Contract(
        '0x0B32a3F8f5b7E5d315b9E52E640a49A89d89c820',
        abiRefForEmployeeManager,
        signer
      );
    case 31337:
      return new ethers.Contract(
        '0x8AFE0ecCd5F4fF6d9cf02eECCEF6b2e4C4F44c75',
        abiRefForEmployeeManager,
        signer
      );
    default:
      throw new Error('RPC-ERROR: at function getRefContractForEmployeeManager');
  }
};

export const getRefContractForEmployeeRateModel = (chainId, signer) => {
  switch (chainId) {
    case 1337:
      return new ethers.Contract(
        '0xf274De14171Ab928A5Ec19928cE35FaD91a42B64',
        abiRefForEmployeeRateModel,
        signer
      );
    case 31337:
      return new ethers.Contract(
        '0x9c2CB6AF3287A54dB6c3FcbfCF710cbA41B7c805',
        abiRefForEmployeeRateModel,
        signer
      );
    default:
      throw new Error('RPC-ERROR: at function getRefContractForEmployeeRateModel');
  }
};

export const getRefContractForERC20 = (chainId, signer, cb) => {
  let address;
  switch (chainId) {
    case 1337:
      address = '0x15F2ea83eB97ede71d84Bd04fFF29444f6b7cd52';
      cb && cb(address);
      return new ethers.Contract(address, abiRefForERC20, signer);
    case 31337:
      address = '0x8Df2e40e2374e119372b76362F074365C743C86C';
      cb && cb(address);
      return new ethers.Contract(address, abiRefForERC20, signer);
    default:
      throw new Error('RPC-ERROR: at function getRefContractForEmployeeRateModel');
  }
};
