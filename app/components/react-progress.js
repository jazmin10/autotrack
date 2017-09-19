import React, { Component } from 'react'
import isEqual from 'lodash/isequal';
import * as ProgressBar from 'progressbar.js'


class Shape extends Component {
    constructor() {
        super()
        this.state = {shape: null}
    }
    render() {
        var style = this.props.containerStyle;
        var className = this.props.containerClassName;

        return <div className={className} style={style} ref={el => this.progressBar = el}></div>;
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.options, nextProps.options)) {
            this._destroy();
            this._create(nextProps, this.props);
            return;
        }

        this._animateProgress(nextProps.progress);
        this._setText(nextProps.text);
    }

    componentDidMount() {
        this._create(this.props);
    }

    componentWillUnmount() {
        this._destroy()
    }

    _create(props, oldProps) {
        if (this.state.shape !== null) {
            throw new Error('Progressbar is already created');
        }

        // setState function is not used to prevent a new render cycle
        // This handling happens outside of React component's lifecycle
        var container = this.progressBar;
        this.state.shape = new props.ShapeClass(
            container,
            props.options
        );

        if (props.initialAnimate) {
            if (oldProps) {
                this._setProgress(oldProps.progress);
            }

            this._animateProgress(props.progress);
        } else {
            this._setProgress(props.progress);
        }

        this._setText(props.text);
    }

    _destroy() {
        if (this.state.shape) {
            this.state.shape.destroy();
            this.state.shape = null;
        }
    }

    _animateProgress(progress) {
        this.state.shape.animate(progress);
    }

    _setProgress(progress) {
        this.state.shape.set(progress);
    }

    _setText(text) {
        if (text) {
            this.state.shape.setText(text);
        }
    }
}

Shape.defaultProps = {
    ShapeClass: null,
    options: {},
    progress: 0,
    text: null,
    initialAnimate: false,
    containerStyle: {},
    containerClassName: '.progressbar-container'
}


function Line (props) {
    return <Shape {...props} ShapeClass={ProgressBar.Line} />
}


function Circle (props) {
    return <Shape {...props} ShapeClass={ProgressBar.Circle} />
}


function SemiCircle (props) {
    return <Shape {...props} ShapeClass={ProgressBar.SemiCircle} />;
}

export { Line, Circle, SemiCircle }
