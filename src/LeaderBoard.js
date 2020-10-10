import React, { Component } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import * as pagination from "./redux/ducks/pagination/actions";
import { connect } from "react-redux";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startData: 0, //Page value start data
            endData: 5, //Page value end data,
            tableHead: []
        }
    }
    componentDidMount() {
        /**Fetching Songs from API*/
        fetch('http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5')
            .then(response => response.json())
            .then(songs => {
                this.setState({
                    tableHead: Object.keys(songs[0])
                }, () => {
                    this.props.updateDataValue(songs);
                })
            });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.startData != this.state.startData) {
            /**Fetching Songs from API*/
            fetch(`http://jsonplaceholder.typicode.com/photos?_start=${this.state.startData}&_limit=${this.state.endData}`)
                .then(response => response.json())
                .then(songs => {
                    this.props.updateDataValue(songs);
                });
        }
    }

    handleAdd = (e, item) => {
        let newData = {
            albumId: 1,
            id: 1,
            thumbnailUrl: "https://via.placeholder.com/150/92c952",
            title: "accusamus beatae ad facilis cum similique qui sunt",
            url: "https://via.placeholder.com/600/92c952"
        }
        this.props.page_number.push(newData)
        this.props.updateDataValue(this.props.page_number);
        this.setState({
            endData: this.props.page_number.length
        })

    }
    handleEdit = (e, item, key) => {
        const objIndex = this.props.page_number.findIndex(stone => stone == item)
        this.props.page_number[objIndex].key = e.target.value
        this.props.updateDataValue(this.props.page_number);
    }
    handleDelete = (e, item) => {
        const removedValue = this.props.page_number.filter(key => key != item);
        this.props.updateDataValue(removedValue);
    }

    /**Handling Previous Page*/
    handlePrev = (e) => {
        this.setState({
            startData: this.state.startData - 5,
            endData: 5
        })
    }
    /**Handling Next Page*/
    handleNext = (e) => {
        this.setState({
            startData: this.state.startData + 5,
            endData: this.props.page_number.length < this.state.endData + 5 ? 5 : this.state.endData + 5
        })
    }



    render() {
        return (
            <div className="App">
                <Container fluid>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {
                                    this.state.tableHead.length != 0 ? this.state.tableHead.map((item, index) => {
                                        return (
                                            <th key={index}>{item}</th>
                                        )
                                    }) : ''
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.page_number.length != 0 ? this.props.page_number.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><input value={item.albumId} onChange={(e) => this.handleEdit(e, item, 'albumId')} /></td>
                                            <td><input value={item.id} onChange={(e) => this.handleEdit(e, item, 'id')} /></td>
                                            <td><input value={item.title} onChange={(e) => this.handleEdit(e, item, 'title')} /></td>
                                            <td><input value={item.url} onChange={(e) => this.handleEdit(e, item, 'url')} /></td>
                                            <td><input value={item.thumbnailUrl} onChange={(e) => this.handleEdit(e, item, 'thumbnailUrl')} /></td>
                                            <td style={{ display: 'inline-flex' }}>
                                                <Button variant="light" onClick={(e) => this.handleAdd(e, item)}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                                                <Button variant="light" onClick={(e) => this.handleDelete(e, item)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                            </td>
                                        </tr>
                                    )
                                }) : ''
                            }
                        </tbody>
                    </Table>
                    {/* Previous and Next Button */}
                    <Button style={{ float: 'left' }} disabled={this.state.startData === 0 ? true : false} onClick={(e) => this.handlePrev(e)}>❮ Prev</Button>
                    <Button style={{ float: 'right' }} onClick={(e) => this.handleNext(e)}>Next ❯</Button>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.page_number
});

const mapDispatchToProps = dispatch => ({
    updateDataValue: (songs) => dispatch(pagination.currentPageNumber(songs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
