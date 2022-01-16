import { useEffect, useState } from "react";
import { compose } from "../utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

type ClockTime = {
    hours: number,
    minutes: number,
    seconds: number
}

type K = keyof ClockTime;

const useClock = () => {
    const [timer, setTimer] = useState<any>("")

    const oneSecond = () => 1000;
    const getCurrentTime = () => new Date();
    //const log = (message: string) => console.log(message)

    const serializeClockTime = (date: any): ClockTime => ({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    });

    /*const civilianHours = (clockTime: ClockTime) => ({
        ...clockTime,
        hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours
    });

    const appendAMPM = (clockTime: ClockTime) => ({
        ...clockTime,
        ampm: clockTime.hours >= 12 ? "PM" : "AM"
    });

    const convertToCiviliaTime = (clockTime: any) =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);*/

    const display = (target: any) => (time: any) => target(time);

    const formatClock = (format: any) => (time: any) =>
        format
            .replace("hh", time.hours)
            .replace("mm", time.minutes)
            .replace("ss", time.seconds)
            //.replace("tt", time.ampm);
            .replace("tt", "");

    const prependZero = (key: K) => (clockTime: any) => {
        clockTime[key] = clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key]
        return clockTime;
        /*return ({
            ...clockTime,
            key: clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key]
        })*/
    };

    const doubleDigits = (civilianTime: any) =>
        compose(
            prependZero("hours"),
            prependZero("minutes"),
            prependZero("seconds"),
        )(civilianTime)

    const startTicking = () =>
        setInterval(
            compose(
                getCurrentTime,
                serializeClockTime,
                //convertToCiviliaTime,
                doubleDigits,
                formatClock("hh:mm:ss tt"),
                display(setTimer)
            ),
            oneSecond()
        );


    useEffect(() => {
        const interval = startTicking();
        return () => clearInterval(interval)
    }, [])

    return timer;
}

export default useClock;