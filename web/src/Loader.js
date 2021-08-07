import React from "react"

import { makeStyles } from '@material-ui/core/styles'
import Spinner from "react-spinkit"
import background from "./images/background.png"



const useSkeletonStyles = makeStyles(theme => ({
  
    colored : {
        color : theme.palette.primary.main,
    },
    background: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        fontFamily: 'Raleway',
        zIndex: "-1",
    },
    text : {
        color : theme.palette.primary.main,
        fontSize : "2rem",
        display : "flex",
        flexDirection : "column"
        
    },
    spinner : {
        transform: "translate(50%,10vh)",
        color : theme.palette.primary.main
        
    }
    
}))

function LoaderAnimation() {
    const classes = useSkeletonStyles()
    return (
        <div className={classes.background}>
            <div className={classes.colored}>
           <div className={classes.text}>
            Analyzing results ... Please wait 
            <Spinner name="ball-spin-fade-loader" className={classes.spinner} fadeIn='none'>
            </Spinner>
               </div> 

            </div>
        </div>
    )
}

export const Loader = ({loading,render}) => {
    if (loading){
        return (
            <LoaderAnimation></LoaderAnimation>
            ) 
        } else {
            return render()
        }
    }