import { Modal, ModalVariant } from '@patternfly/react-core';
import { EditDashboardItemForm } from './EditDashboardItemForm';

export const EditComponent = (props) => {
    const { title, modalOpen, setModalOpen} = props
    const handleModalToggle = () => {
        setModalOpen((e) => { e = !e });
    }

    return (
        <Modal
            title={title}
            isOpen={modalOpen}
            onClose={handleModalToggle}
            variant={ModalVariant.large}
        >
            <EditDashboardItemForm onSave={false} {...props} />
        </Modal>
    )
}
