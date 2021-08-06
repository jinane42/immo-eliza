import React from 'react';
import axios from 'axios';
import '../styles/Form.css'

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Province: 1000,
            Livingarea: 0,
            PropertyType: "HOUSE",
            Bedroom: 0,
            prediction: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeSurface = this.handleChangeSurface.bind(this)
        this.handleChangeZipCode= this.handleChangeZipCode.bind(this)
        this.handleChangeProperty = this.handleChangeProperty.bind(this)
        this.handleChangeRooms = this.handleChangeRooms.bind(this)
    }

    handleClick() {
        console.log(this.state);
        
        if (this.state.toComplete === true) {
            this.setState({ toComplete: false })

        } else {
            this.setState({ toComplete: true })

        }

    }

    handleChangeRooms = event => {

        this.setState({ Bedroom: parseInt(event.target.value) });
    }
    handleChangeSurface = event => {

        this.setState({ Livingarea: event.target.value });
    }
    handleChangeProperty = event => {

        this.setState({ PropertyType: event.target.value });
    }
    handleChangeZipCode = event => {

        this.setState({ Province: event.target.value });
    }
    handleSubmit (event) {
        event.preventDefault();

        console.log(this.state);
        
        if (this.state.toComplete === true) {
            this.setState({ toComplete: false })

        } else {
            this.setState({ toComplete: true })

        }

        console.log('hello')
        axios.post('https://salty-mesa-39646.herokuapp.com/predict',
         { 'data' :{
             'area': parseInt(this.state['Livingarea']),
             'zip-code': parseInt(this.state['Province']),
             'property-type': this.state['PropertyType'],
             'rooms-number': parseInt(this.state['Bedroom'])}
         }).then(response=>{
             
             console.log(response)
             this.setState({prediction: response.data.prediction})
           })
           .catch((err) => {console.log(err)} )
       console.log("AGAIN  ")
    }


    render() {

        if (this.state.toComplete) {
            return (
                <div className='form'>
                    <form id='form' onSubmit={this.handleSubmit}>
                        <div >
                            <label htmlFor="Bedroom"> Number of rooms :</label>
                            <select name='Bedroom' id='Bedroom' form='form' onChange={this.handleChangeRooms}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="Livingarea"> Living area :</label>
                            <input type='text' id='Livingarea' name='Livingarea' onChange={this.handleChangeSurface} required></input>
                        </div>

                        <div>
                            <label htmlFor="PropertyType"> Property type:</label>
                            <input type='text' id='PropertyType' name='PropertyType' onChange={this.handleChangeProperty} required></input>
                        </div>
                        <div>
                            <label htmlFor="Province"> Province:</label>
                            <input type='number' id='Province' name='Province' onChange={this.handleChangeZipCode} required></input>
                        </div>
                        <div>
                            <button type='submit' value='Search'>See the price prediction</button>
                        </div>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className='form'>
                    <p>For a {this.state.PropertyType} of {this.state.Bedroom} rooms in {this.state.Province}, the price prediction is {this.state.prediction} €</p>
                    
                    <button type='button' value='Search' onClick={() => this.handleClick()}>Go back</button>
                </div>
            )

        }

    }
}

