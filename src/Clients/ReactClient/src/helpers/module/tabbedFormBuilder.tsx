import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import _ from 'lodash';

interface ITabProps {
    title: string,
    content: ISectionProps[],
}

interface ISectionProps {
    title?: string,
    content: any,
}

export class TabbedFormBuilder {
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

    public addSectionToTab(tabTitle: string, section: ISectionProps) {
        const tab = _.find(this.tabs, ['title', tabTitle]);

        if (tab) {
            tab.content.push(section);
        }
    }

    public buildForm() {
        let counter = 0;
        const tabHeadings = this.tabs.map((tab: ITabProps) => <Tab key={tab.title} className="nav-item nav-link tab-link col-lg-3 col-md-3 col-xs-3">{tab.title}</Tab>)
        const tabPanels = this.tabs.map((tab: ITabProps) => <TabPanel key={tab.title} className="col-sm-12">{tab.content.map((section) => this.buildSection(section, counter++))}</TabPanel>)

        return (
            <Tabs className="mx-4-lg react-tabs__menu is--open">
                <TabList className="row tab-ul flex-wrap mx-2-lg mb-5">{tabHeadings}</TabList>
                {tabPanels}
            </Tabs>
        )
    }

    private buildSection(section: ISectionProps, keyBackup: number) {

        let colOneSection: any = [];
        let colTwoSection: any = [];
        const indexToSplit = section.content.length / 2;

        if (section.content.length % 2 === 0 ) {
            colOneSection = section.content.slice(0, indexToSplit);
            colTwoSection = section.content.slice(indexToSplit);
        } else if ( section.content.length > 1) {
            colOneSection = section.content.slice(0, indexToSplit + 0.5);
            colTwoSection = section.content.slice(indexToSplit + 0.5);
        } else {
            colOneSection = section.content
        }

        const sectionTitle = section.title === undefined
            ? null
            : <h2 className="pb-2 mb-3 border-bottom">{section.title}</h2>;

        return (
            <div key={section.title ? section.title : keyBackup} className="mb-4 pb-2 row border-bt-VPBase-form">
                <div className="mb-4 col-12">
                    {sectionTitle}
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            {colOneSection}
                        </div>
                        <div className="col-lg-6 col-md-12">
                            {colTwoSection}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}