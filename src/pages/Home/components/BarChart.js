// 柱状图组件
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';

const BarChart = ({title}) => {
    const chartRef = useRef(null)
    useEffect(() => {
        // 保证dom可用后，再进行图表渲染
        // 1.获取渲染图标的dom结点
        const chartDom = chartRef.current
        // 2.初始化echarts实例
        const myChart = echarts.init(chartDom)
        // 3.设置图表配置项
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Vue', 'Angular', 'React']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [60, 50, 70],
                    type: 'bar'
                }
            ]
        };
        // 4.使用图表配置项，完成图表渲染
        option && myChart.setOption(option);
    }, [])

    return <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
}

export default BarChart