import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/**List of leaders and their points*/
const LeaderValue = [
    { name: 'Leader1', point: 72 },
    { name: 'Leader2', point: 34 },
    { name: 'Leader3', point: 50 },
    { name: 'Leader4', point: 20 },
    { name: 'Leader5', point: 7 }
]
/**Adding Leaders and points to LeaderBoard*/
const AddLeaderBoard = (props) => {
    return (
        <button className='add m-4' onClick={(e) => props.leaderIncrement(e)}>
            Add Leader
        </button >
    )
}

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderDetail: LeaderValue  //storing List to State
        }
    }
    componentDidMount() {
        /**Sorting List of leaders and their points*/
        this.state.leaderDetail.sort(function (a, b) {
            return a.point == b.point ? 0 : +(a.point < b.point) || -1;
        });
        /**Mapping leaders to their points*/
        this.state.leaderDetail.map((stone, key) => {
            this.setState({
                [stone.name + '_point']: stone.point
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        /**Updating List of leaders and their points while clicking add Leader Button*/
        if (prevState.leaderDetail.length != this.state.leaderDetail.length) {
            /**Sorting List of leaders and their points after adding Leader*/
            this.state.leaderDetail.sort(function (a, b) {
                return a.point == b.point ? 0 : +(a.point < b.point) || -1;
            });
            /**Mapping leaders to their points after adding new Leader in list*/
            this.state.leaderDetail.map((stone, key) => {
                this.setState({
                    [stone.name + '_point']: stone.point
                })
            })
        }
        if (prevState.leaderDetail != this.state.leaderDetail) {
            /**Sorting List of leaders and their points after adding Leader*/
            this.state.leaderDetail.sort(function (a, b) {
                return a.point == b.point ? 0 : +(a.point < b.point) || -1;
            });
        }
    }
    /**Increasing Points of Leader*/
    handleIncrementPoint = (name) => {
        this.state.leaderDetail.map((stone) => {
            if (stone.name == name) {
                this.setState({
                    [name + '_point']: this.state[name + '_point'] + 1
                }, () => {
                    /**Changing Points of Leader Value in state(LeaderValue)*/
                    const index = this.state.leaderDetail.findIndex(p => p.name == name)
                    this.setState(prevState => {
                        const newItems = [...prevState.leaderDetail];
                        newItems[index].point = this.state[name + '_point'];
                        return { leaderDetail: newItems };
                    })

                })
            }
        })
    }
    /**Decreasing Points of Leader*/
    handleDecrementPoint = (name) => {
        this.state.leaderDetail.map((stone) => {
            if (stone.name == name) {
                this.setState({
                    [name + '_point']: this.state[name + '_point'] - 1
                }, () => {
                    /**Changing Points of Leader Value in state(LeaderValue)*/
                    const index = this.state.leaderDetail.findIndex(p => p.name == name)
                    this.setState(prevState => {
                        const newItems = [...prevState.leaderDetail];
                        newItems[index].point = this.state[name + '_point'];
                        return { leaderDetail: newItems };
                    })

                })
            }
        })
    }
    /**Increasing Leader into List*/
    leaderIncrementation = (e) => {
        const name = `Leader${Math.floor(Math.random() * Date.now() % 100)}`
        const point = Math.floor(Math.random() * Date.now() % 200)
        this.setState(previousState => ({
            leaderDetail: [...previousState.leaderDetail, { name: name, point: point }]
        }));
    }

    render() {
        console.log("***",this.state.leaderDetail)
        return (
            <div className="App">
                <Container>
                    <div className="text-center">
                        <h3>Leaderboard App</h3>
                        <AddLeaderBoard leaderIncrement={this.leaderIncrementation} />
                    </div>
                    <Row>
                        <Col md={5}>
                            <div className="leaderboard mt-2">
                                <table className="p-4">
                                    <tbody>
                                        {
                                            this.state.leaderDetail.map(({ name, point }) => (
                                                <tr style={{ outline: 'thin solid' }} key={name+point}>
                                                    <td className="p-2 name">
                                                        {name}
                                                    </td>
                                                    <td className="point">
                                                        {point}
                                                    </td>
                                                    <td style={{ width: '20%' }}>
                                                        <div className="input-group">
                                                            <button className="btn btn-default button_numeric" data-dir="up" type='button'><i className="fa fa-plus" onClick={(e) => this.handleIncrementPoint(name)
                                                            }></i></button>
                                                            <button className="btn btn-default button_numeric" data-dir="dwn" type='button'><i className="fa fa-minus" onClick={(e) => this.handleDecrementPoint(name)}></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        {/* Second List which displaying in UI */}
                        <Col md={5}>
                            <div className="leaderboard mt-2">
                                <table className="p-4">
                                    <tbody>
                                        {
                                            this.state.leaderDetail.map(({ name, point }) => (
                                                <tr style={{ outline: 'thin solid' }} key={name+point}>
                                                    <td className="p-2 name">
                                                        {name}
                                                    </td>
                                                    <td className='point'>
                                                        {point}
                                                    </td>
                                                    <td style={{ width: '20%' }}>
                                                        <div className="numericSpinner amountSpinner">
                                                            <div className="input-group number-spinner">
                                                                <div className="input-group-btn-vertical">
                                                                    <button className="btn btn-default" type='button' onClick={(e) => this.handleIncrementPoint(name)
                                                                    }><i className="fa fa-plus" ></i></button>
                                                                    <button className="btn btn-default" type='button' onClick={(e) => this.handleDecrementPoint(name)}><i className="fa fa-minus" ></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Leaderboard;
