import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    grid: {
        backgroundColor: 'rgba(255, 194, 103, 1)',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '1rem',
        height: '2rem',
        margin: '0.1rem',
        borderRadius: ".1rem"

    },
    progressBar: {
        display: "flex",
    },
    bar: {
        background: "#FFEFD7",
        height: "3rem",
        width: "12rem",
        borderRadius: ".3rem",
        display: "flex",
        alignItems: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem"
    }
})

export default function Bar(props) {
    const {score} = props
    const percent = Math.floor(10 * score)
    let [counter, setCounter] = useState(0);
    const classes = useStyles();
    const Loader = () => {
        useEffect(() => {
            function update() {
                if (counter < percent) {
                    counter += 1
                    setCounter(counter)
                    setTimeout(update, 100)
                }

            }
            update()


        }, [])
        return (
            <>
                <div className={classes.bar}>
                    <div className={classes.progressBar}>
                        {(new Array(counter)).fill(1).map((el, id) => <div className={classes.grid} key={id} ></div>)}
                    </div>

                </div>
            </>
        )

    }

    return (
        Loader()
    )
}
