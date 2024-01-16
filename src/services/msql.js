import { http } from './http';
import { injector } from '../utils';

const flag = process.env.REACT_APP_FLAG;
const database = process.env.REACT_APP_DB;
const sqlServiceUrl = process.env.REACT_APP_SQL_SERVICE;

export const getBlocks = async () => {};

export const dataBlocksSaver = async (data) => {
  // Example
  // 16384 10 Swap 5% ETH -> USDC via arbswap arbswap NULL NULL NULL NULL NULL NULL node scripts/action.js <wal> 10 --func arbswap --percentToSwap <pers:5-10>
  // const insertValues = [
  //     templateID,
  //     stepInt,
  //     amount  null,
  //     func  null,
  //     stepNameHR,
  //     script,
  //     cmd
  // ];

  console.log('Generated Data: ', data);
  let templateId = 0;
  let startStep = 3;

  const generatedData = data.blocks?.reduce((acc0, blk, i, blks) => {
    const txs = blk.transactions;
    if (!txs) {
      return acc0;
    }
    console.log(`Start block ${blk.id}`);

    const generetaByTxs = txs.reduce((acc1, tx) => {
      const { count } = findVariations(tx);
      console.log(`Find variations ${count} in tx ${tx.id}`);

      if (!count) {
        return acc1;
      }
      if (tx.status === 'close') {
        return acc1;
      }

      templateId += 1;

      const allVariations = getAllVariationsInBlock(
        blks,
        tx,
        findVariations(tx),
        blk.id,
        templateId
      ).map((el, i) => {
        el[1] = startStep + i;
        el[8] = tx.percent?.join(':');
        el[9] = cmd(el);
        return el;
      });
      // console.log(allVariations, 'Injection to exist');

      acc1.push(...allVariations);
      return acc1;
    }, []);
    acc0.push(...generetaByTxs);

    console.log(`End block ${blk.id} \n _`);
    return acc0;
  }, []);

  console.log(generatedData, '@@generatedData');
  // TODO Have to store template to table
  // await http.post(sqlServiceUrl, {
  //     id: 1,
  //     action: 'insert',
  //     values: generatedData,
  // })
};

function findVariations(tx) {
  const func = tx.func?.filter((el) => el.value) || [];
  const srcChain = tx.srcChain?.filter((el) => el.value) || [];
  const dstChain = tx.dstChain?.filter((el) => el.value) || [];
  const token = tx.token?.filter((el) => el.value) || [];
  const dstToken = tx.dstToken?.filter((el) => el.value) || [];
  return {
    isFunc: Boolean(func.length),
    func,
    isSrcChain: Boolean(srcChain.length),
    srcChain,
    isDstChain: Boolean(dstChain.length),
    dstChain,
    isToken: Boolean(token.length),
    token,
    isDstToken: Boolean(dstToken.length),
    dstToken,
    count: [...func, ...srcChain, ...dstChain, ...token, ...dstToken].length || 0
  };
}

function getAllVariationsInBlock(blks, tx, mapper, blockId, ...rest) {
  const result = [];
  if (mapper.isFunc) {
    result.push(...handlerFunc(blks, tx, mapper.func, blockId, ...rest));
  }
  if (mapper.isSrcChain) {
    result.push(...handlerSrcChain(blks, tx, mapper.srcChain, blockId, ...rest));
  }
  if (mapper.isDstChain) {
    result.push(...handlerDstChain(blks, tx, mapper.dstChain, blockId, ...rest));
  }
  if (mapper.isToken) {
    result.push(...handlerToken(blks, tx, mapper.token, blockId, ...rest));
  }
  if (mapper.isDstToken) {
    result.push(...handlerDstToken(blks, tx, mapper.dstToken, blockId, ...rest));
  }

  return result.flat();
}

function handlerFunc(blks, tx, map, blockId, templateId) {
  return map.map((func) => {
    const blocks = blks.reduce((acc0, blk) => {
      const txs = blk.transactions;
      const generetaByTxs = txs.reduce((acc1, tx) => {
        const { count } = findVariations(tx);
        if (!count) {
          return acc1;
        }
        const stepName = injector('{{func}}', func.label.toUpperCase(), tx.name);

        const _funcFirst = blk?.func?.find((el) => el.value)?.label || null;
        const _srcChainFirst = blk?.srcChain?.find((el) => el.value)?.label || null;
        const _dstChainFirst = blk?.dstChain?.find((el) => el.value)?.label || null;
        const _tokenFirst = blk?.token?.find((el) => el.value)?.label || null;

        acc1.push([
          templateId,
          0,
          stepName,
          func.label || _funcFirst,
          _srcChainFirst,
          _dstChainFirst,
          _tokenFirst
        ]);
        return acc1;
      }, []);
      acc0.push(...generetaByTxs);

      return acc0;
    }, []);

    return blocks;
  });
}

