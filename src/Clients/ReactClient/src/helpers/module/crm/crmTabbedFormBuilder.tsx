import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import _ from 'lodash';

interface ITabProps {
    title: string;
    content: ISectionProps[];
}

interface ISectionProps {
    title?: string;
    layout?: 'raw' | 'balancedFields';
    content: any;
}

// #MoveToVPBase.Modules
// THIS SHOULD BE UPDATED IN VPBASE.MODULE SO THAT THIS FILE CAN BE REMOVED
// THIS CLASS SHOULD BE ABLE TO HANDLE TABS WITH CUSTOM CONTENT, NOT ONLY LISTS OF <FIELD /> FROM FORMIK
export class CrmTabbedFormBuilder {
    private tabs: ITabProps[];
    public static readonly DefaultInitialTabName = 'Information';

    constructor() {
        this.tabs = [];
    }

    public getTabNames(): string[] {
        return this.tabs.map((tab: ITabProps) => tab.title);
    }

    public addTab(title: string, sections: ISectionProps[]) {
        this.tabs.push({ title, content: sections });
    }

    public addRawTab(title: string, sections: ISectionProps[]) {
        this.tabs.push({
            title,
            content: sections.map(section => ({
                title: section.title,
                layout: 'raw',
                content: section.content,
            })),
        });
    }

    public addSectionToTab(tabTitle: string, section: ISectionProps) {
        const tab = _.find(this.tabs, ['title', tabTitle]);

        if (tab) {
            tab.content.push(section);
        }
    }

    public buildForm() {
        let counter = 0;

        const tabHeadings = this.tabs.map((tab: ITabProps) => (
            <Tab key={tab.title} className="nav-item nav-link tab-link">
                {tab.title}
            </Tab>
        ));

        const tabPanels = this.tabs.map((tab: ITabProps) => {
            this.sortSections(tab.content);
            return (
                <TabPanel key={tab.title} className="col-12">
                    {tab.content.map(section => this.buildSection(section, counter++))}
                </TabPanel>
            );
        });

        return (
            <Tabs className="mx-4-lg react-tabs__menu is--open">
                <TabList className="row tab-ul flex-wrap mx-2-lg mb-5">{tabHeadings}</TabList>
                {tabPanels}
            </Tabs>
        );
    }

    private sortSections(sections: ISectionProps[]) {
        sections.sort(sectionSort);

        function sectionSort(a: ISectionProps, b: ISectionProps) {
            if (a.layout === 'raw' && b.layout !== 'raw') {
                return -1;
            }

            if (b.layout === 'raw' && a.layout !== 'raw') {
                return 1;
            }

            if (a.title === undefined && b.title !== undefined) {
                return -1;
            }

            if (b.title === undefined && a.title !== undefined) {
                return 1;
            }

            if (a.title === undefined && b.title === undefined) {
                return 0;
            }

            if (a.title === undefined) {
                // Should never be reached...
                return -1;
            }

            if (b.title === undefined) {
                // Should never be reached...
                return 1;
            }

            var nameA = a.title.toUpperCase();
            var nameB = b.title.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        }
    }

    private buildSection(section: ISectionProps, keyBackup: number) {
        const layout = section.layout ? section.layout : 'balancedFields';

        let colOneSection: any = [];
        let colTwoSection: any = [];
        let content: any = null;
        const indexToSplit = section.content.length / 2;

        if (layout === 'balancedFields') {
            if (section.content.length % 2 === 0) {
                colOneSection = section.content.slice(0, indexToSplit);
                colTwoSection = section.content.slice(indexToSplit);
            } else if (section.content.length > 1) {
                colOneSection = section.content.slice(0, indexToSplit + 0.5);
                colTwoSection = section.content.slice(indexToSplit + 0.5);
            } else {
                colOneSection = section.content;
            }

            content = (
                <div className="row">
                    <div className="col-lg-6 col-md-12">{colOneSection}</div>
                    <div className="col-lg-6 col-md-12">{colTwoSection}</div>
                </div>
            );
        } else if (layout === 'raw') {
            content = section.content;
        }

        const sectionTitle =
            section.title === undefined ? null : (
                <h2 className="pb-2 mb-3 border-bottom">{section.title}</h2>
            );

        return (
            <div
                key={section.title ? section.title : keyBackup}
                className="mb-4 pb-2 row border-bt-VPBase-form"
            >
                <div className="mb-4 col-12">
                    {sectionTitle}
                    {content}
                </div>
            </div>
        );
    }
}
