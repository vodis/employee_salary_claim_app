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

export const getRefContractForChargeVesting = (chainId, signer) => {
  switch (chainId) {
    case 1337:
      return new ethers.Contract(
        '0x9Bb65b12162a51413272d10399282E730822Df44',
        abiRefForChargeVesting,
        signer
      );
    case 31337:
      return new ethers.Contract(
        '0x5F7c2C1F1BA0104522f0843f14c67149813748CC',
        abiRefForChargeVesting,
        signer
      );
    default:
      throw new Error('RPC-ERROR: at function getRefContractForChargeVesting');
  }
};

export const getRefContractForTaskManager = (chainId, signer) => {
  switch (chainId) {
    case 1337:
      return new ethers.Contract(
        '0x29023DE63D7075B4cC2CE30B55f050f9c67548d4',
        abiRefForTaskManager,
        signer
      );
    case 31337:
      return new ethers.Contract(
        '0xb2f3e3a41b0A6407D1A2F272cd1d8ef96CFfAD7C',
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
        '0xf93b0549cD50c849D792f0eAE94A598fA77C7718',
        abiRefForEmployeeManager,
        signer
      );
    case 31337:
      return new ethers.Contract(
        '0x5B06f4E1fB0f5d8d6F9b1Ff055bc5EBc9AAdf50d',
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
