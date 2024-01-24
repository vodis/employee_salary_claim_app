import { useWallet } from '../../../../hooks/useWallet';
import { getRefContractForChargeVesting } from '../../../../utils/ethereum/ethereumFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/providerAndSigner/user-selector';
// import {BigNumber} from "ethers";

const AdminModal = () => {
  const { signer } = useSelector(selectCurrentUser);
  const { chainId } = useWallet();

  const handleWithdraw = async () => {
    const contract = getRefContractForChargeVesting(chainId, signer);
    const data = contract.interface.encodeFunctionData('withdraw', []);
    const gasLimit = await contract.estimateGas.withdraw();
    const tx = {
      to: contract.address,
      data,
      gasLimit: gasLimit * 2
    };

    const transaction = await signer.sendTransaction(tx);
    console.log(transaction);
  };

  return (
    <>
      <div
        class="modal fade"
        id="withdraw"
        tabindex="-1"
        aria-labelledby="withdrawLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="withdrawLabel">
                Deposit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h5>
                Are you sure? All available USDT will be transferred to owner account. All employee
                no longer be able claim from contract.
              </h5>
            </div>
            <div class="d-flex gap-3 w-100 p-2">
              <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary w-100" onClick={handleWithdraw}>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
