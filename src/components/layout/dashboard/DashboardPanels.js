import { Grid } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import Loading from 'components/ui/Loading';
import React, { useEffect, useMemo, useState } from 'react';
import { IconChartBar } from "../../ui/Icons";
import Title from "../../ui/Title";
import MyTasksWidget from './widgets/MyTasksWidget';
import PopularCommandsWidget from './widgets/PopularCommandsWidget';
import RecentActivityWidget from './widgets/RecentActivityWidget';
import UserActivityStatsWidget from './widgets/UserActivityStatsWidget';
import VulnerabilitiesByCategoryStatsWidget from './widgets/VulnerabilitiesByCategoryStatsWidget';
import VulnerabilitiesByRiskStatsWidget from './widgets/VulnerabilitiesByRiskStatsWidget';

const DashboardPanels = () => {
    const Widgets = useMemo(() => {
        return {
            'my-tasks': { id: 'my-tasks', title: 'My tasks', visible: true },
            'vulnerability-by-risk-stats': { id: 'vulnerability-by-risk-stats', title: 'Vulnerability by risk', visible: true },
            'popular-commands': { id: 'popular-commands', title: 'Popular commands', visible: true },
            'vulnerability-by-category-stats': { id: 'vulnerability-by-category-stats', title: 'Vulnerability by category', visible: true },
            'recent-activity': { id: 'recent-activity', title: 'Recent activity', visible: true },
            'user-activity-stats': { id: 'user-activity-stats', title: 'User activity over time', visible: true },
        }
    }
        , []);

    const [dashboardConfig, setDashboardConfig] = useState(null);

    const onWidgetChange = (ev, widget) => {
        const dashboardConfigCopy = dashboardConfig;
        dashboardConfigCopy[ev.target.name].visible = ev.target.checked;

        localStorage.setItem('widget-config', JSON.stringify(dashboardConfigCopy));

        setDashboardConfig({ ...dashboardConfig, [ev.target.name]: { ...dashboardConfig[ev.target.name], visible: ev.target.checked } });
    }

    useEffect(() => {
        const localStorageConfig = localStorage.getItem('widget-config');
        let memoryConfig;
        if (localStorageConfig === null || localStorageConfig === undefined) {
            memoryConfig = Widgets;
        } else {
            memoryConfig = JSON.parse(localStorageConfig);
        }
        setDashboardConfig(memoryConfig)
    }, [Widgets]);

    if (dashboardConfig === null) return <Loading />

    return <section>
        <Title type="Home" title="Dashboard" icon={<IconChartBar />} />
        <Tabs>
            <TabList>
                <Tab>View</Tab>
                <Tab>Configure</Tab>

            </TabList>
            <TabPanels>
                <TabPanel>
                    <Grid templateColumns='repeat(3,1fr)' gap='3'>
                        <MyTasksWidget />
                        <VulnerabilitiesByRiskStatsWidget />
                        <PopularCommandsWidget />
                        <VulnerabilitiesByCategoryStatsWidget />
                        <RecentActivityWidget />
                        <UserActivityStatsWidget />
                    </Grid>
                </TabPanel>
                <TabPanel>
                    <h4>Select which widgets to present in your dashboard</h4>
                    <br />
                    {Object.keys(dashboardConfig).map((widgetKey) => {
                        return <><label><input type="checkbox" name={widgetKey} checked={dashboardConfig[widgetKey].visible} onChange={onWidgetChange} /> {dashboardConfig[widgetKey].title}</label><br /></>
                    })}
                </TabPanel>
            </TabPanels>
        </Tabs>
    </section>
}

export default DashboardPanels;
