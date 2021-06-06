import {generateId} from '../helpers/utils';



export const metadata = [
    {
        id:generateId(),
        component: 'section',
        title: 'High Priority',
        items: [
            {
                id:generateId(),
                component: 'section',
                title: 'Data Model',
                items: [
                    {
                        id:generateId(),
                        span: 3, title: 'Custom Objects', limit: '2000', thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }, soql: "SELECT count() FROM EntityDefinition WHERE QualifiedApiName LIKE '%__c' AND DurableId LIKE '01%' AND NamespacePrefix != 'purecloud' AND NamespacePrefix != 'trailheadapp'",
                        component: 'soql-single-limit'
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Account',
                        tooling: true,
                        dynamicLabel: 'Label',
                        dynamicLimit: 'Max',
                        reduceRules: { fields: ['Max', 'Remaining'], operation: '-' },
                        soql: "SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Account'",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Contact',
                        tooling: true,
                        dynamicLabel: 'Label',
                        dynamicLimit: 'Max',
                        reduceRules: { fields: ['Max', 'Remaining'], operation: '-' },
                        soql: "SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Contact'",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Case',
                        tooling: true,
                        dynamicLabel: 'Label',
                        dynamicLimit: 'Max',
                        reduceRules: { fields: ['Max', 'Remaining'], operation: '-' },
                        soql: "SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Case'",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Opportunity',
                        tooling: true,
                        dynamicLabel: 'Label',
                        dynamicLimit: 'Max',
                        reduceRules: { fields: ['Max', 'Remaining'], operation: '-' },
                        soql: "SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Opportunity'",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Asset',
                        tooling: true,
                        dynamicLabel: 'Label',
                        dynamicLimit: 'Max',
                        reduceRules: { fields: ['Max', 'Remaining'], operation: '-' },
                        soql: "SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Asset'",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Lead',
                        tooling: true,
                        dynamicLabel: 'Label',
                        dynamicLimit: 'Max',
                        reduceRules: { fields: ['Max', 'Remaining'], operation: '-' },
                        soql: "SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Lead'",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Activity',
                        tooling: true,
                        dynamicLabel: 'Label',
                        dynamicLimit: 'Max',
                        reduceRules: { fields: ['Max', 'Remaining'], operation: '-' },
                        soql: "SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Activity'",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    }
                ]
            },
            {
                id:generateId(),
                title: 'Sandboxes',
                component: 'soql-flexible-limit',
                span: 3,

                tooling: true,
                dynamicLabel: 'LicenseType',
                mapLimit: {
                    FULL: 2,
                    PARTIAL: 1,
                    DEVELOPER_PRO: 10,
                    DEVELOPER: 140
                },
                reduceRules: { fields: ['expr0'], operation: '+' },
                soql: "SELECT count(id),LicenseType from SandboxInfo group by LicenseType",
                thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }
            },
            {
                id:generateId(),
                title: 'Scheduled Apex',
                component: 'soql-single-limit',
                span: 3,
                limit: '100', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT ApexClass.Name, COUNT(ApexClassId) FROM AsyncApexJob WHERE JobType = 'ScheduledApex'  AND Status IN ('Queued', 'Processing') GROUP BY ApexClass.Name ORDER BY ApexClass.Name",
            },
            {
                id:generateId(),
                title: 'Field History Tracking',
                component: 'soql-aggregate-limit',
                span: 3,

                limit: 20,
                soql: "SELECT EntityDefinitionId FROM FieldDefinition WHERE EntityDefinitionId in ('Account','Case','Contact','Lead','Opportunity') AND IsFieldHistoryTracked = true ",
                aggByName: 'EntityDefinitionId',
                thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }
            }
        ]
    },
    {
        id:generateId(),
        component: 'section',
        title: 'Medium Priority',
        items: [

            {
                id:generateId(),
                component: 'section',
                title: 'Storage',
                items: [
                    {
                        id:generateId(),
                        title: 'Data Storage',
                        component: 'api-limit',
                        span: 3,
                        limit: 'DataStorageMB',
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        title: 'File Storage',
                        component: 'api-limit',
                        span: 3,
                        limit: 'FileStorageMB',
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Static Resource Size',
                        fixLabel: 'Static Resource Size',
                        fixLimit: 250000000,
                        reduceRules: { fields: ['expr0'] },
                        soql: "SELECT SUM(BodyLength) FROM StaticResource",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    }
                ]
            },
            {
                id:generateId(),
                component: 'soql-flexible-limit',
                span: 3,
                tooling: true,
                title: 'Apex Coverage',
                fixLabel: 'Apex Coverage',
                fixLimit: 100,
                reduceRules: { fields: ['PercentCovered'] },
                soql: "SELECT PercentCovered  from ApexOrgWideCoverage LIMIT 1",
                thresholds: {
                    success: [91, 100],
                    warning: [75, 90],
                    danger: [0, 74],
                }
            },
            {
                id:generateId(),
                span: 3, title: 'Dashboards', limit: '110', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM Dashboard WHERE Type = 'LoggedInUser' OR Type = 'MyTeamUser'",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                span: 3, title: 'Custom Tabs', limit: '9999', tooling: true, thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM CustomTab",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                span: 3, title: 'Permission Sets', limit: '1000', tooling: true, thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM PermissionSet",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                span: 3, title: 'Certificates', limit: '50', tooling: true, thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "select COUNT() from Certificate",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                span: 3, title: 'Flows', limit: '500', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM FlowDefinitionView WHERE ProcessType IN ('Flow', 'AutoLaunchedFlow') AND IsActive  = true",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                span: 3, title: 'Communities', limit: '100', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT count() from Site where Subdomain != null",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                component: 'soql-series-limit',
                span: 3,
                tooling: true,
                title: 'Rules',
                limit: 2000,
                series: [{ soql: 'SELECT count() FROM AssignmentRule', label: 'Assignment Rules' },
                { soql: 'SELECT COUNT() FROM AutoResponseRule', tooling: true, label: 'Auto Response Rules' },
                { soql: 'SELECT COUNT() FROM WorkFlowRule WHERE NamespacePrefix = null', tooling: true, label: 'WorkFlow Rules' },
                { soql: 'SELECT COUNT() FROM FlowDefinition WHERE NamespacePrefix = null', tooling: true, label: 'Process Builder' }],
                thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }
            }

        ]

    },
    {
        id:generateId(),
        component: 'section',
        title: 'Low Priority',
        items: [
            {
                id:generateId(),
                component: 'section',
                title: 'Territories',
                items: [
                    {
                        id:generateId(),
                        title: 'Territories',
                        span: 3, limit: '1000', thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }, soql: "SELECT COUNT() FROM Territory2",
                        component: 'soql-single-limit'
                    },
                    {
                        id:generateId(),
                        title: 'Territory Model',
                        span: 3, limit: '1000', thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }, soql: "SELECT COUNT() FROM Territory2Model",
                        component: 'soql-single-limit'
                    }
                ]
            },
            {
                id:generateId(),
                component: 'section',
                title: 'Approval Process',
                items: [
                    {
                        id:generateId(),
                        component: 'soql-flexible-limit',
                        span: 3,
                        title: 'Approval Processes',
                        dynamicLabel: 'TableEnumOrId',
                        fixLimit: 300,
                        reduceRules: { fields: ['expr0'] },
                        soql: "SELECT TableEnumOrId, COUNT(Name) FROM ProcessDefinition WHERE Type = 'Approval' GROUP BY TableEnumOrId",
                        thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }
                    },
                    {
                        id:generateId(),
                        title: 'Total Approval Process',
                        span: 3, limit: '1000', thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }, soql: "SELECT COUNT() FROM ProcessDefinition WHERE Type = 'Approval'",
                        component: 'soql-single-limit'
                    },
                    {
                        id:generateId(),
                        title: 'Total Active Approval Process',
                        span: 3, limit: '2000', thresholds: {
                            success: [0, 50],
                            warning: [51, 90],
                            danger: [91, 100],
                        }, soql: "SELECT COUNT() FROM ProcessDefinition WHERE Type = 'Approval' AND State = 'Active'",
                        component: 'soql-single-limit'
                    }



                ]
            },
            {
                id:generateId(),
                title: 'Total Approval Process',
                span: 3, limit: '1000', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM CronTrigger WHERE CronJobDetail.JobType = '8'",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                title: 'Total Approval Process',
                span: 3, limit: '1000', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM CustomPermission",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                title: 'Profiles',
                span: 3, limit: '1500', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM Profile",
                component: 'soql-single-limit'
            },
            {
                id:generateId(),
                title: 'Public Groups',
                span: 3, limit: '10000', thresholds: {
                    success: [0, 50],
                    warning: [51, 90],
                    danger: [91, 100],
                }, soql: "SELECT COUNT() FROM Group",
                component: 'soql-single-limit'
            }
        ]
    }
]