import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithm';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            array: [],
            hoveredIndex:null,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 310; i++){
            array.push(randomIntFromInterval(5,730));
        }
        this.setState({array});
    }

    mergeSort(){
        const javaSorted = this.state.array.slice().sort((a,b) => a-b);
        const sorted = sortingAlgorithms.mergeSort(this.state.array);

        console.log(equal(javaSorted, sorted));
    }

    quickSort(){

    }

    heapSort(){

    }

    bubbleSort(){

    }

    testSorting() {
        for (let i =0; i < 100; i++){
            const array = [];
            const length = randomIntFromInterval(1,1000);
            for (let i =0; i< length; i++) {
                array.push(randomIntFromInterval(-1000,1000));
            }

            const javaSorted = array.slice().sort((a,b) => a - b);
            const mergeSorted = sortingAlgorithms.mergeSort(array.slice());
            console.log(equal(javaSorted, mergeSorted))
        }
    }

    handleMouseEnter(index) {
        this.setState({ hoveredIndex: index });
    }

    handleMouseLeave() {
        this.setState({ hoveredIndex: null });
    }

    render() {
        const {array, hoveredIndex} = this.state;
        const hoveredValue = hoveredIndex !== null ? array[hoveredIndex] : null;

        return (
            <>
            <div className='array-container'>
                {array.map((value, idx) => (
                    //If you dont put key property you will get a warning
                    <div className='array-bar' key={idx}
                        onMouseEnter={() => this.handleMouseEnter(idx)}
                        onMouseLeave={() => this.handleMouseLeave()}
                        //multiply the value times a number to show the bar graph
                        style={{height: `${(value)*0.70}px`}}>
                    </div>
                ))}
                <div className='buttons'>
                    <button className='bottom' onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className='bottom' onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className='bottom' onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button className='bottom' onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className='bottom' onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className='bottom' onClick={() => this.testSorting()}>Test Algorithm</button>
                </div>
                <p className='value'>Value: {hoveredValue}</p>
            </div>
            </>
        );
    }
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max-min +1) + min)
}

function equal(arrayOne, arrayTwo){
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] != arrayTwo[i]) return false;
    }
    return true;
}