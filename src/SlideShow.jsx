// @flow
import React from "react";
import PropTypes from "prop-types";

type Props = {
  style: Object,
  src: Array<string>,
  prevIcon: Node,
  nextIcon: Node,
}

type State = {
  src: string,
  index: number,
  progress: number
}

export default class SlideShow extends React.Component {
  state: State;
  props: Props;
  style: Object;
  static defaultProps: Object;
  static PropTypes: Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      src: "",
      index: 0,
      progress: 0
    };
  }

  componentWillMount() {
    const images: Array<string> = this.props.src;
    if (this.isEmptyArray(this.props.src)) {
      return;
    }
    let progress = Math.ceil(100 / images.length);
    if (progress > 100) {
      progress = 100;
    }

    this.setState({
      src: images[0],
      index: 0,
      progress: progress
    })
  }

  onClickPrevButton = () => {
    if (this.isEmptyArray(this.props.src)) {
      return;
    }

    if (this.state.index === 0) {
      return;
    }

    const nextIndex = this.state.index - 1;
    const nextProgress = this.calcProgress(nextIndex + 1);

    const nextState = {
      src: this.props.src[nextIndex],
      index: nextIndex,
      progress: nextProgress
    };
    this.setState(nextState);
  };

  onClickNextButton = () => {
    if (!this.props.src) {
      return;
    }

    if (this.state.index === this.props.src.length - 1) {
      return;
    }
    const nextIndex = this.state.index + 1;
    let nextProgress = this.calcProgress(nextIndex + 1);
    if (nextProgress > 100) {
      nextProgress = 100;
    }

    const nextState = {
      src: this.props.src[nextIndex],
      index: nextIndex,
      progress: nextProgress
    };
    this.setState(nextState);
  };

  onClickProgressBar = (e: MouseEvent) => {
    const barWidth = document.getElementsByClassName("progressBar")[0].offsetWidth;
    const progressWidth = e.clientX;
    const clickPosition = Math.floor((progressWidth / barWidth) * 100);
    let nextIndex = 0;
    for (var i = 0; i < this.props.src.length; i++) {
      const checkWidth = this.calcProgress(i);
      if (clickPosition >= checkWidth) {
        nextIndex = i;
      }
    }
    const nextProgress = this.calcProgress(nextIndex + 1);
    const nextSrc = this.props.src[nextIndex];
    this.setState({
      src: nextSrc,
      index: nextIndex,
      progress: nextProgress
    })
  };

  calcProgress = (page: number) : number => {
    const base = 100 / this.props.src.length;
    let progress = Math.ceil(base * page);
    if (progress > 100) {
      return 100;
    }
    return progress;
  };

  isEmptyArray = (arr: Array<string>) : boolean => {
    return (arr === undefined || arr === null || arr.length === 0);
  }

  render() {
    return (
      <div style={this.props.style}>
        <div style={styles.bar}>

        </div>
        <div>
          <div style={styles.image}>
            <img className="content" src={this.state.src} style={{width: "100%"}}/>
            <div className="prevOnContent" onClick={this.onClickPrevButton} style={{display: "block", width: "40%", height: "100%", top: 0, left: 0, position: "absolute", cursor: "w-resize"}}></div>
            <div className="nextOnContent" onClick={this.onClickNextButton} style={{display: "block", width: "40%", height: "100%", top: 0, right: 0, position: "absolute", cursor: "e-resize"}}></div>
          </div>
        </div>
        <div className="progressBar" style={{backgroundColor: "#000", height: 10, marginTop: -6, position: "relative", width: "100%"}} onClick={this.onClickProgressBar}>
          <div className="progress" style={{backgroundColor: "#007bb6", height: "100%", width: `${this.state.progress}%`}}/>
        </div>
        <div className={"bar"} style={styles.bar}>
          <button className={"prevButton"} onClick={this.onClickPrevButton} style={styles.button}>{this.props.prevIcon}</button>
          <span style={styles.pageView}>{this.props.src ? `${this.state.index + 1} / ${this.props.src.length}` : ""}</span>
          <button className={"nextButton"} onClick={this.onClickNextButton} style={styles.button}>{this.props.nextIcon}</button>
        </div>
      </div>
    );
  }
}

