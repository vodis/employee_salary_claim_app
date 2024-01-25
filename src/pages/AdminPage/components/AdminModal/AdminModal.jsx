import { AdminAddTaskModal } from './AdminAddTaskModal';
import { AdminWithdrawModal } from './AdminWithdrawModal';

const AdminModal = (props) => {
  return (
    <>
      <AdminAddTaskModal {...props} />
      <AdminWithdrawModal {...props} />
    </>
  );
};

export default AdminModal;
