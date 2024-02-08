import { AdminAddTaskModal } from './AdminAddTaskModal';
import { AdminWithdrawModal } from './AdminWithdrawModal';
import { AdminAddEmployee } from './AdminAddEmployee';
import { AdminApproveStage } from './AdminApproveStage';
import { AdminFiredEmployee } from './AdminFiredEmployee';
import { AdminStopTask } from './AdminStopTask';
import { AdminAddAdmin } from './AdminAddAdmin';
import { AdminDeleteAdmin } from './AdminDeleteAdmin';
import { AdminOpenTask } from './AdminOpenTask';

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
    </>
  );
};

export default AdminModal;