const styles = {
  image: {
    position: "relative",
    width: "100%"
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    margin: "0 20px",
    padding: 0,
  },
  bar: {
    backgroundColor: "#323232",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    margin: "auto",
    width: "100%"
  },
  pageView: {
    color: "#fff"
  },
  arrowButtonStyle: {
    backgroundColor: "transparent",
    height: "15px"
  },
};

SlideShow.defaultProps = {
  arrowButtonStyle: styles.arrowButtonStyle,
  style: {},
  src: [],
  prevIcon: (
    <img style={styles.arrowButtonStyle} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0MC4yNSA0NDAuMjUxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDAuMjUgNDQwLjI1MTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik00MzYuNTM4LDAuODYxYy0yLjQ3MS0xLjE0My01LjUxMywwLjA5NC05LjEzNCwzLjcwOUwyMjQuNjkyLDIwNy4yNzNjLTEuNTIxLDEuNTI0LTIuNzYyLDMuMzMzLTMuNzExLDUuNDI0VjkuOTg5ICAgYzAtNC45NDgtMS4yMzctNy45OTQtMy43MTEtOS4xMzdjLTIuNDc0LTEuMTQxLTUuNTIsMC4wOTYtOS4xMzYsMy43MTFMNS40MjQsMjA3LjI3M0MxLjgwOSwyMTAuODkxLDAsMjE1LjE3MiwwLDIyMC4xMiAgIHMxLjgwOSw5LjIzMyw1LjQyNCwxMi44NDdsMjAyLjcxLDIwMi43MDljMy42MTYsMy42Miw2LjY2Miw0Ljg2Miw5LjEzNiwzLjcyYzIuNDc0LTEuMTQ0LDMuNzExLTQuMTg5LDMuNzExLTkuMTM4VjIyNy41NDYgICBjMC45NTMsMS45MDMsMi4xOSwzLjcxNywzLjcxMSw1LjQyNWwyMDIuNzEyLDIwMi43MTFjMy42MjEsMy42MTcsNi42NjMsNC44Niw5LjEzNCwzLjcxN2MyLjQ3OC0xLjE0MywzLjcxMy00LjE4OCwzLjcxMy05LjEzNyAgIFY5Ljk5NkM0NDAuMjQ4LDUuMDQ4LDQzOS4wMTUsMi4wMDIsNDM2LjUzOCwwLjg2MXoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
  ),
  nextIcon: (
    <img style={styles.arrowButtonStyle} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0MC4yNSA0NDAuMjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0MC4yNSA0NDAuMjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDM0LjgyMywyMDcuMjc5TDIzMi4xMTEsNC41NzFjLTMuNjA5LTMuNjE3LTYuNjU1LTQuODU2LTkuMTMzLTMuNzEzYy0yLjQ3NSwxLjE0My0zLjcxMiw0LjE4OS0zLjcxMiw5LjEzN3YyMDIuNzA4ICAgYy0wLjk0OS0yLjA5MS0yLjE4Ny0zLjkwMS0zLjcxMS01LjQyNEwxMi44NDcsNC41NzFDOS4yMjksMC45NTQsNi4xODYtMC4yODUsMy43MTEsMC44NThDMS4yMzcsMi4wMDEsMCw1LjA0NywwLDkuOTk1djQyMC4yNjIgICBjMCw0Ljk0OCwxLjIzNyw3Ljk5NCwzLjcxMSw5LjEzOGMyLjQ3NCwxLjE0LDUuNTE4LTAuMSw5LjEzNS0zLjcyMWwyMDIuNzA4LTIwMi43MDFjMS41MjEtMS43MTEsMi43NjItMy41MjQsMy43MTEtNS40Mjh2MjAyLjcxMiAgIGMwLDQuOTQ4LDEuMjM3LDcuOTkxLDMuNzEyLDkuMTMxYzIuNDc4LDEuMTQzLDUuNTIzLTAuMDkzLDkuMTMzLTMuNzE0bDIwMi43MTItMjAyLjcwOGMzLjYxLTMuNjE3LDUuNDI4LTcuOTAxLDUuNDI4LTEyLjg0NyAgIEM0NDAuMjQ4LDIxNS4xNzgsNDM4LjQzMywyMTAuODk2LDQzNC44MjMsMjA3LjI3OXoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
  )
};

SlideShow.PropTypes = {
  arrowButtonStyle: PropTypes.object,
  style: PropTypes.object,
  src: PropTypes.array,
  prevIcon: PropTypes.node,
  nextIcon: PropTypes.node,
};