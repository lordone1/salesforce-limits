import { Button, Flex, FlexItem, Grid } from '@patternfly/react-core'
import { PlusCircleIcon } from '@patternfly/react-icons'
import React, { useState } from 'react'
import { buildReport } from '../helpers/reportFactory'
import { EditComponent } from './EditComponent'
export const Dashboard = ({ metadata, edit,setMetadata }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleAdd = () => { 
        setModalOpen((i)=>(!i));
    }
    
    return (

<>
        <Grid hasGutter>
            {edit && <Flex className="example-border">
                <FlexItem align={{ default: 'alignRight' }}><Button variant="link"
                    icon={<PlusCircleIcon size="xs" className="edit-icon" />}
                    iconPosition="right"
                    onClick={handleAdd} /></FlexItem>
            </Flex>}
             {metadata.map((metadataItem) => (buildReport({ id:metadataItem.id, edit,metadataItem,setMetadata })))}
        </Grid>
        <EditComponent component="section" modalOpen={modalOpen} setModalOpen={setModalOpen} setMetadata={setMetadata} isAdd={true} id={0} />
        </>
    )
}