function handlerSrcChain(blks, tx, map, blockId, templateId) {
  return map.map((srcChain) => {
    const blocks = blks.reduce((acc0, blk) => {
      const txs = blk.transactions;
      const generetaByTxs = txs.reduce((acc1, tx) => {
        const { count } = findVariations(tx);
        if (!count) {
          return acc1;
        }
        const stepName = injector('{{srcChain}}', srcChain.label.toUpperCase(), tx.name);

        const _funcFirst = blk?.func?.find((el) => el.value)?.label || null;
        const _srcChainFirst = blk?.srcChain?.find((el) => el.value)?.label || null;
        const _dstChainFirst = blk?.dstChain?.find((el) => el.value)?.label || null;
        const _tokenFirst = blk?.token?.find((el) => el.value)?.label || null;

        acc1.push([
          templateId,
          0,
          stepName,
          _funcFirst,
          srcChain.label || _srcChainFirst,
          _dstChainFirst,
          _tokenFirst
        ]);
        return acc1;
      }, []);
      acc0.push(...generetaByTxs);

      return acc0;
    }, []);

    return blocks;
  });
}

function handlerDstChain(blks, tx, map, blockId, templateId) {
  return map.map((dstChain) => {
    const blocks = blks.reduce((acc0, blk) => {
      const txs = blk.transactions;
      const generetaByTxs = txs.reduce((acc1, tx) => {
        const { count } = findVariations(tx);
        if (!count) {
          return acc1;
        }
        const stepName = injector('{{dstChain}}', dstChain.label.toUpperCase(), tx.name);

        const _funcFirst = blk?.func?.find((el) => el.value)?.label || null;
        const _srcChainFirst = blk?.srcChain?.find((el) => el.value)?.label || null;
        const _dstChainFirst = blk?.dstChain?.find((el) => el.value)?.label || null;
        const _tokenFirst = blk?.token?.find((el) => el.value)?.label || null;

        acc1.push([
          templateId,
          0,
          stepName,
          _funcFirst,
          _srcChainFirst,
          dstChain.label || _dstChainFirst,
          _tokenFirst
        ]);
        return acc1;
      }, []);
      acc0.push(...generetaByTxs);

      return acc0;
    }, []);

    return blocks;
  });
}

function handlerToken(blks, tx, map, blockId, templateId) {
  return map.map((token) => {
    const blocks = blks.reduce((acc0, blk) => {
      const txs = blk.transactions;
      const generetaByTxs = txs.reduce((acc1, tx) => {
        const { count } = findVariations(tx);
        if (!count) {
          return acc1;
        }
        const stepName = injector('{{token}}', token.label.toUpperCase(), tx.name);

        const _funcFirst = blk?.func?.find((el) => el.value)?.label || null;
        const _srcChainFirst = blk?.srcChain?.find((el) => el.value)?.label || null;
        const _dstChainFirst = blk?.dstChain?.find((el) => el.value)?.label || null;
        const _tokenFirst = blk?.token?.find((el) => el.value)?.label || null;

        acc1.push([
          templateId,
          0,
          stepName,
          _funcFirst,
          _srcChainFirst,
          _dstChainFirst,
          token.label || _tokenFirst
        ]);
        return acc1;
      }, []);
      acc0.push(...generetaByTxs);

      return acc0;
    }, []);

    return blocks;
  });
}

function handlerDstToken(blks, tx, map, blockId, templateId) {
  return map.map((dstToken) => {
    const blocks = blks.reduce((acc0, blk) => {
      const txs = blk.transactions;
      const generetaByTxs = txs.reduce((acc1, tx) => {
        const { count } = findVariations(tx);
        if (!count) {
          return acc1;
        }
        const stepName = injector('{{dstToken}}', dstToken.label.toUpperCase(), tx.name);

        const _funcFirst = blk?.func?.find((el) => el.value)?.label || null;
        const _srcChainFirst = blk?.srcChain?.find((el) => el.value)?.label || null;
        const _dstChainFirst = blk?.dstChain?.find((el) => el.value)?.label || null;
        const _tokenFirst = blk?.token?.find((el) => el.value)?.label || null;
        const _dstTokenFirst = blk?.dstToken?.find((el) => el.value)?.label || null;

        acc1.push([
          templateId,
          0,
          stepName,
          _funcFirst,
          _srcChainFirst,
          _dstChainFirst,
          _tokenFirst,
          _dstTokenFirst
        ]);
        return acc1;
      }, []);
      acc0.push(...generetaByTxs);

      return acc0;
    }, []);

    return blocks;
  });
}

function cmd(el) {
  const func = el[3] !== null ? `--func ${el[3]}` : ``;
  const srcChain = el[4] !== null ? `--srcChain ${el[4]}` : ``;
  const dstChain = el[5] !== null ? `--dstChain ${el[5]}` : ``;
  const token = el[6] !== null ? `--token ${el[6]}` : ``;

  return [func, srcChain, dstChain, token]?.join(' ');
}

function makeScript(path, stepInt) {
  return `node ${path} <wal> ${stepInt}`;
}
