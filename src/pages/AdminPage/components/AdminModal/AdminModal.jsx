import { AdminAddTaskModal } from './AdminAddTaskModal';
import { AdminWithdrawModal } from './AdminWithdrawModal';
import { AdminAddEmployee } from './AdminAddEmployee';
import { AdminApproveStage } from './AdminApproveStage';
import { AdminFiredEmployee } from './AdminFiredEmployee';
import { AdminStopTask } from './AdminStopTask';
import { AdminAddAdmin } from './AdminAddAdmin';
import { AdminDeleteAdmin } from './AdminDeleteAdmin';
import { AdminOpenTask } from './AdminOpenTask';
import { AdminUpdateEmployeeAddressModal } from './AdminUpdateEmployeeAddressModal';

const AdminModal = (props) => {
  return (
    <>
      <AdminAddTaskModal {...props} />
      <AdminWithdrawModal {...props} />
      <AdminAddEmployee {...props} />
      <AdminApproveStage {...props} />
      <AdminFiredEmployee {...props} />
      <AdminStopTask {...props} />
      <AdminAddAdmin {...props} />
      <AdminDeleteAdmin {...props} />
      <AdminOpenTask {...props} />
      <AdminUpdateEmployeeAddressModal {...props} />
    </>
  );
};

export default AdminModal;
