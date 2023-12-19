import React from 'react';

interface ISpinnerProps {
    className?: string;
}

export const SpinnerCircle = (props: ISpinnerProps) => (
    <div className={props.className ? props.className : ''}>
        <div className="sk-spinner sk-spinner-circle">
            <div className="sk-circle1 sk-circle" />
            <div className="sk-circle2 sk-circle" />
            <div className="sk-circle3 sk-circle" />
            <div className="sk-circle4 sk-circle" />
            <div className="sk-circle5 sk-circle" />
            <div className="sk-circle6 sk-circle" />
            <div className="sk-circle7 sk-circle" />
            <div className="sk-circle8 sk-circle" />
            <div className="sk-circle9 sk-circle" />
            <div className="sk-circle10 sk-circle" />
            <div className="sk-circle11 sk-circle" />
            <div className="sk-circle12 sk-circle" />
        </div>
    </div>
)

export const SpinnerBounce = (props: ISpinnerProps) => (
    <div className={props.className ? props.className : ''}>
        <div className="sk-spinner sk-spinner-three-bounce m-0 p-2">
            <div className="sk-bounce1" />
            <div className="sk-bounce2" />
            <div className="sk-bounce3" />
        </div>
    </div>
)

export const SpinnerRectangle = (props: ISpinnerProps) => (
    <div className={props.className ? props.className : ''}>
        <div className="sk-spinner sk-spinner-wave">
            <div className="sk-rect1" />
            <div className="sk-rect2" />
            <div className="sk-rect3" />
            <div className="sk-rect4" />
            <div className="sk-rect5" />
        </div>
    </div>
)



