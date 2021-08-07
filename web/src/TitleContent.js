import React from 'react';
import { useState } from 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import classIcon from './images/work_at_home.png';
import background from './images/background.png';
import { Link } from 'react-router-dom';
import {BACKEND} from "./Configuration"

const useStyle = makeStyles({
    background: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-start",
        fontFamily: 'Raleway',
        zIndex: "-1"
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        alignItems: "center",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#FFA114',
        textAlign: 'center',
        marginBottom: '1rem'

    },
    text: {
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        fontSize : "1.5rem",
        textAlign: "center",
        marginBottom: "1rem"
    },
    image: {
        height: '25rem'
    },
    file: {
        display: 'flex',
        flexDirection: "column", textAlign: "center",
        alignItems: "center"
    },
    selectFile: {
        fontSize: "2rem",
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: "#FFA114"
    },
    browse: {
        textAlign: "center",
        marginBottom: "1rem"
        // background: "red"
    },
    submit: {
        width: "13rem",
        height: "4rem",
        background: "linear-gradient(#FFC267, #FFBD5A)",
        border: "none",
        fontSize: "1.25rem",
        borderRadius: ".5rem",
        fontFamily: "Raleway",
        fontWeight: "bold",
        color: "#FFFFFF",
        cursor: "pointer"
    }
})

const handleClick = () => {
    console.log("Clicked!")
}

export function TitleContent({handleSubmit}) {
    const classes = useStyle()
    return (
        <>
            <div className={classes.background}>

                <div className={classes.content}>
                    <div><img src={classIcon} alt="class icon" className={classes.image} /></div>
                    <div className={classes.title}>Audio Refiner</div>
                    <div className={classes.text}>
AudioTech Refiner provides a seamless online voice-call experience for everyone. 
Thanks to modern deep learning technologies, we generate accurate speech captions in real-time that are further regenerated into voice to eliminate noise and distortion in speech audio caused by insufficient internet bandwidth.
                    </div>

                    <form onSubmit={handleSubmit} className={classes.file}>
                        <div className={classes.selectFile}>Upload your voice (up to 3 clips)</div>
                        <div>
                            <input type="file" className={classes.browse} multiple name="audios" id="audios" autocomplete="off" required></input>
                        </div>
                        <div className={classes.selectFile}>Select Audio</div>
                        <div>
                            <input type="file" className={classes.browse} name="video" id="video" autocomplete="off" required></input>
                        </div>
                        {/* <Link to="/result" exact="true" style={{textDecoration: "none"}}> */}
                            <div style={{marginTop : "1rem"}}>
                                <input className={classes.submit} type="submit" value="SUBMIT AUDIO" onHover={() => handleClick()}></input>
                            </div>
                        {/* </Link> */}
                    </form>
                </div>

            </div>

        </>
    )
}

export default TitleContent;
