import { Button, Card, CardActions, CardBody, CardExpandableContent, CardHeader, CardTitle, GridItem } from '@patternfly/react-core'
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Status } from './Status'
import { PencilAltIcon, TrashIcon } from '@patternfly/react-icons';
import { filterData, STATUS_DANGER, STATUS_ERROR, stopPropagation } from '../helpers/utils';
import { EditComponent } from './EditComponent';

export const ExpandableCard = (metadataItem) => {
    const { edit, setMetadata, children, title, status, isExpanded, hasStatus, span, id } = metadataItem
    const [expanded, setExpaded] = useState(isExpanded);
    const [modalOpen, setModalOpen] = useState(false);
    const [isDeleted, setdeleted] = useState(false);

    
    const animationEnd =(e)=>{
        const {animationName}=e;
        if (animationName === 'flipOutX'){
            setMetadata((mdt) => {
                    return filterData(mdt, id);
            });
            setdeleted(false);
        }
        stopPropagation(e);
    }
    const handleExpand = () => {
        setExpaded((ex) => (!ex));
    }
    const handleDelete = (e) => {
        setdeleted(true);
    }
    const handleEdit = () => {
        setModalOpen((i) => (!i));
    }
    const getStatus = () => {
        return hasStatus ? <Status status={status} /> : ''
    }
    const getClass = () => {
        return isDeleted ? "animate__animated animate__flipOutX" :
            edit ? "edit" :
                status === STATUS_DANGER || status === STATUS_ERROR ? "animate__animated animate__heartBeat" :
                    "animate__animated animate__fadeIn"

    }
    return (
        <>
            <GridItem className={getClass()} onAnimationEnd={animationEnd} span={span}>
                <Card   isExpanded={expanded}>
                    <CardHeader onExpand={handleExpand}>
                        <CardTitle >{title} {getStatus()}</CardTitle>
                        {edit && <CardActions>
                            <Button variant="link"
                                icon={<PencilAltIcon size="xs" className="edit-icon" />}
                                iconPosition="right"
                                onClick={handleEdit} />
                            <Button variant="link"
                                icon={<TrashIcon size="xs" className="edit-icon" />}
                                iconPosition="right"
                                onClick={handleDelete} />

                        </CardActions>}
                    </CardHeader>
                    <CardExpandableContent>
                        <CardBody>{children}</CardBody>
                    </CardExpandableContent>
                </Card>
            </GridItem>
            <EditComponent title={`Edit ${title}`} modalOpen={modalOpen} setModalOpen={setModalOpen} setMetadata={setMetadata} {...metadataItem} />
        </>
    )
}

ExpandableCard.propTypes = {
    title: PropTypes.string.isRequired,
    status: PropTypes.string
}
