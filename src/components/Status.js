import { Spinner } from '@patternfly/react-core';
import { BugIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon} from '@patternfly/react-icons';
import React from 'react'
import { STATUS_DANGER, STATUS_ERROR, STATUS_SUCCESS, STATUS_WARNING } from '../helpers/utils';

export const Status = ({ status }) => {
    const getIcon = () => {
        switch (status) {
            case STATUS_DANGER:
                return <ExclamationCircleIcon className='danger' />
            case STATUS_WARNING:
                return <ExclamationTriangleIcon className='warning' />
            case STATUS_SUCCESS:
                return <CheckCircleIcon className='success' />
            case STATUS_ERROR:
                return <BugIcon className='danger' />
            default:
                return <Spinner size="md" className='question' />
        }
    };
    return (
        <>
            {getIcon()}
        </>
    )
}
