export const compressAddress = (address) => {
  const prefix = address.substring(0, 5);
  const suffix = address.substring(address.length - 4);
  return `${prefix}....${suffix}`;
};

export const calcTotalFromReferralsArr = (referrals) => {
  let amountTotal = 0;
  let amountClaimedSum = 0;
  let amountClaimedSumUsdt = 0;

  // Проверка на пустой массив
  if (!referrals || referrals.length === 0) {
    return {
      amountTotal,
      amountClaimedSum,
      amountClaimedSumUsdt,
      totalReferrals: 0
    };
  }

  for (const referral of referrals) {
    // Проверяем, что объект содержит необходимые поля
    if (
      Object.prototype.hasOwnProperty.call(referral, 'amount') &&
      Object.prototype.hasOwnProperty.call(referral, 'claimed')
    ) {
      amountTotal += Number(referral.amount) || 0;

      if (referral.claimed === '1') {
        amountClaimedSum += 1 || 0;
        amountClaimedSumUsdt += Number(referral.amount) || 0;
      }
    }
  }

  const totalReferrals = referrals.length;

  return {
    amountTotal,
    amountClaimedSum,
    totalReferrals,
    amountClaimedSumUsdt
  };
};

export const timeToLocaltime = (t) => {
  t *= 1000;
  const dateObject = new Date(t);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
};

export const isDateInFuture = (currentUnixTime, targetUnixTime) => {
  // Преобразовываем числа Unix времени в объекты Date
  const currentDate = new Date(currentUnixTime * 1000); // Умножаем на 1000, т.к. Unix время в миллисекундах
  const targetDate = new Date(targetUnixTime * 1000);

  // Прибавляем к целевой дате одну неделю (7 дней)
  targetDate.setDate(targetDate.getDate() + 7);

  // Сравниваем текущую дату с новой датой
  return targetDate > currentDate;
};

export const getUnlockedTime = (unixTime) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне
  const targetDate = new Date(unixTime * 1000 + 7 * millisecondsPerDay);

  const humanDateFormat = targetDate.toLocaleString();
  return humanDateFormat;
};

export const sortObject = (obj, sortType) => {
  switch (sortType) {
    case 'Sort By': {
      return obj;
    }

    case 'Amount': {
      const sortedObj = {};
      const keys = Object.keys(obj);

      // Сортировка ключей по сумме
      keys.sort((a, b) => {
        const totalA = calcTotalFromReferralsArr(obj[a]).amountTotal;
        const totalB = calcTotalFromReferralsArr(obj[b]).amountTotal;
        return totalB - totalA;
      });

      // Создание нового объекта с отсортированными ключами
      for (const key of keys) {
        sortedObj[key] = obj[key];
      }

      return sortedObj;
    }

    case 'Date': {
      const sortedObj = {};

      // Сортировка ключей по самой новой дате
      const keys = Object.keys(obj).sort((a, b) => {
        const lastDateA = Math.max(...obj[a].map((item) => parseInt(item.time)));
        const lastDateB = Math.max(...obj[b].map((item) => parseInt(item.time)));

        return lastDateB - lastDateA;
      });

      // Создание нового объекта с отсортированными ключами
      for (const key of keys) {
        sortedObj[key] = obj[key];
      }

      return sortedObj;
    }

    case 'Referrals Count': {
      const sortedObj = {};
      const keys = Object.keys(obj);

      // Сортировка ключей по сумме
      keys.sort((a, b) => {
        const totalA = calcTotalFromReferralsArr(obj[a]).totalReferrals;
        const totalB = calcTotalFromReferralsArr(obj[b]).totalReferrals;
        return totalB - totalA;
      });

      // Создание нового объекта с отсортированными ключами
      for (const key of keys) {
        sortedObj[key] = obj[key];
      }

      return sortedObj;
    }

    default: {
      return {};
    }
  }
};

export const getChainNameFromId = (chainId) => {
  switch (chainId) {
    case 56: {
      return 'bsc';
    }

    case 137: {
      return 'matic';
    }

    default: {
      return '';
    }
  }
};

export const getChainIdFromName = (chainName) => {
  switch (chainName) {
    case 'bsc': {
      return 56;
    }

    case 'matic': {
      return 137;
    }

    default: {
      return 0;
    }
  }
};

export const getExplorerFromChainName = (chainName) => {
  switch (chainName) {
    case 'bsc': {
      return 'https://bscscan.com';
    }

    case 'matic': {
      return 'https://polygonscan.com';
    }

    default: {
      return 0;
    }
  }
};

export const parseMessage = (message) => {
  const claimIdPattern = /Claim id (\d+)/;
  const availableAfterPattern = /aviable after unixtimestamp: (\d+)/;
  const payTimePattern = /PayTime: (\d+)/;
  const nowPattern = /Now: (\d+)/;
  const refAddrPattern = /RefAddr: (0x[0-9a-fA-F]+)/;

  const claimIdMatch = message.match(claimIdPattern);
  const availableAfterMatch = message.match(availableAfterPattern);
  const payTimeMatch = message.match(payTimePattern);
  const nowMatch = message.match(nowPattern);
  const refAddrMatch = message.match(refAddrPattern);

  if (claimIdMatch && availableAfterMatch && payTimeMatch && nowMatch && refAddrMatch) {
    const claimId = parseInt(claimIdMatch[1]);
    const availableAfter = parseInt(availableAfterMatch[1]);
    const payTime = parseInt(payTimeMatch[1]);
    const now = parseInt(nowMatch[1]);
    const refAddr = refAddrMatch[1];

    return { claimId, availableAfter, payTime, now, refAddr };
  }

  return null; // Возвращаем null, если не удалось распарсить сообщение
};
