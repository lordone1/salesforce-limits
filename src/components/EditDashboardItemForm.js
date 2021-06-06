import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { Button, Checkbox, Divider, Form, FormGroup, FormSelect, FormSelectOption, Grid, GridItem, TextInput } from '@patternfly/react-core'
import React, { useState } from 'react'
import { CMP_API_LIMIT, CMP_SECTION, CMP_SOQL_AGG_LIMIT, CMP_SOQL_FLEXIBLE_LIMIT, CMP_SOQL_SERIES_LIMIT, CMP_SOQL_SINGLE_LIMIT } from '../helpers/reportFactory';
import { findAndAddById, findAndModifyById, generateId, LABEL_FIX, LABEL_DYNAMIC, LIMIT_FIX, LIMIT_DYNAMIC, LIMIT_MAP, STATUS_SUCCESS, STATUS_WARNING, STATUS_DANGER } from '../helpers/utils';
import { ExpandableElement } from './ExpandableElement';
import { JsonEditorElement } from './JsonEditorElement';
import { Status } from './Status';

export const EditDashboardItemForm = ({ isAdd, setMetadata, id, setModalOpen, reduceRules, series, mapLimit, fixLimit, fixLabel, aggByName, dynamicLabel, dynamicLimit, title, component, span, thresholds, soql, limit, tooling }) => {
    const [lComponent, setComponent] = useState(component);
    const [lTitle, setTitle] = useState(title);
    const [lSpan, setSpan] = useState(span ? span : 3);
    const [lmins, setMins] = useState(thresholds ? thresholds.success[0] : 0);
    const [lmaxs, setMaxs] = useState(thresholds ? thresholds.success[1] : 50);
    const [lminw, setMinw] = useState(thresholds ? thresholds.warning[0] : 51);
    const [lmaxw, setMaxw] = useState(thresholds ? thresholds.warning[1] : 80);
    const [lmind, setMind] = useState(thresholds ? thresholds.danger[0] : 81);
    const [lmaxd, setMaxd] = useState(thresholds ? thresholds.danger[1] : 100);
    const [lsoql, setSoql] = useState(soql);
    const [llimit, setLimit] = useState(limit);
    const [ltooling, setTooling] = useState(tooling);
    const [ldlimit, setDlimit] = useState(dynamicLimit);
    const [ldlabel, setDlabel] = useState(dynamicLabel);
    const [laggByName, setAggByName] = useState(aggByName);
    const [lfixlabel, setFixLabel] = useState(fixLabel);
    const [lfixLimit, setFixLimit] = useState(fixLimit);
    const [lmaplimit, setMapLimit] = useState(mapLimit);
    const [lseriesElement, setSeriesMap] = useState(series);
    const [lfields, setFields] = useState(reduceRules?.fields);
    const [loperation, setOperation] = useState(reduceRules?.operation);

    const handleComponentChange = (e) => {
        setComponent(e);
    }
    const handleTitleChange = (e) => {
        setTitle(e);
    }
    const handleSpanChange = (e) => {
        if ((e <= 12 && e >= 1) || (e === '')) {
            setSpan(e);
        }
    }
    const validatePercent = (e) => {
        return ((e <= 100 && e >= 0) || (e === ''))
    }
    const handleMins = (e) => {
        if (validatePercent(e)) {
            setMins(e);
        }
    }
    const handleMaxs = (e) => {
        if (validatePercent(e)) {
            setMaxs(e);
        }
    }
    const handleMinw = (e) => {
        if (validatePercent(e)) {
            setMinw(e);
        }
    }
    const handleMaxw = (e) => {
        if (validatePercent(e)) {
            setMaxw(e);
        }
    }
    const handleMind = (e) => {
        if (validatePercent(e)) {
            setMind(e);
        }
    }
    const handleMaxd = (e) => {
        if (validatePercent(e)) {
            setMaxd(e);
        }
    }
    const handleSoql = (e) => {
        setSoql(e);
    }
    const handleLimit = (e) => {
        if ((e >= 0) || (e === '')) {
            setLimit(e);
        }
    }
    const handleTooling = (e) => {
        if ((e >= 0) || (e === '')) {
            setTooling(e);
        }
    }
    const limitElement = () => {
        return (<FormGroup
            label="Limit"
            isRequired
            fieldId="limit-value"
        >
            <TextInput
                isRequired
                type="text"
                id="limit-name"
                name="limit-name"
                value={llimit}
                onChange={handleLimit}
            />
        </FormGroup>);
    }
    const dlabelElement = () => {
        return (<FormGroup
            label="Dynamic Label"
            isRequired
            fieldId="limit-value"
        >
            <TextInput
                isRequired
                type="text"
                id="dlabel-name"
                name="dlabel-name"
                value={ldlabel}
                onChange={setDlabel}
            />
        </FormGroup>);
    }
    const dlimitElement = () => {
        return (<FormGroup
            label="Dynamic Limit"
            isRequired
            fieldId="limit-value"
        >
            <TextInput
                isRequired
                type="text"
                id="dlimit-name"
                name="dlimit-name"
                value={ldlimit}
                onChange={(e) => { setDlimit(e); setMapLimit(); setFixLimit(); }}
            />
        </FormGroup>);
    }
    const aggByElement = () => {
        return (<FormGroup
            label="Agregate values by field name"
            isRequired
            fieldId="aggByName-value"
        >
            <TextInput
                isRequired
                type="text"
                id="aggByName-name"
                name="aggByName-name"
                value={laggByName}
                onChange={setAggByName}
            />
        </FormGroup>);
    }
    const fixLabelElement = () => {
        return (<FormGroup
            label="Label"
            isRequired
            fieldId="fixlabel-value"
        >
            <TextInput
                isRequired
                type="text"
                id="fixlabel-name"
                name="fixlabel-name"
                value={lfixlabel}
                onChange={setFixLabel}
            />
        </FormGroup>);
    }
    const fixLimitElement = () => {
        return (<FormGroup
            label="Limit"
            isRequired
            fieldId="fixLimit-value"
        >
            <TextInput
                isRequired
                type="text"
                id="fixLimit-name"
                name="fixLimit-name"
                value={lfixLimit}
                onChange={(e) => { setDlimit(); setMapLimit(); setFixLimit(e); }}
            />
        </FormGroup>);
    }

    const mapLimitElement = () => {
        return (<FormGroup
            label="Limits to apply"
            isRequired
            fieldId="operation-value"

        >
            <JsonEditorElement code={lmaplimit} setter={(e) => { setDlimit(); setMapLimit(e); setFixLimit(); }} />
        </FormGroup>);
    }
    const seriesElement = () => {
        return (<FormGroup
            label="Soql Series"
            isRequired
            fieldId="series-value"

        >
            <JsonEditorElement code={lseriesElement} setter={setSeriesMap} />
        </FormGroup>);
    }


    const soqlElement = () => {
        return (
            <FormGroup label="Soql" isRequired fieldId="soql-label">
                <CodeEditor
                    code={lsoql}
                    onChange={handleSoql}
                    language={Language.sql}
                    height="200px"
                /></FormGroup>);
    }
    const toolingElement = () => {
        return (
            <FormGroup label="Tooling Api" isRequired fieldId="tooling-label">
                <Checkbox
                    label="Tooling Api"
                    isChecked={ltooling}
                    onChange={handleTooling}
                    id="tooling"
                    name="tooling"
                /></FormGroup>);
    }
    const soqlBlockElement = () => {

        return (<GridItem span={12}>
            <ExpandableElement title='SOQL Definition'>
                <Grid hasGutter>
                    <GridItem span={2}>
                        {toolingElement()}
                    </GridItem>
                    <GridItem span={10}>
                        {soqlElement()}
                    </GridItem>
                </Grid>
            </ExpandableElement>
        </GridItem>);
    };
    const [labelType, setlabelType] = useState(() => (ldlabel ? LABEL_DYNAMIC : lfixlabel ? LABEL_FIX : ''))
    const labelBlockElement = () => {

        return (<GridItem span={12}>
            <ExpandableElement title='Label definition'>
                <Grid hasGutter>
                    <GridItem span={6}>
                        <FormGroup
                            label="Select a label type"
                            isRequired
                        >
                            <FormSelect value={labelType} onChange={setlabelType} aria-label="FormSelect Input">
                                {[LABEL_FIX, LABEL_DYNAMIC, ''].map((value, index) => (
                                    <FormSelectOption key={index} value={value} label={value} />
                                ))}
                            </FormSelect>
                        </FormGroup>
                    </GridItem>
                    {labelType === LABEL_FIX && <GridItem span={6}>{fixLabelElement()}</GridItem>}
                    {labelType === LABEL_DYNAMIC && <GridItem span={6}>{dlabelElement()}</GridItem>}
                </Grid>
            </ExpandableElement>
        </GridItem>);
    };
    const [limitType, setlimitType] = useState(() => (ldlimit ? LIMIT_DYNAMIC : lfixLimit ? LIMIT_FIX : lmaplimit ? LIMIT_MAP : ''))
    const limitBlockElement = () => {

        return (<GridItem span={12}>
            <ExpandableElement title='Limit definition'>
                <Grid hasGutter>
                    <GridItem span={6}>
                        <FormGroup
                            label="Select a limit type"
                            isRequired
                        >
                            <FormSelect value={limitType} onChange={setlimitType} aria-label="FormSelect Input">
                                {[LIMIT_FIX, LIMIT_DYNAMIC, LIMIT_MAP, ''].map((value, index) => (
                                    <FormSelectOption key={index} value={value} label={value} />
                                ))}
                            </FormSelect>
                        </FormGroup>
                    </GridItem>
                    {limitType === LIMIT_FIX && <GridItem span={6}>{fixLimitElement()}</GridItem>}
                    {limitType === LIMIT_DYNAMIC && <GridItem span={6}>{dlimitElement()}</GridItem>}
                    {limitType === LIMIT_MAP && <GridItem span={6}>{mapLimitElement()}</GridItem>}
                </Grid>
            </ExpandableElement>
        </GridItem>);
    };
    const transformationRulesBlockElement = () => {
        return (<GridItem span={12}>
            <ExpandableElement title='Transformation Rules definition'>
                <Grid hasGutter>
                    <GridItem span={3}>
                        <FormGroup
                            label="Operation"
                            isRequired
                            fieldId="operation-value"
                        >
                            <FormSelect
                                value={loperation}
                                onChange={setOperation}
                                id="component-value"
                                name="component-value"
                                aria-label="Report Type"
                            >
                                {['-', '+', '*', '/', ''].map((value, index) => (
                                    <FormSelectOption key={index} value={value} label={value} />
                                ))}
                            </FormSelect>
                        </FormGroup>
                    </GridItem>
                    <GridItem span={9}>
                        <FormGroup
                            label="Fields to operate over"
                            isRequired
                            fieldId="operation-value"

                        >
                            <JsonEditorElement code={lfields} setter={setFields} />
                        </FormGroup>
                    </GridItem>

                </Grid>
            </ExpandableElement>
        </GridItem>);
    };
    const flexibleComponentsElements = () => {
        return (<>
            {thresholdsElement()}
            {soqlBlockElement()}
            {limitBlockElement()}
            {labelBlockElement()}
            {transformationRulesBlockElement()}
            <GridItem span={12}></GridItem>
        </>);
    }
    const SoqlSingleComponentsElements = () => {
        return (<>
            {thresholdsElement()}
            <GridItem span={6}>
                {toolingElement()}
            </GridItem>
            <GridItem span={6}>
                {soqlElement()}
            </GridItem>
            <GridItem span={6}>
                {limitElement()}
            </GridItem>
            <GridItem span={12}></GridItem>
        </>);
    }
    const SeriesComponentsElements = () => {
        return (<>
            {thresholdsElement()}
            <GridItem span={6}>
                {limitElement()}
            </GridItem>
            <GridItem span={12}>
                {seriesElement()}
            </GridItem>
            <GridItem span={12}></GridItem>
        </>);
    }
    const ApiComponentsElements = () => {
        return (<>
            {thresholdsElement()}
            <GridItem span={6}>
                {limitElement()}
            </GridItem>
            <GridItem span={12}></GridItem>
        </>);
    }
    const AggComponentsElements = () => {
        return (<>
            {thresholdsElement()}
            <GridItem span={6}>
                {toolingElement()}
            </GridItem>
            <GridItem span={6}>
                {soqlElement()}
            </GridItem>
            <GridItem span={6}>
                {limitElement()}
            </GridItem>
            <GridItem span={6}>
                {aggByElement()}
            </GridItem>
            <GridItem span={12}></GridItem>
        </>);
    }
    const handleCreate = () => {
        setMetadata((e) => {
            return findAndAddById(e, {
                id: generateId(),
                component: lComponent,
                title: lTitle,
                span: lSpan,
                thresholds: {
                    success: [lmins, lmaxs],
                    warning: [lminw, lmaxw],
                    danger: [lmind, lmaxd]
                },
                soql: lsoql,
                limit: llimit,
                tooling: ltooling,
                dynamicLimit: ldlimit,
                dynamicLabel: ldlabel,
                aggByName: laggByName,
                fixLabel: lfixlabel,
                fixLimit: lfixLimit,
                mapLimit: lmaplimit,
                series: lseriesElement,
                reduceRules: { fields: lfields, operation: loperation },
                items: lComponent === CMP_SECTION ? [] : null
            }, id);
        });
        setModalOpen(false);
    }
    const handleSave = () => {
        setMetadata((e) => {
            return findAndModifyById(e, {
                id: id,
                component: lComponent,
                title: lTitle,
                span: lSpan,
                thresholds: {
                    success: [lmins, lmaxs],
                    warning: [lminw, lmaxw],
                    danger: [lmind, lmaxd]
                },
                soql: lsoql,
                limit: llimit,
                tooling: ltooling,
                dynamicLimit: ldlimit,
                dynamicLabel: ldlabel,
                aggByName: laggByName,
                fixLabel: lfixlabel,
                fixLimit: lfixLimit,
                mapLimit: lmaplimit,
                series: lseriesElement,
                reduceRules: { fields: lfields, operation: loperation }
            });
        });
        setModalOpen(false);
    }
    const handleModalToggle = () => {
        setModalOpen(false);
    }
    const thresholdsElement = () => {
        return (<>
            <GridItem span={12}>
                <Divider />
            </GridItem>
            <GridItem span={12}>
                <Grid hasGutter>
                    <GridItem span={12}>
                        <center><b>Thresholds</b></center>
                    </GridItem>
                    <GridItem span={4}>
                        <center>Success <Status status={STATUS_SUCCESS} /></center>
                    </GridItem>
                    <GridItem span={4}>
                        <center>Warning <Status status={STATUS_WARNING} /></center>
                    </GridItem>
                    <GridItem span={4}>
                        <center>Danger <Status status={STATUS_DANGER} /></center>
                    </GridItem>
                    <GridItem span={2}>
                        <FormGroup
                            label="Minimun"
                            isRequired
                            fieldId="span-value"
                        >
                            <TextInput
                                isRequired
                                type="number"
                                id="mins-name"
                                name="mins-name"
                                value={lmins}
                                onChange={handleMins}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={2}>
                        <FormGroup
                            label="Maximum"
                            isRequired
                            fieldId="span-value"
                        >
                            <TextInput
                                isRequired
                                type="number"
                                id="maxs-name"
                                name="maxs-name"
                                value={lmaxs}
                                onChange={handleMaxs}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={2}>
                        <FormGroup
                            label="Minimun"
                            isRequired
                            fieldId="span-value"
                        >
                            <TextInput
                                isRequired
                                type="number"
                                id="minw-name"
                                name="minw-name"
                                value={lminw}
                                onChange={handleMinw}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={2}>
                        <FormGroup
                            label="Maximum"
                            isRequired
                            fieldId="span-value"
                        >
                            <TextInput
                                isRequired
                                type="number"
                                id="maxw-name"
                                name="maxw-name"
                                value={lmaxw}
                                onChange={handleMaxw}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={2}>
                        <FormGroup
                            label="Minimun"
                            isRequired
                            fieldId="span-value"
                        >
                            <TextInput
                                isRequired
                                type="number"
                                id="mind-name"
                                name="mind-name"
                                value={lmind}
                                onChange={handleMind}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={2}>
                        <FormGroup
                            label="Maximum"
                            isRequired
                            fieldId="span-value"
                        >
                            <TextInput
                                isRequired
                                type="number"
                                id="maxd-name"
                                name="maxd-name"
                                value={lmaxd}
                                onChange={handleMaxd}
                            />
                        </FormGroup>
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem span={12}>
                <Divider />
            </GridItem></>);
    }
    return (
        <>
            <Form>
                <Grid hasGutter>

                    <GridItem span={6}>
                        <FormGroup
                            label="Title"
                            isRequired
                            fieldId="title-value"
                        >
                            <TextInput
                                isRequired
                                type="text"
                                id="title-name"
                                name="title-name"
                                value={lTitle}
                                onChange={handleTitleChange}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={6}>
                        <FormGroup
                            label="Span"
                            isRequired
                            fieldId="span-value"
                        >
                            <TextInput
                                isRequired
                                type="number"
                                id="span-name"
                                name="span-name"
                                value={lSpan}
                                onChange={handleSpanChange}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={12}>
                        <FormGroup label="Report Type" fieldId="component-label">
                            <FormSelect
                                value={lComponent}
                                onChange={handleComponentChange}
                                id="component-value"
                                name="component-value"
                                aria-label="Report Type"
                            >
                                {[{ value: CMP_SECTION, label: 'Section' },
                                { value: CMP_SOQL_SINGLE_LIMIT, label: 'Single Select Count Report' },
                                { value: CMP_SOQL_SERIES_LIMIT, label: 'Multiple Select Count Report' },
                                { value: CMP_SOQL_FLEXIBLE_LIMIT, label: 'Single Flexible Select Report' },
                                { value: CMP_SOQL_AGG_LIMIT, label: 'Single Select Aggregated Report' },
                                { value: CMP_API_LIMIT, label: 'Single Api Limit Report' }].map((option, index) => (
                                    <FormSelectOption key={index} value={option.value} label={option.label} />
                                ))}
                            </FormSelect>
                        </FormGroup>
                    </GridItem>
                    {(lComponent === CMP_SOQL_FLEXIBLE_LIMIT)
                        && flexibleComponentsElements()}
                    {(lComponent === CMP_SOQL_AGG_LIMIT)
                        && AggComponentsElements()}
                    {(lComponent === CMP_SOQL_SINGLE_LIMIT)
                        && SoqlSingleComponentsElements()}
                    {(lComponent === CMP_API_LIMIT)
                        && ApiComponentsElements()}
                    {(lComponent === CMP_SOQL_SERIES_LIMIT)
                        && SeriesComponentsElements()}
                    <GridItem span={5}></GridItem>
                    <GridItem span={1}>
                        {!isAdd && <Button key="save" variant="primary" onClick={handleSave}>
                            Save
                        </Button>}

                        {isAdd && <Button key="save" variant="primary" onClick={handleCreate}>
                            Create
                        </Button>}
                    </GridItem>
                    <GridItem span={1}>
                        <Button key="cancel" variant="link" onClick={handleModalToggle}>
                            Cancel
                        </Button>
                    </GridItem>
                    <GridItem span={5}></GridItem>
                </Grid>
            </Form>
        </>
    )

}
