import React from 'react'
import { ChartPie,ChartThemeColor } from '@patternfly/react-charts';

export const PieElement = ({data}) => {
    return (
        <div>
            <ChartPie
                constrainToVisibleArea={true}
                data={data}
                height={500}
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                legendOrientation="vertical"
                legendPosition="right"
                themeColor={ChartThemeColor.multiOrdered}
                width={350}
                />
        </div>
    )
}
