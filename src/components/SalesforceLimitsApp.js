import { Button, Page, PageHeader, PageHeaderTools, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { ReactComponent as Logo } from '../img/logo.svg';
import { ExclamationCircleIcon, GithubIcon, PencilAltIcon, SaveIcon, UndoIcon } from '@patternfly/react-icons';
import React, { useEffect, useState } from 'react'
import { metadata } from '../data/metadata'
import { isEmpty } from '../helpers/utils';
import { Dashboard } from './Dashboard'
import 'animate.css';

export const SalesforceLimitsApp = ({ error }) => {
    const [localMetadata, setMetadata] = useState([])
    const [edit, setedit] = useState(false)
    const [reset, setreset] = useState(false)
    useEffect(() => {
        const jsonStoraged = JSON.parse(window.localStorage.getItem('salesforce-limits-mdt'));
        setMetadata(!isEmpty(jsonStoraged) ? jsonStoraged : metadata)
    }, [reset]);
    const handleEdit = () => {
        setedit((e) => (!e));
    }
    const handleSave = () => {
        setedit((e) => (!e));
        window.localStorage.setItem('salesforce-limits-mdt', JSON.stringify(localMetadata));

    }
    const handleReset = () => {
        setedit((e) => (!e));
        setreset((e) => (!e));
    }
    const getError=(error)=>{
        if (error.message){
            return error.message
        }else if (Array.isArray(error)){
            return error.map((e)=>(e.message?e.message:e));
        }else{
            return JSON.stringify(error);
        }
    }
    const handleGit=()=>{
        window.location.href="https://github.com/lordone1/salesforce-limits";
    }
    return (
        <Page header={<PageHeader
            logo={<Logo />}
            headerTools={<PageHeaderTools>
                {!error && !edit && <Button variant="link" icon={<PencilAltIcon size="md" color="#F0F0F0" />} iconPosition="right" onClick={handleEdit} />}
                {!error && edit && <Button variant="link" icon={<SaveIcon size="md" color="#F0F0F0" />} iconPosition="right" onClick={handleSave} />}
                {!error && edit && <Button variant="link" icon={<UndoIcon size="md" color="#F0F0F0" />} iconPosition="right" onClick={handleReset} />}
                {<Button variant="link" icon={<GithubIcon size="md" color="#F0F0F0" />} iconPosition="right" onClick={handleGit} />}
            </PageHeaderTools>}
        />}>
            <PageSection variant={PageSectionVariants.darker}>
                {!error && <Dashboard edit={edit} setMetadata={setMetadata} metadata={localMetadata} />}
                {error &&
                 <center><p><ExclamationCircleIcon size="lg" className="danger" /><br />Error Loading information<br /><br />
                 {getError(error)} </p>
                 <div className="Logo" />
                 <div className="Back" /></center>
              
                }
            </PageSection>
        </Page >
    )
}
