import { AdminAddTaskModal } from './AdminAddTaskModal';
import { AdminWithdrawModal } from './AdminWithdrawModal';
import { AdminAddEmployee } from './AdminAddEmployee';
import { AdminApproveStage } from './AdminApproveStage';
import { AdminFiredEmployee } from './AdminFiredEmployee';

const AdminModal = (props) => {
  return (
    <>
      <AdminAddTaskModal {...props} />
      <AdminWithdrawModal {...props} />
      <AdminAddEmployee {...props} />
      <AdminApproveStage {...props} />
      <AdminFiredEmployee {...props} />
    </>
  );
};

export default AdminModal;
