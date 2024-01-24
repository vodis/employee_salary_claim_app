import { ClaimButton, ClaimButtonDisabled } from './index.style';
import { useState } from 'react';
import Modal from '../../Modals/ClaimModal/index.component';
import {
  getChainIdFromName,
  getChainNameFromId,
  getUnlockedTime,
  isDateInFuture,
  parseMessage,
  timeToLocaltime
} from '../../../../utils/wallets/utils';
import SwitchButtonComponent from './SwitchButton.component';
import {
  fetchReferrals,
  getRefContractForClaim
} from '../../../../utils/ethereum/ethereumFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
import { fetchReferralsStart } from '../../../../store/referrals/referrals-actions';
import { Tooltip } from '@mui/material';
import { CACHE_KEYS, clearCache } from '../../../../utils/cacheManager';
import { useWaitingUntilFetchChanges } from '../../../../hooks/useWaitingUntilFetchChanges';

const WithdrawButtonComponent = ({
  isClaimed,
  isOwner,
  chain,
  amount,
  address,
  id,
  inviterAddress,
  referralAddress,
  time,
  chainId
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { signer } = useSelector(selectCurrentUser);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const dispatch = useDispatch();

  const { isWaiting, handleStartWaiting } = useWaitingUntilFetchChanges(
    fetchReferrals,
    1000 * 10, // 10 seconds
    1000 * 60 * 3, // 3 minutes
    () => {
      clearCache(CACHE_KEYS.referrals);
      dispatch(fetchReferralsStart());
    }
  );

  const claimFunc = async () => {
    setOpenModal(true);
    setError('');
    setTxHash('');

    try {
      const chainId = getChainIdFromName(chain);

      const contract = getRefContractForClaim(chainId, signer);

      const data = contract.interface.encodeFunctionData('Claim', [address, id]);
      const gasLimit = await contract.estimateGas['Claim'](address, id);

      const tx = {
        to: contract.address,
        data,
        gasLimit: gasLimit * 2
      };

      const transaction = await signer.sendTransaction(tx);

      setTxHash(transaction.hash);

      setIsLoading(true);
      await transaction.wait();
      setIsLoading(false);

      dispatch(fetchReferralsStart());
      await handleStartWaiting();
    } catch (err) {
      const errorParsed = parseMessage(err?.reason || err);

      if (errorParsed === null) {
        setError(err?.reason || err);
        console.log(err?.reason);
      } else {
        setError(
          `Claim id ${errorParsed.claimId} available after: ${timeToLocaltime(errorParsed.availableAfter)}. PayTime: ${timeToLocaltime(errorParsed.payTime)}. Now: ${timeToLocaltime(errorParsed.now)} RefAddr: ${errorParsed.refAddr}`
        );
      }
    }
  };

  if (isClaimed === '1') {
    return (
      <div style={{ zIndex: '100' }}>
        {openModal ? (
          <Modal
            setIsModalOpen={setOpenModal}
            amount={amount}
            address={address}
            id={id}
            error={error}
            inviterAddress={inviterAddress}
            referralAddress={referralAddress}
            time={time}
            txHash={txHash}
            chain={chain}
            isLoading={isLoading}
          />
        ) : (
          <></>
        )}
        <ClaimButtonDisabled>Claimed</ClaimButtonDisabled>
      </div>
    );
  }

  const currentUnixTime = Math.floor(Date.now() / 1000);

  if (!isOwner) {
    return (
      <div style={{ zIndex: '100' }}>
        {openModal ? (
          <Modal
            setIsModalOpen={setOpenModal}
            amount={amount}
            address={address}
            id={id}
            error={error}
            inviterAddress={inviterAddress}
            referralAddress={referralAddress}
            time={time}
            txHash={txHash}
            chain={chain}
            isLoading={isLoading}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }

  if (isClaimed === '0') {
    if (isDateInFuture(currentUnixTime, time)) {
      return (
        <div style={{ zIndex: '100' }}>
          {openModal ? (
            <Modal
              setIsModalOpen={setOpenModal}
              amount={amount}
              address={address}
              id={id}
              error={error}
              inviterAddress={inviterAddress}
              referralAddress={referralAddress}
              time={time}
              txHash={txHash}
              chain={chain}
              isLoading={isLoading}
            />
          ) : (
            <></>
          )}
          <Tooltip title={`Locked Until: ${getUnlockedTime(time)}`}>
            <ClaimButtonDisabled>Locked</ClaimButtonDisabled>
          </Tooltip>
        </div>
      );
    }

    if (parseInt(amount) === 0) {
      return (
        <div style={{ zIndex: '100' }}>
          {openModal ? (
            <Modal
              setIsModalOpen={setOpenModal}
              amount={amount}
              address={address}
              id={id}
              error={error}
              inviterAddress={inviterAddress}
              referralAddress={referralAddress}
              time={time}
              txHash={txHash}
              chain={chain}
              isLoading={isLoading}
            />
          ) : (
            <></>
          )}
          <Tooltip title={`Nothing to Claim`}>
            <ClaimButtonDisabled>Zero</ClaimButtonDisabled>
          </Tooltip>
        </div>
      );
    }

    if (getChainNameFromId(chainId) === chain) {
      return (
        <div style={{ zIndex: '100' }}>
          {openModal ? (
            <Modal
              setIsModalOpen={setOpenModal}
              amount={amount}
              address={address}
              id={id}
              error={error}
              inviterAddress={inviterAddress}
              referralAddress={referralAddress}
              time={time}
              txHash={txHash}
              chain={chain}
              isLoading={isLoading}
            />
          ) : (
            <></>
          )}
          <ClaimButton onClick={claimFunc} disabled={isWaiting}>
            Claim
          </ClaimButton>
        </div>
      );
    } else {
      return (
        <div style={{ zIndex: '100' }}>
          {openModal ? (
            <Modal
              setIsModalOpen={setOpenModal}
              amount={amount}
              address={address}
              id={id}
              error={error}
              inviterAddress={inviterAddress}
              referralAddress={referralAddress}
              time={time}
              txHash={txHash}
              chain={chain}
              isLoading={isLoading}
            />
          ) : (
            <></>
          )}
          <SwitchButtonComponent chain={chain} />
        </div>
      );
    }
  }
};

export default WithdrawButtonComponent;
