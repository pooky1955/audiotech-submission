import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {

    },
    chart: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway',
        width: '50rem',
        height: "auto"
    }
});

function Chart({ numbers, interval = 2000, handleClick }) {
    const [chartData, setChartData] = useState({})
    const [chartOption, setChartOption] = useState({})

    let xs = new Array(numbers.length).fill().map((_, i) => i * interval);
    let ys = numbers


    const chart = () => {
        setChartData({
            labels: xs,
            datasets: [
                {
                    fontFamily: 'Raleway',
                    data: ys,
                    backgroundColor: [
                        'rgba(255,194,103,0.7)'
                    ],
                    borderWidth: 4
                }
            ],
        })
    }
    const options = () => {
        setChartOption({
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time in Seconds (s)',
                        fontFamily: 'Raleway'
                    },

                    gridLines: {
                        color: "rgb(250, 249, 249)",
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Student Attention Level',
                        fontFamily: 'Raleway'
                    },

                    gridLines: {
                        color: "rgb(250, 249, 249)",
                    }
                }]
            }
        })
    }

    useEffect(() => {
        chart()
        options()
    }, [])


    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.chart}>
                    <Line data={chartData} options={chartOption} onElementsClick={(e) => {
                        console.log(e)
                        try {
                        const dataIndex = e[0]["_index"]
                        const x = xs[dataIndex]
                        const y = ys[dataIndex]
                        handleClick(x, y)
                        } catch  {

                        }
                    }}></Line>
                </div>

            </div>
        </>
    )
}

export default Chart
