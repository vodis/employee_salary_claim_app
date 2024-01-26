import { AdminAddTaskModal } from './AdminAddTaskModal';
import { AdminWithdrawModal } from './AdminWithdrawModal';
import { AdminAddEmployee } from './AdminAddEmployee';

const AdminModal = (props) => {
  return (
    <>
      <AdminAddTaskModal {...props} />
      <AdminWithdrawModal {...props} />
      <AdminAddEmployee {...props} />
    </>
  );
};

export default AdminModal;
