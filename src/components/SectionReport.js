import { Button, Card, CardActions, CardBody, CardHeader, CardTitle, Grid, GridItem } from '@patternfly/react-core'
import { PencilAltIcon, PlusCircleIcon, TrashIcon } from '@patternfly/react-icons';
import React, { useState } from 'react'
import { buildReport } from '../helpers/reportFactory'
import { filterData, stopPropagation } from '../helpers/utils';
import { EditComponent } from './EditComponent';

export const SectionReport = (metadataItem) => {
    const { id, edit, title, items, setMetadata, span }=metadataItem;
    const [modalOpen, setModalOpen] = useState(false);
    const [isAdd, setisAdd] = useState(false)
    const [isDeleted, setdeleted] = useState(false);

    const handleEdit = () => {
        setisAdd(false);
        setModalOpen((i)=>(!i));
     }
    const handleDelete = () => {
        setdeleted(true);
        
    }
    const handleAdd = () => { 
        setisAdd(true);
        setModalOpen((i)=>(!i));
    }
    const getClass=()=>{
        return isDeleted ? "animate__animated animate__flipOutX":edit?"edit":"";
    }
    const animationEnd =(e)=>{
        const {animationName}=e
        if (animationName === 'flipOutX'){
            
            setMetadata((mdt) => {
                    return filterData(mdt, id);
            });
            stopPropagation(e);
        }
    }
    return (
        <GridItem span={span} >
            <Card className={getClass()} onAnimationEnd={animationEnd}>
                <CardHeader>
                    <CardTitle >{title}</CardTitle>
                    {edit && <CardActions>
                        <Button variant="link"
                            icon={<PlusCircleIcon size="xs" className="edit-icon" />}
                            iconPosition="right"
                            onClick={handleAdd} />
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
                <CardBody>
                    <Grid hasGutter className={id}>
                    {items.map((e) => (buildReport({ id:e.id,edit, metadataItem: e, setMetadata })))}
                    </Grid>
                </CardBody>
            </Card>
            <EditComponent title={`Edit ${title}`} modalOpen={modalOpen} setModalOpen={setModalOpen} setMetadata={setMetadata} isAdd={isAdd} {...metadataItem} />
        </GridItem>

    )
}
